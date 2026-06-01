# ── database.py ──────────────────────────────────────────
# Purpose: Set up the connection between FastAPI and PostgreSQL
# This file is written once and imported everywhere else
# ─────────────────────────────────────────────────────────

# SQLAlchemy tools we need
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# os lets us read system environment variables
import os

# dotenv loads our .env file into environment variables
from dotenv import load_dotenv

# Step 1: Load .env file
# Without this line, os.getenv() cannot find DATABASE_URL
load_dotenv()

# Step 2: Read the database URL from .env
# Format: postgresql://username:password@host:port/database_name
DATABASE_URL = os.getenv("DATABASE_URL")

# Step 3: Create the engine
# Engine = the actual connection pool to PostgreSQL
# Think of it as the phone line between Python and your database
# pool_pre_ping=True → tests connection before using it (prevents stale connections)
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# Step 4: Create a session factory
# A session = one conversation with the database
# Every request to your API gets its own session — opened and closed cleanly
# autocommit=False → you manually confirm (commit) every change — safer
# autoflush=False  → SQLAlchemy waits for your signal before writing
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Step 5: Create the Base class
# Every database table you create (Article, User, etc.)
# will inherit from this Base
# SQLAlchemy uses it to track all your table definitions
Base = declarative_base()

# Step 6: get_db() — the database dependency
# This function is called automatically by FastAPI for every route
# that needs database access
# It creates a session → gives it to the route → closes it after
def get_db():
    db = SessionLocal()   # open a new session
    try:
        yield db          # hand the session to the route function
    finally:
        db.close()        # always close — even if an error occurs