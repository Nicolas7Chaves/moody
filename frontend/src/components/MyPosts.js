import './styles.scss';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from '../firebase-config';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";

function MyPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const fetchPosts = async () => {
                    const queries = query(collection(db, "posts"), where("uid", "==", user.uid));
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
    
    return (
        <div>
            <h1>My Posts</h1>
            {posts.map(post => {
                return ( 
                    <div className='post' key={post.id}>
                        <p>{post.data.body}</p>
                        <p>{displayDate(post.data.createdAt)}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default MyPosts;