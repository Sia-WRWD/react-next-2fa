import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../../firebase';
import axios from 'axios';

const db = getFirestore(app);
const auth = getAuth(app);

export const registerUser = async (user) => {

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
        // Add a new document to the 'user' collection
        await addDoc(collection(db, 'user'), {
            uid: userCredential.user.uid,
            username: user.username,
            about: user.about,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            country: user.country,
            street: user.street,
            city: user.city,
            state: user.state,
            zipcode: user.zipcode,
            secret: user.secret
        });

        return "User Successfully Registered! Generating 2FA Secret...";
    } catch (error) {
        console.error(error);
        return "Something Went Wrong! Please Try Again Later.";
    }
}

export const generateSecret = async () => {
    const secret = await axios.post('http://localhost:5000/auth/create-secret');
    return secret;
}

export const verifyLogin = async (login) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, login.email, login.password);
        const uid = userCredential.user.uid;
        const user = await getUserDetails(uid);

        if (!user.secret) {
            console.error('User secret is undefined or null.');
            return "Something Went Wrong! Please Try Again Later.";
        }

        const verify2FAResponse = await verify2FA(login.token, user.secret);

        if (verify2FAResponse == "Login successful!") {
            // Remove sensitive information (2FA secret) from user data
            const sanitizedUserData = { ...user, secret: undefined };

            console.log(sanitizedUserData);
            return { user: sanitizedUserData, message: "User Successfully Verified & Authenticated!" };
        } else {
            return "Something Went Wrong! Please Try Again Later.";
        }
    } catch (error) {
        console.error(error);
        return "Something Went Wrong! Please Try Again Later.";
    }
}

export const verify2FA = async (token, secret) => {
    try {
        const response = await axios.post('http://localhost:5000/auth/verify-user', {
            token: token,
            secret: secret
        });

        if (response.data == "Login successful!") {
            return "Login successful!";
        }
    } catch (error) {
        console.error(error);
        return "Something Went Wrong! Please Try Again Later.";
    }
}

export const getUserDetails = async (uid) => {
    try {
        // Create a query to find the document with the specified uid
        const q = query(collection(db, 'user'), where('uid', '==', uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Assuming there's only one document with the specified uid
            const userDocSnapshot = querySnapshot.docs[0];
            const userData = userDocSnapshot.data();
            return userData;
        } else {
            // Handle the case where no document matches the query
            console.log('User not found in Firestore.');
            return null;
        }
    } catch (error) {
        // Handle errors
        console.error('Error fetching user details:', error);
        return null;
    }
};