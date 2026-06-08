# ── routes/predict.py ────────────────────────────────────
# Purpose: Define the POST /predict API endpoint
# This is where all layers connect:
# Frontend → FastAPI → Predictor → ML Model → Database → Response
# ─────────────────────────────────────────────────────────

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

# Import database dependency
from app.database import get_db

# Import SQLAlchemy model (database table)
from app.models.article import Article

# Import Pydantic schemas (request/response shapes)
from app.schemas.article import PredictRequest, PredictResponse

# Import our ML predictor service
from app.services.predictor import predict_news

# APIRouter groups related endpoints together
# prefix="/predict" means all routes here start with /predict
router = APIRouter(prefix="/predict", tags=["Prediction"])


@router.post("/", response_model=PredictResponse)
def predict_article(
    request: PredictRequest,    # Pydantic validates incoming JSON
    db: Session = Depends(get_db)  # FastAPI injects DB session
):
    """
    Analyze a news article and predict if it is REAL or FAKE.

    - Receives article text from frontend
    - Runs it through the ML model
    - Saves result to PostgreSQL
    - Returns prediction with confidence score
    """

    try:
        # Step 1: Run the ML model
        # Pass text and optional title to predictor
        result = predict_news(
            text=request.text,
            title=request.title or ""
        )

        # Step 2: Save result to database
        # Create a new Article object (maps to articles table)
        article = Article(
            title=request.title,
            content=request.text,
            source_url=request.source_url,
            prediction=result["prediction"],
            confidence=result["confidence"]
        )

        # Add to database session
        db.add(article)

        # Commit — actually writes to PostgreSQL
        db.commit()

        # Refresh to get the auto-generated id and analyzed_at
        db.refresh(article)

        # Step 3: Return the saved article
        # FastAPI uses PredictResponse schema to format this
        return article

    except Exception as e:
        # If anything goes wrong, rollback the database transaction
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )