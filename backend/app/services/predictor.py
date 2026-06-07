# ── services/predictor.py ────────────────────────────────
# Purpose: Load the trained ML model and expose a predict()
# function that the API route will call
#
# This file is the bridge between the ML world and the web world
# It loads model.pkl ONCE at startup — not on every request
# ─────────────────────────────────────────────────────────

import joblib
import os
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

# ── Load model and vectorizer at module level ─────────────
# Loading at module level means they load ONCE when FastAPI starts
# NOT on every request — this keeps predictions fast (milliseconds)

# Build absolute path to ml/ folder
# This works regardless of where FastAPI is run from
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ML_DIR = os.path.join(BASE_DIR, '..', '..', 'ml')

MODEL_PATH = os.path.join(ML_DIR, 'model.pkl')
VECTORIZER_PATH = os.path.join(ML_DIR, 'vectorizer.pkl')

# Load both files from disk
# These are the trained artifacts from train.py
try:
    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)
    print("✅ ML model loaded successfully!")
except FileNotFoundError:
    raise RuntimeError(
        "model.pkl or vectorizer.pkl not found. "
        "Please run ml/train.py first to train the model."
    )

# ── Text cleaning (must match train.py exactly) ───────────
# CRITICAL: The cleaning applied here must be IDENTICAL
# to the cleaning applied during training
# If training cleaned differently → predictions will be wrong

# Download required NLTK data
nltk.download('stopwords', quiet=True)

stemmer = PorterStemmer()
stop_words = set(stopwords.words('english'))

def clean_text(text: str) -> str:
    """
    Clean and preprocess raw article text.
    Must match the cleaning logic in train.py exactly.
    """
    # Convert to lowercase
    text = text.lower()

    # Remove URLs
    text = re.sub(r'http\S+|www\S+', '', text)

    # Remove special characters and numbers
    text = re.sub(r'[^a-zA-Z\s]', '', text)

    # Split into words
    words = text.split()

    # Remove stopwords and apply stemming
    words = [stemmer.stem(w) for w in words if w not in stop_words]

    # Rejoin into a single string
    return ' '.join(words)


# ── Main prediction function ──────────────────────────────
def predict_news(text: str, title: str = "") -> dict:
    """
    Takes raw article text and returns prediction.

    Args:
        text: Full article content
        title: Optional article headline

    Returns:
        dict with prediction ("REAL"/"FAKE") and confidence (float)
    """

    # Step 1: Combine title and text (same as training)
    combined = f"{title} {text}".strip()

    # Step 2: Clean the text
    cleaned = clean_text(combined)

    # Step 3: Vectorize — convert text to numbers
    # Must use the SAME vectorizer from training
    # [cleaned] → list because vectorizer expects iterable
    vector = vectorizer.transform([cleaned])

    # Step 4: Predict the class
    # model.predict returns array: [0] or [1]
    # 0 = Real, 1 = Fake
    raw_prediction = model.predict(vector)[0]

    # Step 5: Get confidence score
    # predict_proba returns [[prob_real, prob_fake]]
    # .max() gives the highest probability (confidence)
    probabilities = model.predict_proba(vector)[0]
    confidence = round(float(probabilities.max()) * 100, 2)

    # Step 6: Convert numeric label to human-readable string
    prediction_label = "FAKE" if raw_prediction == 1 else "REAL"

    return {
        "prediction": prediction_label,
        "confidence": confidence
    }