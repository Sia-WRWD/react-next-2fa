This is a simple React Nextjs application that showcases the implementation of 2 Factor Authentication (2FA) using the library, SpeakEasy and QRCode scan functionality that can directly be added into the Google Authenticator app. It's built with the objectives of first time exploring the react nextjs framework, 2FA (via SpeakEasy), and external APIs.

## Features
- Registration
- Login
- 2 Factor Authentication (2FA)
- QR Code - Google Authenticator Integration

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
Make sure you have Node.js installed on your system (preferably the latest version). You can download it from Node.js official website.

### Installation
1. Clone the Repository
```
git clone https://github.com/Sia-WRWD/react-next-2fa.git
cd react-next-2fa
```
2. Install Dependencies for Front-End
```
npm install
```
3. Install Dependencies for Back-End
```
cd server
npm install
```
4. Setting up Firebase Environment Variables
```
// src/firebase.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    //Add your firebase's project configuration here.
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
```
5. Create the "user" collection in Firestore.
6. Enable the Sign In with Email and Password Authentication.
7. Running the Front-End Application
```
npm start
```
This runs the application in development mode. Open http://localhost:3000 to view it in the browser.
8. Running the Back-End Application
```
cd server
npm start
```

## Building for Production
To build the app for production, run:
```
npm run build
```

# Lesson Learnt:
1. React Next utilizes folder as routing.
2. Don't try to edit Layout.js, just utilize the page.js.
3. In React Next, need to use "use client" if need to use useState. (https://stackoverflow.com/questions/74965849/youre-importing-a-component-that-needs-usestate-it-only-works-in-a-client-comp)
4.

# References:
1. https://blog.devgenius.io/two-factor-authentication-with-node-js-and-express-secure-your-app-ca6de34a6fcb (2FA Guide)
2. https://stackoverflow.com/questions/74421327/nextrouter-was-not-mounted-next-js (Next Navigation Issue)