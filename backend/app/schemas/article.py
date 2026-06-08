# ── schemas/article.py ───────────────────────────────────
# Purpose: Define the shape of data coming IN and going OUT
# of your API endpoints
#
# Two schemas:
# 1. PredictRequest  → what frontend sends to /predict
# 2. PredictResponse → what /predict sends back to frontend
# ─────────────────────────────────────────────────────────

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


# ── REQUEST SCHEMA ───────────────────────────────────────
# This defines exactly what the frontend must send
# when calling POST /predict
class PredictRequest(BaseModel):

    # The news article text to be analyzed
    # Field() lets us add extra rules and documentation
    # min_length=50 → reject articles shorter than 50 chars
    # (too short to analyze meaningfully)
    # description → shows up in /docs automatically
    text: str = Field(
        ...,                    # ... means this field is REQUIRED
        min_length=50,
        description="The full text of the news article to analyze"
    )

    # Optional title — frontend can send it or skip it
    # None is the default if not provided
    title: Optional[str] = Field(
        None,
        max_length=500,
        description="Optional headline of the article"
    )

    # Optional source URL
    source_url: Optional[str] = Field(
        None,
        max_length=1000,
        description="Optional URL of the original article"
    )

    # Pydantic v2 configuration
    model_config = {
        # Allows /docs to show an example request body
        "json_schema_extra": {
            "example": {
                "text": "Scientists have discovered a new vaccine that cures all diseases instantly according to unnamed sources...",
                "title": "New Miracle Vaccine Discovered",
                "source_url": "https://example.com/article"
            }
        }
    }


# ── RESPONSE SCHEMA ──────────────────────────────────────
# This defines exactly what your API sends BACK
# to the frontend after analyzing the article
class PredictResponse(BaseModel):

    # Database ID of the saved prediction
    id: int

    # The ML model verdict — either "REAL" or "FAKE"
    prediction: str

    # Confidence percentage — e.g. 94.3
    # How sure the model is about its prediction
    confidence: float

    # The title that was saved (if provided)
    title: Optional[str] = None

    # When the analysis was done
    analyzed_at: datetime

    # This tells Pydantic to read data from
    # SQLAlchemy model objects directly
    # Without this, Pydantic cannot read SQLAlchemy objects
    model_config = {"from_attributes": True}


# ── HISTORY RESPONSE SCHEMA ──────────────────────────────
# Used by GET /history to return list of past predictions
class ArticleHistory(BaseModel):

    id: int
    title: Optional[str] = None
    prediction: str
    confidence: float
    analyzed_at: datetime
    source_url: Optional[str] = None

    model_config = {"from_attributes": True}