import './styles.scss';
import { collection, getDocs, orderBy, query, where, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase-config';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";

function MyPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const fetchPosts = async () => {
                    const queries = query(collection(db, "posts"),
                        where("uid", "==", user.uid),
                        orderBy("createdAt", "desc")
                    );
                    try {
                        const querySnapshot = await getDocs(queries);
                        const postsData = querySnapshot.docs.map(doc => ({
                            id: doc.id,
                            data: doc.data()
                        }));
                        setPosts(postsData);
                        console.log("Fetched posts data:", postsData);
                    } catch (error) {
                        console.error("Error fetching posts:", error);
                    }
                };
                fetchPosts();
            } else {
                setPosts([]);
            }
        });
        return () => unsubscribe();
    }, []);

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

    // Function to fetch posts for today
    const fetchPostsForToday = async () => {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        
        const postsRef = collection(db, "posts");
        
        const q = query(postsRef, where("uid", "==", auth.currentUser.uid),
            where("createdAt", ">=", startOfDay),
            where("createdAt", "<=", endOfDay),
            orderBy("createdAt", "desc")
        );

        try {
            const querySnapshot = await getDocs(q);
            const postsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }));
            setPosts(postsData);
            console.log("Fetched today's posts:", postsData);
        } catch (error) {
            console.error("Error fetching today's posts:", error);
        }
    };


        // Function to fetch all posts
        const fetchAllPosts = async () => {
            const postsRef = collection(db, "posts");
            
            const q = query(postsRef, where("uid", "==", auth.currentUser.uid),
                orderBy("createdAt", "desc")
            );
    
            try {
                const querySnapshot = await getDocs(q);
                const postsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }));
                setPosts(postsData);
                console.log("Fetched all posts:", postsData);
            } catch (error) {
                console.error("Error fetching all posts:", error);
            }
        };


    return (
        <div className='my-posts'>
            <h1 className='my-posts__title'>My Posts</h1>
            <button onClick={fetchPostsForToday}>Fetch Today's Posts</button>
            <button onClick={fetchAllPosts}>Fetch All Posts</button>
            {posts.map(post => (
                <div className='my-posts__post' key={post.id}>
                    <p className='my-posts__post-body'>{post.data.body}</p>
                    <p className='my-posts__date'>{displayDate(post.data.createdAt)}</p>
                    <button className='my-posts__delete' onClick={() => handleDeletePost(post.id)}>🗑️</button>
                </div>
            ))}
        </div>
    );
}

export default MyPosts;
