from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.article import Article
from app.schemas.article import ArticleCreate, ArticleResponse
from app.services.predictor import predict_news
from deep_translator import GoogleTranslator
from langdetect import detect, LangDetectException

router = APIRouter(prefix="/predict", tags=["Predict"])

@router.post("/", response_model=ArticleResponse)
def predict(article: ArticleCreate, db: Session = Depends(get_db)):
    original_text = article.text
    detected_lang = "en"

    try:
        detected_lang = detect(original_text)
    except LangDetectException:
        detected_lang = "en"

    # Translate to English if not already English
    if detected_lang != "en":
        try:
            translated = GoogleTranslator(
                source="auto", target="en"
            ).translate(original_text)
        except Exception:
            translated = original_text
    else:
        translated = original_text

    result = predict_news(translated)

    db_article = Article(
        title=article.title or "",
       content=original_text,
        prediction=result["prediction"],
        confidence=result["confidence"],
        original_language=detected_lang,
    )
    db.add(db_article)
    db.commit()
    db.refresh(db_article)

    return {
        "id": db_article.id,
        "prediction": result["prediction"],
        "confidence": result["confidence"],
        "analyzed_at": db_article.analyzed_at,
        "original_language": detected_lang,
    }