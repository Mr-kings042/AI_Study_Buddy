import requests
import os
import time
from typing import List, Dict

HF_API_URL = "https://api-inference.huggingface.co/models"
HF_HEADERS = {"Authorization": f"Bearer {os.getenv('HUGGINGFACE_API_KEY')}"}

def query_model(model_name: str, payload: dict, max_retries: int = 3) -> dict:
    """Query Hugging Face model with retry logic"""
    url = f"{HF_API_URL}/{model_name}"
    
    for attempt in range(max_retries):
        try:
            response = requests.post(url, headers=HF_HEADERS, json=payload, timeout=30)
            
            if response.status_code == 503:
                # Model loading, wait and retry
                time.sleep(10 * (attempt + 1))
                continue
                
            response.raise_for_status()
            return response.json()
            
        except requests.RequestException as e:
            if attempt == max_retries - 1:
                raise Exception(f"Failed to query {model_name}: {str(e)}")
            time.sleep(5 * (attempt + 1))
    
    raise Exception(f"Max retries exceeded for {model_name}")

def generate_questions(text: str) -> List[Dict[str, str]]:
    """Generate question-answer pairs from input text"""
    
    # First, try to summarize if text is very long
    if len(text) > 1000:
        try:
            summary_result = query_model(
                "facebook/bart-large-cnn",
                {"inputs": text[:1024]}  # Truncate for summarization
            )
            if summary_result and isinstance(summary_result, list):
                text = summary_result[0].get('summary_text', text[:500])
        except:
            text = text[:500]  # Fallback to truncation
    
    # Generate questions using T5 model
    try:
        # Primary model
        result = query_model(
            "valhalla/t5-base-qg-hl",
            {"inputs": f"generate question: {text}"}
        )
        
        if not result or not isinstance(result, list):
            raise Exception("Invalid response format")
            
        questions = []
        for item in result:
            generated_text = item.get('generated_text', '')
            if 'question:' in generated_text and 'answer:' in generated_text:
                parts = generated_text.split('answer:')
                if len(parts) == 2:
                    question = parts[0].replace('question:', '').strip()
                    answer = parts[1].strip()
                    questions.append({'question': question, 'answer': answer})
        
        if questions:
            return questions
            
    except Exception as e:
        print(f"Primary model failed: {e}")
    
    # Fallback: create simple questions from text chunks
    sentences = text.split('. ')
    questions = []
    
    for i, sentence in enumerate(sentences[:3]):  # Limit to 3 questions
        if len(sentence.strip()) > 20:
            question = f"What is mentioned about: {sentence[:50]}...?"
            answer = sentence.strip()
            questions.append({'question': question, 'answer': answer})
    
    return questions if questions else [{'question': 'What is the main topic?', 'answer': text[:100]}]