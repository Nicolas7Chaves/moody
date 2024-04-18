import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';
import LogOut from './LogOut';
import './styles.scss';
import Post from './Post';
import Header from './Header';

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
        <div className='home'>
            {userName && <p className='home__welcome'>Welcome, {userName}</p>}
            <Post />
        </div>
    );
}

export default Home;
