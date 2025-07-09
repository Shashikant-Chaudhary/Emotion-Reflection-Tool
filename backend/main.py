from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EmotionInput(BaseModel):
    text: str

def detect_emotion(text: str) -> str:
    text = text.lower()

    if any(word in text for word in ["sad", "unhappy", "down", "depressed", "low"]):
        return "Sad"
    if any(word in text for word in ["happy", "joy", "glad", "excited", "great"]):
        return "Happy"
    if any(word in text for word in ["angry", "mad", "furious", "annoyed"]):
        return "Angry"
    if any(word in text for word in ["calm", "relaxed", "peaceful", "chill"]):
        return "Calm"
    if any(word in text for word in ["anxious", "nervous", "worried", "tense"]):
        return "Anxious"
    if any(word in text for word in ["motivated", "driven", "focused", "inspired"]):
        return "Motivated"
    if any(word in text for word in ["confused", "uncertain", "unsure", "puzzled"]):
        return "Confused"
    if any(word in text for word in ["tired", "drained", "burnt out", "exhausted"]):
        return "Frustrated"
    if any(word in text for word in ["fine", "okay", "content", "neutral"]):
        return "Content"

    return "Neutral"  # fallback

@app.post("/analyze")
def analyze_emotion(data: EmotionInput):
    emotion = detect_emotion(data.text)
    confidence = 0.9  # fixed mock confidence
    return {
        "emotion": emotion,
        "confidence": confidence
    }
