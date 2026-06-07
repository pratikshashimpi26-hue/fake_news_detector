# test_predictor.py — DELETE after testing
from app.services.predictor import predict_news

# Test 1: Obviously fake article
fake_result = predict_news(
    title="SHOCKING: Government secretly adding chemicals to water",
    text="Anonymous sources claim that the government has been secretly poisoning the water supply for decades. No official confirmation exists but insiders say the truth is being suppressed by mainstream media."
)
print(f"Test 1 (Fake): {fake_result}")

# Test 2: Real-sounding article
real_result = predict_news(
    title="Federal Reserve raises interest rates by 0.25 percent",
    text="The Federal Reserve announced Wednesday it would raise its benchmark interest rate by a quarter percentage point, continuing its effort to bring inflation down to its 2 percent target as the economy remains resilient."
)
print(f"Test 2 (Real): {real_result}")