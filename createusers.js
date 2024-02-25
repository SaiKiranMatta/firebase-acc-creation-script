const { createUserWithEmailAndPassword } = require("firebase/auth");
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const users = require("./users.json"); // Assuming "./users.json" exports an array of users
require("dotenv").config();

// Initialize Firebase app
const app = initializeApp({
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
});
const auth = getAuth(app);

// Function to create a user with email and password
async function createUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        console.log("User created:", userCredential.user.uid);
    } catch (error) {
        console.error("Error creating user:", error.message);
    }
}

function createUsers() {
    try {
        users.users.forEach((user) => {
            createUser(user.email, user.password);
        });

        console.log("Users created successfully");
    } catch (error) {
        console.error("Error creating user:", error.message);
    }
}
createUsers();
