#  Fake News Detector

An AI-powered full-stack web application that detects whether a news article is **REAL** or **FAKE** using Machine Learning and Natural Language Processing (NLP).

##  Live Demo
🔗 Coming soon...

##  Model Performance
| Metric | Score |
|---|---|
| Accuracy | 98.82% |
| F1-Score | 0.99 |
| Training Articles | 44,898 |
| Algorithm | Logistic Regression |

##  Tech Stack

**Machine Learning**
- Python, Scikit-learn, NLTK, TF-IDF, Pandas

**Backend**
- FastAPI, PostgreSQL, SQLAlchemy, Pydantic, Uvicorn

**Frontend**
- React.js, Tailwind CSS, Axios, React Router, Vite

##  How It Works
1. User pastes a news article into the form
2. React sends the text to FastAPI via Axios
3. Pydantic validates the request
4. ML model (TF-IDF + Logistic Regression) analyzes the text
5. Prediction + confidence score returned
6. Result saved to PostgreSQL

##  Run Locally

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python ml/train.py
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

##  Project Structure