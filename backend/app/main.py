# ── main.py ──────────────────────────────────────────────
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.models import article

# Import routers
from app.routes import predict, history

# Create all database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="Fake News Detector API",
    description="API for detecting fake news using ML",
    version="1.0.0"
)

# ── CORS Middleware ───────────────────────────────────────
# CORS = Cross Origin Resource Sharing
# Without this, your React frontend (port 5173) cannot
# talk to your FastAPI backend (port 8000)
# browsers block requests between different ports by default
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],    # allow GET, POST, PUT, DELETE
    allow_headers=["*"],    # allow all headers
)

# ── Register routers ──────────────────────────────────────
# This connects your route files to the main app
app.include_router(predict.router)
app.include_router(history.router)

# Health check
@app.get("/")
def health_check():
    return {
        "status": "running",
        "message": "Fake News Detector API is live!"
    }