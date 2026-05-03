const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const MENU_TEXT = `Namaste! I am VoteSaathi-AI. How can I help you today? Please reply with a number:
1. Check eligibility
2. Get voter ID
3. How to vote
4. Find polling booth
5. Fix voter ID`;

app.post('/chat', (req, res) => {
    const { message, state = 'menu' } = req.body;
    let reply = '';
    let newState = state;
    
    const text = message ? message.trim().toLowerCase() : '';

    if (text === 'menu' || text === 'hi' || text === 'hello') {
        return res.json({ reply: MENU_TEXT, state: 'menu' });
    }

    if (state === 'menu' || !state) {
        switch (text) {
            case '1':
                reply = 'Please enter your age:';
                newState = 'age_check';
                break;
            case '2':
                reply = "You can register for a new voter ID online at the National Voters' Service Portal (NVSP) or by using the Voter Helpline App. Type 'menu' for options.";
                newState = 'menu';
                break;
            case '3':
                reply = "To vote: 1. Check your name on the voter list. 2. Go to your polling booth. 3. Show your Voter ID. 4. Press the button on the EVM. Type 'menu' for options.";
                newState = 'menu';
                break;
            case '4':
                reply = "You can find your polling booth on the ECI website or the Voter Helpline App by searching your EPIC number. Type 'menu' for options.";
                newState = 'menu';
                break;
            case '5':
                reply = "To correct your Voter ID, you can fill Form 8 on the Voter Portal. Type 'menu' for options.";
                newState = 'menu';
                break;
            default:
                reply = MENU_TEXT;
                newState = 'menu';
                break;
        }
    } else if (state === 'age_check') {
        const age = parseInt(text, 10);
        if (isNaN(age)) {
            reply = 'Please enter a valid age as a number. (e.g., 25)';
            newState = 'age_check';
        } else if (age >= 18) {
            reply = 'Great news! You are eligible to vote. 🇮🇳 Type "menu" to see other options.';
            newState = 'menu';
        } else {
            reply = `You must be 18 or older to vote. You will be eligible in ${18 - age} year(s). Type "menu" to go back.`;
            newState = 'menu';
        }
    } else {
        reply = MENU_TEXT;
        newState = 'menu';
    }

    res.json({ reply, state: newState });
});

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/ai', async (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.json({ reply: "Please ask me a question about voting or documents." });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are VoteSaathi-AI, a smart election assistant for Indian voters.
The user is asking: "${message}"

Rules for your response:
- Keep the answer very simple and easy to understand.
- Use structured, numbered steps or bullet points.
- Focus on providing clear guidance about voting, voter ID, or required documents.
- Do not use overly complex or technical language.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.json({ reply: "I'm sorry, my AI service is currently unavailable. Please try using the regular menu options to find basic information." });
    }
});

app.listen(PORT, () => {
    console.log(`VoteSaathi-AI server running on http://localhost:${PORT}`);
});
