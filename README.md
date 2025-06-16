# Symptalyze 🧠💬

**AI-Powered Symptom Analysis and Doctor Recommendation Platform**

Symptalyze is a full-stack web application that leverages advanced AI to help users analyze their symptoms and get expert recommendations—all in a few clicks. Built using React on the frontend, Express.js and Node.js on the backend, and PostgreSQL via Neon DB for data persistence. The AI layer is powered by Cohere (currently) or can be extended to Gemini or ChatGPT (paid tiers).

---

## 🚀 Features

- 🔍 **Symptom Analysis:** Input symptoms and receive potential health conditions
- 📊 **Confidence Score:** See how confident the AI is for each analysis
- 👨‍⚕️ **Doctor Suggestions:** Instantly view expert doctors matched to your condition (via RAG)
- 🧠 **AI-Powered Responses:** Integrated with Cohere/GPT APIs using structured prompts
- 🛡️ **Safety Protocols:** AI is restricted to medical conversations only (system prompt enforced)

---

## 🧰 Tech Stack

- **Frontend:** React (JavaScript)
- **Backend:** Node.js + Express
- **Database:** PostgreSQL (hosted on [Neon.tech](https://neon.tech))
- **AI Integration:**  
  - ✅ **Currently:** [Cohere API](https://cohere.com/)  
  - 🔁 **Optional:** OpenAI (ChatGPT), Gemini (Google)
- **Deployment Ready:** Easily deployable on Vercel, Render, Railway, or similar platforms

---

## 🌐 Live Demo

_(Add your deployed link here when available)_

---

## 📦 Environment Setup

### 🔧 Backend Setup

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


