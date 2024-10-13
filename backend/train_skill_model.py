import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
import joblib

# Ensure the 'ml_models/' directory exists
os.makedirs("ml_models", exist_ok=True)

# Expanded sample dataset for training the model
X = [
    "Python Pandas SQL Machine Learning Data Visualization",
    "HTML CSS JavaScript React Node.js Flask",
    "Project Planning Agile Scrum Communication SQL"
]
y = ["Data Science", "Web Development", "Project Management"]

# Create a pipeline with TF-IDF and Logistic Regression
model = make_pipeline(TfidfVectorizer(), LogisticRegression())

# Train the model
model.fit(X, y)

# Save the trained model and vectorizer to a file
joblib.dump(
    {"vectorizer": model.named_steps["tfidfvectorizer"],
     "model": model.named_steps["logisticregression"]},
    "ml_models/skill_predictor.pkl"
)

print("Model trained and saved successfully!")
