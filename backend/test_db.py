# test_db.py — DELETE THIS FILE after testing
# Purpose: Just verify our database.py works correctly

from app.database import engine
from sqlalchemy import text

try:
    with engine.connect() as conn:
        # Run the simplest possible SQL query
        # SELECT 1 just returns the number 1 — it tests the connection only
        result = conn.execute(text("SELECT 1"))
        print("✅ Database connected successfully!")
        print("✅ fakenews_db is ready to use!")
except Exception as e:
    print(f"❌ Connection failed: {e}")
    print("Check your DATABASE_URL in .env file")