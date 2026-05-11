# VoteSaathi-AI | Futuristic Indian Election Assistant

<div align="center">
  <img src="public/india-bg.png" alt="VoteSaathi Background Map" width="300" style="background:#0b0e1a; padding: 20px; border-radius: 10px; border: 1px solid rgba(212,168,83,0.18);">
  
  <p><em>A premium, AI-powered election dashboard designed to empower Indian citizens with real-time voting information.</em></p>
</div>

## 🌟 Overview
**VoteSaathi-AI** is a futuristic, highly interactive web application designed to act as a smart election assistant for India. Combining a striking dark-mode glassmorphism UI with neon accents, it guides voters through complex electoral processes via an intuitive dashboard and an integrated AI chat bot.

## ✨ Key Features
- **🤖 AI Chat Assistant**: An integrated chat interface (represented by an animated floating robot avatar) capable of answering questions about voter registration, polling stations, and electoral procedures.
- **🗳️ Interactive Dashboard**: Quick access to core election features:
  - **Check Registration**: Verify voter ID and electoral roll status.
  - **Find Polling Place**: Locate your specific booth with integrated map capabilities.
  - **View Sample Ballot**: Explore candidates and EVM simulations in your precinct.
  - **Important Dates**: Stay updated on election phases and deadlines.
- **🎨 Premium Sci-Fi Aesthetics**:
  - Deep space/navy background with a glowing holographic map of India.
  - Custom glassmorphism (frosted glass) panels and sidebars.
  - Glowing, animated **Font Awesome 6 Neon Icons** (Cyan, Purple, Pink, and Gold).
  - Floating, animated UI components like the glowing AI "Orb" and the robot assistant.
- **📱 Fully Responsive**: Seamless experience across desktop and mobile devices with a responsive sidebar and layout shifts.

## 🛠️ Technology Stack
- **Frontend**:
  - Vanilla HTML5 / CSS3 / JavaScript
  - Custom Glassmorphism UI & Keyframe Animations
  - Font Awesome 6 (Icons)
- **Backend**:
  - Node.js & Express.js (`server.js`)
  - REST API endpoints for the `/chat` interface and data handling.
- **Deployment**:
  - **Google Cloud Run**: Containerized and deployed for auto-scaling and high availability.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://npmjs.com/)

### Local Development Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/nizamudd-in/ElectionGuide-AI.git
   cd ElectionGuide-AI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory (if required for specific AI API keys):
   ```env
   PORT=3000
   ```

4. **Start the server:**
   ```bash
   npm start
   ```
   *The application will run on `http://localhost:3000`.*

## ☁️ Cloud Deployment
This project is configured to be deployed on **Google Cloud Run**.
```bash
# Authenticate with Google Cloud
gcloud auth login

# Set your project ID
gcloud config set project YOUR_PROJECT_ID

# Deploy from source
gcloud run deploy votesaathi-ai --source . --region us-central1 --allow-unauthenticated
```
*Live Deployment: [https://votesaathi-ai-945350196659.us-central1.run.app](https://votesaathi-ai-945350196659.us-central1.run.app)*

## ⚖️ Know Your Rights
*Every citizen has the right to free and fair elections.* 
VoteSaathi-AI promotes electoral literacy and aims to bridge the gap between citizens and the Election Commission's resources.

---
*Disclaimer: VoteSaathi-AI is an educational/informational tool. Always verify official details on the [Election Commission of India (ECI) website](https://eci.gov.in/).*