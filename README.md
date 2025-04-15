# Gemini Chat Application

A web application that allows you to chat with Google's Gemini AI model. This application includes both frontend and backend components.

## Features

- Clean, modern chat interface
- Real-time communication with Gemini AI
- Responsive design that works on desktop and mobile
- Loading animations and timestamps for messages

## Prerequisites

- Node.js (v21 or higher)
- npm (comes with Node.js)
- A Gemini API key from Google AI Studio

## Setup Instructions

### 1. Get a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/)
2. Sign in with your Google account
3. Create a new API key or use an existing one
4. Copy the API key for the next step

### 2. Configure the API Key

1. Open the file `backend/.env`
2. Replace `your_api_key_here` with your actual Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key
   ```

### 3. Install Dependencies

Navigate to the backend directory and install the required packages:

```bash
cd gemini-chat/backend
npm install
```

### 4. Run the Application

Start the server:

```bash
npm start
```

The application will be available at http://localhost:2000

## Usage

1. Open your browser and navigate to http://localhost:2000
2. Type your message in the input field at the bottom
3. Press Enter or click the send button
4. Wait for Gemini's response
5. Continue the conversation as desired

## Project Structure

```
gemini-chat/
├── backend/
│   ├── server.js      # Express server and API endpoints
│   ├── package.json   # Backend dependencies
│   └── .env           # Environment variables (API key)
└── frontend/
    ├── index.html     # HTML structure
    ├── styles.css     # CSS styling
    └── script.js      # Frontend JavaScript
```

## Troubleshooting

- If you see an error about the API key, make sure you've correctly added your Gemini API key to the `.env` file
- If the server won't start, ensure you have Node.js installed and that port 2000 is not in use
- If you're getting CORS errors, make sure you're accessing the application via http://localhost:2000

## License

This project is open source and available under the MIT License.
