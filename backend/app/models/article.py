# ── models/article.py ────────────────────────────────────
# Purpose: Define the 'articles' table structure
# SQLAlchemy will use this class to create the actual
# table in PostgreSQL automatically
# ─────────────────────────────────────────────────────────

# Column = defines a table column
# String, Float, Integer, Text, DateTime = column data types
from sqlalchemy import Column, Integer, String, Float, Text, DateTime

# func gives us database functions like now() for timestamps
from sqlalchemy.sql import func

# Import Base from database.py
# Every model must inherit from Base so SQLAlchemy tracks it
from app.database import Base


class Article(Base):
    # This tells SQLAlchemy the actual table name in PostgreSQL
    __tablename__ = "articles"

    # PRIMARY KEY — unique ID for every row
    # Integer type, auto-increments (1, 2, 3, 4...)
    # index=True makes searches by ID faster
    id = Column(Integer, primary_key=True, index=True)

    # Title of the news article
    # String(500) means max 500 characters
    # nullable=True means this field is optional
    title = Column(String(500), nullable=True)

    # Full article text
    # Text type = unlimited length (unlike String which has a limit)
    # nullable=False means this field is REQUIRED — we always need text
    content = Column(Text, nullable=False)

    # Original URL of the article (optional)
    # User may paste text directly without a URL
    source_url = Column(String(1000), nullable=True)

    # ML model prediction result
    # Will store either "REAL" or "FAKE"
    prediction = Column(String(10), nullable=False)

    # Confidence score from the ML model
    # Float stores decimal numbers like 94.3 or 87.5
    # Represents percentage confidence of the prediction
    confidence = Column(Float, nullable=False)

    # Timestamp — when was this article analyzed?
    # server_default=func.now() → PostgreSQL automatically sets
    # this to the current time when a new row is inserted
    # You never need to set this manually
    analyzed_at = Column(DateTime, server_default=func.now())
    original_language = Column(String, default="en")