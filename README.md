# Symptalyze 🧠💬

**AI-Powered Symptom Analysis and Doctor Recommendation Platform**

Symptalyze is a smart web application that leverages advanced AI to help users analyze their symptoms and get expert recommendations—all in a few clicks. Built using structured prompt engineering and third-party AI APIs like Cohere or OpenAI, Symptalyze empowers patients with clarity and guidance, without the need to train any custom models.

---

## 🚀 Features

- 🔍 **Symptom Analysis:** Input symptoms and receive potential health conditions
- 📊 **Confidence Score:** See how confident the AI is for each analysis
- 👨‍⚕️ **Doctor Suggestions:** Instantly view expert doctors matched to your condition (via RAG)
- 🧠 **AI-Powered Responses:** Integrated with Cohere or GPT APIs using structured prompts
- 🛡️ **Safety Protocols:** AI is restricted to medical conversations only (system prompt enforced)

---

## 🧰 Tech Stack

- **Frontend:** React (JavaScript only)
- **Backend:** Node.js (Express)
- **Database:** MongoDB
- **AI Integration:** Cohere API (currently implemented)  
  > *(You can replace with Gemini, ChatGPT (GPT-4), or other LLMs with paid access)*
- **Retrieval Augmentation:** RAG (for intelligent doctor recommendations)

---

## 📦 Environment Setup

### Backend Setup

1. Clone the repository  
   ```bash
   git clone https://github.com/your-username/symptalyze.git
   cd symptalyze/backend
- Create a .env file in the backend folder and add:
- PORT=5000
- MONGODB_URI=your_mongodb_connection_string
- COHERE_API_KEY=your_cohere_api_key
- # OR use other models


![image](https://github.com/user-attachments/assets/20603b2d-d8f3-46d7-a8f7-a135a8ffe86c)
![image](https://github.com/user-attachments/assets/ea986584-07bd-45c7-8d04-b160f6e9f0aa)
![image](https://github.com/user-attachments/assets/d4fd6e4e-947a-4acc-9e28-6587644c0632)
![image](https://github.com/user-attachments/assets/2c3e2edc-17c5-4710-87b3-eefd0eb28ed0)


