from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class PredictRequest(BaseModel):
    text: str = Field(
        ...,
        min_length=50,
        description="The full text of the news article to analyze"
    )
    title: Optional[str] = Field(None, max_length=500)
    source_url: Optional[str] = Field(None, max_length=1000)
    model_config = {
        "json_schema_extra": {
            "example": {
                "text": "Scientists have discovered a new vaccine that cures all diseases instantly...",
                "title": "New Miracle Vaccine Discovered",
            }
        }
    }

# Alias so predict.py can import ArticleCreate
ArticleCreate = PredictRequest

class PredictResponse(BaseModel):
    id: int
    prediction: str
    confidence: float
    title: Optional[str] = None
    analyzed_at: datetime
    original_language: Optional[str] = "en"
    model_config = {"from_attributes": True}

# Alias so predict.py can import ArticleResponse
ArticleResponse = PredictResponse

class ArticleHistory(BaseModel):
    id: int
    title: Optional[str] = None
    prediction: str
    confidence: float
    analyzed_at: datetime
    source_url: Optional[str] = None
    original_language: Optional[str] = "en"
    model_config = {"from_attributes": True}