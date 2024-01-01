"use client"

// pages/login.js
import React, { useEffect } from 'react';
import { useQRCode } from 'next-qrcode';
import { useRouter } from 'next/navigation'; // Import from 'next/router', not 'next/navigation'
import Link from 'next/link';

export default function Page() {
    const { Canvas } = useQRCode();
    const router = useRouter();

    // Get the secret from session storage
    const secret = typeof window !== 'undefined' ? sessionStorage.getItem('secret') || '' : '';
    const email = typeof window !== 'undefined' ? sessionStorage.getItem('userEmail') || '' : '';

    // Generate OTP URI based on your application details
    const accountName = email; // Change this to the user's account name
    const issuer = 'RT2FA'; // Change this to your application's name
    const otpUri = generateOTPURI(accountName, issuer, secret);

    // useEffect to redirect to the login page if there's no secret
    useEffect(() => {
        if (!secret) {
            // Use router.push for programmatic navigation
            router.push('/pages/login');
        } else {
            // Remove the session storage item after attaching it to qrCodeData
            sessionStorage.removeItem('userEmail');
            sessionStorage.removeItem('secret');
        }
    }, [secret, router]);

    // Return null during redirection
    if (!secret) {
        return null;
    }

    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center text-center">
            <h1 className='text-6xl mb-5 font-black tracking-wider text-green-400'>Scan the 2FA QR Code</h1>
            <div className="qr-code-container w-100 h-100 mb-4">
                <Canvas
                    text={otpUri}
                    options={{
                        errorCorrectionLevel: 'M',
                        margin: 3,
                        scale: 4,
                        width: 400,
                        color: {
                            dark: '#000000',
                            light: '#FFFFFF',
                        },
                    }}
                />
            </div>
            <div className="text-base w-1/3 mb-3">
                Scan the QR Code using the Google Authenticator to set up your 2-Factor Authentication (2FA).
            </div>
            <div>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded drop-shadow-lg tracking-wider text-xl">
                    <Link href="/pages/login">
                        Login
                    </Link>
                </button>
            </div>
        </div>
    );
}

// Function to generate OTP URI
function generateOTPURI(accountName, issuer, secret) {
    const encodedIssuer = encodeURIComponent(issuer);
    const encodedAccountName = encodeURIComponent(accountName);
    const uri = `otpauth://totp/${encodedIssuer}:${encodedAccountName}?secret=${secret}&issuer=${encodedIssuer}&algorithm=SHA1&digits=6&period=30`;

    return uri;
}
