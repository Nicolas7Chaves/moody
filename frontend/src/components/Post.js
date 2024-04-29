import './styles.scss'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from '../firebase-config';
import { useEffect, useState } from 'react';

function Post() {
    const [postText, setPostText] = useState('');
    const [user, setUser] = useState(null);
    const [isAnonymous, setIsAnonymous] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
            if (user) {
                setIsAnonymous(user.isAnonymous);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isAnonymous) {
            alert("Guest users cannot post content.");
            return; 
        }
        if (user) {
            const username = user.displayName || user.email;
            try {
                const docRef = await addDoc(collection(db, "posts"), {
                    body: postText,
                    uid: user.uid,
                    createdAt: serverTimestamp(),
                    displayName: username,
                });
                console.log("Document written with ID: ", docRef.id);
                setPostText('');
                window.location.reload();
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
        else {
            console.error("User not logged in")
        }

    }
    return (
        <div className='posting'>
            <form className='posting__form' onSubmit={handleSubmit}>
                <textarea disabled={isAnonymous} className="posting__textarea" placeholder={isAnonymous ? "Guest users cannot post content." : "What's on your mind?"}
                    value={postText} onChange={(e) => setPostText(e.target.value)}>
                </textarea>
                <button  disabled={isAnonymous} className='posting__button' type='submit'>{isAnonymous ? "🚫" : "Post"}</button>
            </form>
        </div>
    )
}

export default Post;
