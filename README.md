# VaultIQ AI 🔐
## AI-Powered Personal Ownership Assistant

VaultIQ AI is an AI-powered product management assistant that helps users store purchase information, analyze receipts, and track warranties digitally.

The app allows users to upload product receipts, extract important information using AI, and maintain a personal product vault for their valuable belongings.

---

## 🚀 Live Demo

[Open VaultIQ AI](https://vault-iq-ai-yhm5.vercel.app/)

---

## 📌 Problem Statement

People often lose physical receipts, forget warranty periods, and struggle to find product purchase details when they need repairs, replacements, or maintenance.

This problem affects students, families, and anyone who owns electronics or valuable products.

VaultIQ AI solves this problem by creating a digital product vault where users can store their purchase records and use AI to extract important information from receipts.

---

# ✨ Features

## 📄 AI Receipt Analysis

Users can upload a product receipt image and VaultIQ AI analyzes it using artificial intelligence.

The AI extracts:

- Product name
- Product category
- Purchase date
- Warranty information (when available)

---

## 🔐 Product Vault Dashboard

Users can:

- Save purchased products
- View stored product information
- Track warranty details
- Delete products when no longer needed

Product data is stored using Firebase Firestore.

---

## 🤖 AI Product Assistant

VaultIQ AI includes an AI assistant that helps users with:

- Product-related questions
- Troubleshooting guidance
- Maintenance suggestions

---

# 🧠 AI Feature Details

## AI Receipt Analyzer

VaultIQ AI uses a Large Language Model through the Groq API to analyze uploaded receipt information.

The AI extracts ownership-related information from receipts and returns structured product details.

### System Prompt Used:

```
You are an AI receipt analyzer for a product warranty management application.

Analyze the uploaded receipt and extract:

- Product name
- Category
- Purchase date
- Warranty information

Return clear structured information.

If any information is missing, mention that it is unavailable.
```

---

# 🛠️ Technologies Used

## Frontend

- Next.js
- TypeScript
- Tailwind CSS

## Database

- Firebase Firestore

## AI

- Groq API
- Large Language Model (LLM)

## Deployment

- Vercel

## Development Tools

- Visual Studio Code
- GitHub

---

# 📸 Screenshots

## Home Page

(Add your home page screenshot here)

## AI Receipt Analysis

(Add your receipt analysis screenshot here)

## Product Dashboard

(Add your dashboard screenshot here)

---

# ⚙️ How To Run Locally

## Clone Repository

```bash
git clone https://github.com/engraimamughal/VaultIQ-AI.git
```

## Install Dependencies

```bash
npm install
```

## Add Environment Variables

Create a `.env.local` file:

```env
GROQ_API_KEY=your_groq_api_key
```

Add your Firebase configuration according to your Firebase project.

Never upload API keys or secrets to GitHub.

---

## Run Project

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# 🚧 Challenges & Solutions

## AI Integration

Challenge:
Connecting AI functionality with the application.

Solution:
Integrated Groq API to analyze receipts and extract product information.

## Database Integration

Challenge:
Saving and retrieving product records.

Solution:
Used Firebase Firestore for cloud storage.

## Deployment

Challenge:
Managing API keys securely.

Solution:
Used Vercel Environment Variables to protect secrets.

---

# 🔮 Future Improvements

- Warranty expiration reminders
- Email notifications
- Barcode scanning
- Mobile application version
- Improved receipt analysis accuracy

---

# 👩‍💻 Author

engraimamughal

---

# ⭐ Project Goal

VaultIQ AI demonstrates how artificial intelligence can solve a real-world problem by combining receipt analysis, cloud storage, and a modern web application.
