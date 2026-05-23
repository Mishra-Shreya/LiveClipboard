# LiveClipboard

A realtime shared clipboard app where multiple people can join the same session and instantly sync text across devices.

## Live Demo

🚀 [Try LiveClipboard @ https://liveclipboard.vercel.app/](https://liveclipboard.vercel.app/)

## Features

- Create a live clipboard session
- Join a session with a room code
- Sync text in realtime
- Copy room link
- Clear shared clipboard
- Invite-only access with shared room link

## Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS

### Backend
- Node.js
- Socket.IO

### Deployment
- Vercel (Frontend)
- Render (Realtime Backend)

## How It Works

1. A user creates a session.
2. The app generates a unique room code.
3. Other users join using the same room code or invite link.
4. Any text typed or pasted into the shared clipboard is instantly broadcast to everyone in that room using WebSockets.

## Architecture

- Next.js frontend hosted on Vercel
- Socket.IO realtime server hosted on Render
- In-memory room/session management
- WebSocket-based realtime synchronization

## Local Setup Guide

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git

Verify installation:

```bash
node -v
npm -v
git --version
```

## 1. Clone the Repository

```bash
git clone https://github.com/Mishra-Shreya/LiveClipboard.git
```

## 2. Navigate Into the Project

```bash
cd LiveClipboard
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Create Environment Variables

Create a file named `.env.local` in the project root:

```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

## 5. Start the Socket.IO Backend

Open a terminal and run:

```bash
node server/index.js
```

This starts the realtime websocket server on:

```text
http://localhost:3001
```

## 6. Start the Next.js Frontend

Open another terminal and run:

```bash
npm run dev
```

This starts the frontend on:

```text
http://localhost:3000
```

## 7. Open the Application

Visit:

```text
http://localhost:3000
```

## 8. Test the App

- Create a session in one browser tab
- Open the same room in another tab or device
- Type or paste text
- Verify realtime synchronization

## Deployment

### Frontend Deployment (Vercel)

Deploy the Next.js frontend on Vercel.

### Backend Deployment (Render)

Deploy the Socket.IO server on Render as a Web Service.

## Environment Variables

### Local Development

```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

### Production

```env
NEXT_PUBLIC_SOCKET_URL=https://your-render-service.onrender.com
```

## Project Structure

```text
LiveClipboard/
├── app/
├── lib/
├── public/
├── server/
├── package.json
└── README.md
```

## Notes

- This is a live-only version.
- Sessions are stored in memory.
- If the backend restarts, active sessions are lost.
- Future improvements may include:
  - Redis persistence
  - Image support
  - File sharing
  - Session passwords
  - QR code room joining
  - End-to-end encryption
  - Dark mode
  - Presence indicators
  - Collaborative editing
  - Clipboard history

## Conclusion

I will be happy to answer any questions that you may have, and if you want to lend a hand with the LiveClipboard then please feel free to submit an issue and/or pull request 🙂

If you liked my work, don’t forget to ⭐ star the repo to show your support.