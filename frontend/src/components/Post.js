import './styles.scss'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from '../firebase-config';
import { useEffect, useState } from 'react';

function Post() {
    const [postText, setPostText] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user) {
            // const formattedText = postText.replace(/\n/g, "<br>");
            try {
                const docRef = await addDoc(collection(db, "posts"), {
                    body: postText,
                    uid: user.uid,
                    createdAt: serverTimestamp(),
                    displayName: user.displayName,
                });
                console.log("Document written with ID: ", docRef.id);
                setPostText('');
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
                <textarea  className="posting__textarea" placeholder="What do you want to post?"
                    value={postText} onChange={(e) => setPostText(e.target.value)}>
                    </textarea>
                <button className='posting__button' type='submit'>Post</button>
            </form>
        </div>
    )
}

export default Post;
