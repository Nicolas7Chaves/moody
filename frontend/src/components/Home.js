import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';
import { doc, getDoc, getFirestore } from "firebase/firestore"; 
import './styles.scss';
import Post from './Post';
import AllPosts from './AllPosts';

function Home() {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const db = getFirestore();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log(user);
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUserName(userData.username || user.email);
                } else {
                    setUserName(user.email || "User");
                }
            } else {
                setUserName('');
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className='home'>
            {userName && <p className='home__welcome'>Hey, {userName}</p>}
            <Post />
            <AllPosts />
        </div>
    );
}

export default Home;
