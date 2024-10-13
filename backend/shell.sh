# Run the model training script
python train_skill_model.py

# Start the FastAPI application
uvicorn app:app --host 0.0.0.0 --port $PORT
