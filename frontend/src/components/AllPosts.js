import './styles.scss';
import { collection, getDocs, orderBy, query, where, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from '../firebase-config';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";


function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const fetchPosts = async () => {
                    const queries = query(collection(db, "posts"),
                        orderBy("createdAt", "desc")
                    );
                    try {
                        const querySnapshot = await getDocs(queries);
                        const postsData = querySnapshot.docs.map(doc => ({
                            id: doc.id,
                            displayName: user.displayName,
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


    // Function to fetch posts for today
    const fetchPostsForToday = async () => {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const postsRef = collection(db, "posts");

        const q = query(postsRef, 
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


    const fetchPostsForThisWeek = async () => {
        // Calculate the start and end date of the current week
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // End of the week (Saturday)

        // Fetch posts within the current week
        const postsRef = collection(db, "posts");

        const q = query(postsRef, 
            where("createdAt", ">=", startOfWeek),
            where("createdAt", "<=", endOfWeek),
            orderBy("createdAt", "desc")
        );

        try {
            const querySnapshot = await getDocs(q);
            const postsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }));
            setPosts(postsData);
            console.log("Fetched posts for this week:", postsData);
        } catch (error) {
            console.error("Error fetching posts for this week:", error);
        }
    };


    const fetchPostsForThisMonth = async () => {
        // Calculate the start and end date of the current month
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        // Fetch posts within the current month
        const postsRef = collection(db, "posts");

        const q = query(postsRef, 
            where("createdAt", ">=", startOfMonth),
            where("createdAt", "<=", endOfMonth),
            orderBy("createdAt", "desc")
        );

        try {
            const querySnapshot = await getDocs(q);
            const postsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }));
            setPosts(postsData);
            console.log("Fetched posts for this month:", postsData);
        } catch (error) {
            console.error("Error fetching posts for this month:", error);
        }
    };


    // Function to fetch all posts
    const fetchAllPosts = async () => {
        const postsRef = collection(db, "posts");

        const q = query(postsRef, 
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
            <h1 className='my-posts__title'>Feed</h1>
            <div className='filter'>
                <button className='filter__button' onClick={fetchPostsForToday}>Today</button>
                <button className='filter__button' onClick={fetchPostsForThisWeek}>Week</button>
                <button className='filter__button' onClick={fetchPostsForThisMonth}>Month</button>
                <button className='filter__button' onClick={fetchAllPosts}>All</button>
            </div>
            {posts.map(post => (
                <div className='my-posts__post' key={post.id}>
                    <p>{post.displayName || "user"}</p>
                    <p className='my-posts__post-body'>{post.data.body}</p>
                    <p className='my-posts__date'>{displayDate(post.data.createdAt)}</p>
                </div>
            ))}
        </div>
    );
}

export default AllPosts;