import './styles.scss';
import { collection, getDocs, orderBy, query, where, deleteDoc, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from '../firebase-config';
import { useEffect, useState, useCallback } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import like from '../images/like.svg';
import unlike from '../images/unlike.svg';


function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isAnonymous, setIsAnonymous] = useState(false);

    const fetchPosts = useCallback( async () => {
        const postsRef = collection(db, "posts");
        const q = query(postsRef, where("uid", "==", auth.currentUser.uid), orderBy("createdAt", "desc"));
        try {
            const querySnapshot = await getDocs(q);
            const postsData = querySnapshot.docs.map(doc => {
                const data = doc.data();
                const likedBy = data.likedBy || [];
                const isLiked = likedBy.includes(auth.currentUser.uid);
                return {
                    id: doc.id,
                    data: data,
                    isLiked: isLiked,
                    likedBy: likedBy
                };
            });
            setPosts(postsData);
            console.log("Fetched posts data:", postsData);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }, [currentUser]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAnonymous(user ? user.isAnonymous : false);
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (currentUser) {
            fetchPosts();
        } else {
            setPosts([]);
        }
    }, [currentUser, fetchPosts]);

    function displayDate(firebaseDate) {
        if (!firebaseDate) return '';
        const date = firebaseDate.toDate();
        const day = date.getDate();
        const year = date.getFullYear();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        let hours = date.getHours();
        let minutes = date.getMinutes();
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        return `${day} ${month} ${year} - ${hours}:${minutes}`;
    }

    async function handleDeletePost(postId) {
        try {
            await deleteDoc(doc(db, "posts", postId));
            console.log("Post successfully deleted: ", postId);
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }

    const handleLike = async (post) => {
        if (!currentUser || isAnonymous) {
            console.log("No user logged in!");
            return;
        }
        const postRef = doc(db, "posts", post.id);
        const uid = currentUser.uid;
        if (post.isLiked) {
            await updateDoc(postRef, {
                likedBy: arrayRemove(uid)
            });
        } else {
            await updateDoc(postRef, {
                likedBy: arrayUnion(uid)
            });
        }
        fetchPosts();
    };

    return (
        <div className='my-posts'>
            <h1 className='my-posts__title'>My Posts</h1>
            {posts.map(post => (
                <div className='my-posts__post' key={post.id}>
                    <p className='my-posts__user'>You</p>
                    <p className='my-posts__post-body'>{post.data.body}</p>
                    <div className='likes'>
                        <button
                            className='likes__button'
                            onClick={() => handleLike(post)}>
                            <img className='likes__icons' src={post.isLiked ? like : unlike} alt={post.isLiked ? "Like" : "Unlike"} />
                        </button>
                        <span className='likes__numbers'>{post.likedBy ? post.likedBy.length : 0}</span>
                    </div>
                    <p className='my-posts__date'>{displayDate(post.data.createdAt)}</p>
                    <button className='my-posts__delete' onClick={() => handleDeletePost(post.id)}>🗑️</button>
                </div>
            ))}
        </div>
    );
}

export default MyPosts;
