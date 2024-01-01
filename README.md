This is a simple React Nextjs application that showcases the implementation of 2 Factor Authentication (2FA) using the library, SpeakEasy and QRCode scan functionality that can directly be added into the Google Authenticator app. It's built with the objectives of first time exploring the react nextjs framework, 2FA (via SpeakEasy), and external APIs.

## Features
- Registration
- Login
- QR Code Integration

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Lesson Learnt:
1. React Next utilizes folder as routing.
2. Don't try to edit Layout.js, just utilize the page.js.
3. In React Next, need to use "use client" if need to use useState. (https://stackoverflow.com/questions/74965849/youre-importing-a-component-that-needs-usestate-it-only-works-in-a-client-comp)
4.

# References:
1. https://blog.devgenius.io/two-factor-authentication-with-node-js-and-express-secure-your-app-ca6de34a6fcb (2FA Guide)
2. https://stackoverflow.com/questions/74421327/nextrouter-was-not-mounted-next-js (Next Navigation Issue)