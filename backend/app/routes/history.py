from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.article import Article
from app.schemas.article import ArticleHistory

router = APIRouter(prefix="/history", tags=["History"])

@router.get("/", response_model=List[ArticleHistory])
def get_history(
    db: Session = Depends(get_db),
    limit: int = 20,
    skip: int = 0
):
    articles = db.query(Article)\
        .order_by(Article.analyzed_at.desc())\
        .offset(skip)\
        .limit(limit)\
        .all()
    return articles

@router.delete("/{article_id}")
def delete_article(
    article_id: int,
    db: Session = Depends(get_db)
):
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    db.delete(article)
    db.commit()
    return {"message": "Article deleted successfully"}