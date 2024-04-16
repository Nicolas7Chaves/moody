import './styles.scss'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase-config';
import { useState } from 'react';

function Post(postBody) {
    const [postText, setPostText] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "posts"), {
                body: postText
            });
            console.log("Document written with ID: ", docRef.id);
            setPostText('');
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="What do you want to post?"
                    value={postText} onChange={(e) => setPostText(e.target.value)} />
                <button type='submit'>Post</button>
            </form>
        </>
    )
}

export default Post;
