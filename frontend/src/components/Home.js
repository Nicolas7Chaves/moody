import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';
import LogOut from './LogOut';
import './styles.scss';

function Home() {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) {
                setUserName(user.displayName || user.email || "User");
            } else {
                setUserName('');
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            <h1>Home page logged in!</h1>
            {userName && <p>Welcome, {userName}</p>}
            <LogOut />
        </>
    );
}

export default Home;
