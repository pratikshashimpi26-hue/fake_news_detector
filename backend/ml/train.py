# ── ml/train.py ──────────────────────────────────────────
# Purpose: Train the fake news detection ML model
# Run this file ONCE to produce model.pkl + vectorizer.pkl
# Command: python ml/train.py (from backend/ folder)
# ─────────────────────────────────────────────────────────

import pandas as pd
import numpy as np
import joblib
import os
import re

# NLTK for text preprocessing
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

# Scikit-learn tools
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report

# ── Step 1: Download NLTK data ────────────────────────────
# stopwords → common words to ignore ("the", "is", "a")
# punkt     → sentence tokenizer
print("Downloading NLTK data...")
nltk.download('stopwords', quiet=True)
nltk.download('punkt', quiet=True)

# ── Step 2: Load the dataset ──────────────────────────────
print("Loading dataset...")

fake = pd.read_csv('ml/data/Fake.csv')
real = pd.read_csv('ml/data/True.csv')

# Add label column
# 1 = Fake, 0 = Real
fake['label'] = 1
real['label'] = 0

# Merge both into one DataFrame
df = pd.concat([fake, real], ignore_index=True)

print(f"Total articles: {len(df)}")
print(f"Fake: {len(fake)} | Real: {len(real)}")

# ── Step 3: Combine title + text ─────────────────────────
# Using both title and text gives the model more signal
# than text alone
df['content'] = df['title'].fillna('') + ' ' + df['text'].fillna('')

# ── Step 4: Text cleaning function ───────────────────────
stemmer = PorterStemmer()
stop_words = set(stopwords.words('english'))

def clean_text(text):
    # Convert to lowercase
    text = text.lower()

    # Remove URLs
    text = re.sub(r'http\S+|www\S+', '', text)

    # Remove special characters and numbers
    # Keep only letters and spaces
    text = re.sub(r'[^a-zA-Z\s]', '', text)

    # Split into individual words
    words = text.split()

    # Remove stopwords and apply stemming
    # Stopword removal: removes "the", "is", "a" etc.
    # Stemming: converts "running" → "run", "politics" → "polit"
    words = [stemmer.stem(w) for w in words if w not in stop_words]

    # Join words back into a single string
    return ' '.join(words)

print("Cleaning text... (this takes 1-2 minutes)")
df['cleaned'] = df['content'].apply(clean_text)
print("Text cleaning done!")

# ── Step 5: Prepare features and labels ──────────────────
X = df['cleaned']   # input: cleaned article text
y = df['label']     # output: 0=Real, 1=Fake

# ── Step 6: Split into train and test sets ───────────────
# 80% training, 20% testing
# random_state=42 → same split every run (reproducible)
# shuffle=True → mix fake and real articles randomly
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    shuffle=True
)

print(f"Training set: {len(X_train)} articles")
print(f"Testing set:  {len(X_test)} articles")

# ── Step 7: TF-IDF Vectorization ─────────────────────────
# max_features=5000 → track top 5000 most important words
# ngram_range=(1,2) → use single words AND word pairs
#   example: "fake" + "news" together is more powerful than alone
vectorizer = TfidfVectorizer(
    max_features=5000,
    ngram_range=(1, 2),
    stop_words='english'
)

# fit_transform on training data
# fit   → learns vocabulary from training articles
# transform → converts articles to number vectors
X_train_vec = vectorizer.fit_transform(X_train)

# Only transform on test data — never fit again
# Must use same vocabulary as training
X_test_vec = vectorizer.transform(X_test)

print(f"Feature matrix shape: {X_train_vec.shape}")

# ── Step 8: Train and compare models ─────────────────────
print("\nTraining models...")

models = {
    "Logistic Regression": LogisticRegression(max_iter=1000),
    "Naive Bayes": MultinomialNB()
}

best_model = None
best_accuracy = 0
best_name = ""

for name, clf in models.items():
    # Train
    clf.fit(X_train_vec, y_train)

    # Predict on test set
    y_pred = clf.predict(X_test_vec)

    # Evaluate
    acc = accuracy_score(y_test, y_pred)
    print(f"\n{name} Accuracy: {acc:.2%}")
    print(classification_report(
        y_test, y_pred,
        target_names=['Real', 'Fake']
    ))

    # Track best model
    if acc > best_accuracy:
        best_accuracy = acc
        best_model = clf
        best_name = name

print(f"\nBest model: {best_name} ({best_accuracy:.2%} accuracy)")

# ── Step 9: Save best model and vectorizer ───────────────
print("\nSaving model and vectorizer...")

# Create ml/ directory path
model_path = 'ml/model.pkl'
vectorizer_path = 'ml/vectorizer.pkl'

joblib.dump(best_model, model_path)
joblib.dump(vectorizer, vectorizer_path)

print(f"✅ Model saved to {model_path}")
print(f"✅ Vectorizer saved to {vectorizer_path}")
print("\n🎉 Training complete! Your model is ready.")