# ── routes/history.py ────────────────────────────────────
# Purpose: Define the GET /history API endpoint
# Returns all previously analyzed articles from the database
# Powers the History page in the React frontend
# ─────────────────────────────────────────────────────────

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.article import Article
from app.schemas.article import ArticleHistory

router = APIRouter(prefix="/history", tags=["History"])


@router.get("/", response_model=List[ArticleHistory])
def get_history(
    db: Session = Depends(get_db),
    limit: int = 20,    # return last 20 articles by default
    skip: int = 0       # for pagination later
):
    """
    Return list of all previously analyzed articles.
    Ordered by most recent first.
    """

    articles = db.query(Article)\
        .order_by(Article.analyzed_at.desc())\
        .offset(skip)\
        .limit(limit)\
        .all()

    return articles