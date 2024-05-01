import './styles.scss';
import { collection, getDocs, orderBy, query, where, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from '../firebase-config';
import { useEffect, useState, useCallback } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import like from '../images/like.svg';
import unlike from '../images/unlike.svg';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [active, setActive] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [isAnonymous, setIsAnonymous] = useState(false);

    const fetchPosts = useCallback(async () => {
        const queries = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        try {
            const querySnapshot = await getDocs(queries);
            const postsData = querySnapshot.docs.map(doc => {
                const data = doc.data();
                const likedBy = data.likedBy || [];
                const isLiked = currentUser ? likedBy.includes(currentUser.uid) : false;
                return {
                    id: doc.id,
                    displayName: data.displayName || "user",
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
            setActive(user ? 'all' : '');
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

        setPosts(posts.map(p => {
            if (p.id === post.id) {
                const updatedLikedBy = post.isLiked ? post.likedBy.filter(id => id !== uid) : [...post.likedBy, uid];
                return {
                    ...p,
                    isLiked: !p.isLiked,
                    likedBy: updatedLikedBy
                };
            } else {
                return p;
            }
        }));
    };

    const fetchPostsForToday = async () => {
        setActive('today');
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
            const postsData = querySnapshot.docs.map(doc => {
                const data = doc.data();
                const likedBy = data.likedBy || [];
                const isLiked = likedBy.includes(auth.currentUser.uid);
                return {
                    id: doc.id,
                    displayName: doc.data().displayName,
                    data: data,
                    isLiked: isLiked,
                    likedBy: likedBy
                };
            });
            setPosts(postsData);
            console.log("Fetched today's posts:", postsData);
        } catch (error) {
            console.error("Error fetching today's posts:", error);
        }
    };


    const fetchPostsForThisWeek = async () => {
        setActive('week');
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // End of the week (Saturday)
        const postsRef = collection(db, "posts");

        const q = query(postsRef,
            where("createdAt", ">=", startOfWeek),
            where("createdAt", "<=", endOfWeek),
            orderBy("createdAt", "desc")
        );

        try {
            const querySnapshot = await getDocs(q);
            const postsData = querySnapshot.docs.map(doc => {
                const data = doc.data();
                const likedBy = data.likedBy || [];
                const isLiked = likedBy.includes(auth.currentUser.uid);
                return {
                    id: doc.id,
                    displayName: doc.data().displayName,
                    data: data,
                    isLiked: isLiked,
                    likedBy: likedBy
                };
            });
            setPosts(postsData);
            console.log("Fetched today's posts:", postsData);
        } catch (error) {
            console.error("Error fetching today's posts:", error);
        }
    };


    const fetchPostsForThisMonth = async () => {
        setActive('month');
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const postsRef = collection(db, "posts");

        const q = query(postsRef,
            where("createdAt", ">=", startOfMonth),
            where("createdAt", "<=", endOfMonth),
            orderBy("createdAt", "desc")
        );

        try {
            const querySnapshot = await getDocs(q);
            const postsData = querySnapshot.docs.map(doc => {
                const data = doc.data();
                const likedBy = data.likedBy || [];
                const isLiked = likedBy.includes(auth.currentUser.uid);
                return {
                    id: doc.id,
                    displayName: doc.data().displayName,
                    data: data,
                    isLiked: isLiked,
                    likedBy: likedBy
                };
            });
            setPosts(postsData);
            console.log("Fetched today's posts:", postsData);
        } catch (error) {
            console.error("Error fetching today's posts:", error);
        }
    };

    const fetchAllPosts = async () => {
        setActive('all');
        const postsRef = collection(db, "posts");

        const q = query(postsRef,
            orderBy("createdAt", "desc")
        );

        try {
            const querySnapshot = await getDocs(q);
            const postsData = querySnapshot.docs.map(doc => {
                const data = doc.data();
                const likedBy = data.likedBy || [];
                const isLiked = likedBy.includes(auth.currentUser.uid);
                return {
                    id: doc.id,
                    displayName: doc.data().displayName,
                    data: data,
                    isLiked: isLiked,
                    likedBy: likedBy
                };
            });
            setPosts(postsData);
            console.log("Fetched today's posts:", postsData);
        } catch (error) {
            console.error("Error fetching today's posts:", error);
        }
    };


    return (
        <div className='my-posts'>
            <h1 className='my-posts__title'>Feed</h1>
            <div className='filter'>
                <button className={`filter__button ${active === 'today' ? 'active' : ''}`} onClick={fetchPostsForToday}>Today</button>
                <button className={`filter__button ${active === 'week' ? 'active' : ''}`} onClick={fetchPostsForThisWeek}>Week</button>
                <button className={`filter__button ${active === 'month' ? 'active' : ''}`} onClick={fetchPostsForThisMonth}>Month</button>
                <button className={`filter__button ${active === 'all' ? 'active' : ''}`} onClick={fetchAllPosts}>All</button>
            </div>
            {posts.map(post => (
                <div className='my-posts__post' key={post.id}>
                    <p className='my-posts__user'>{post.displayName || "user"}</p>
                    <p className='my-posts__post-body'>{post.data.body}</p>
                    <div className='likes'>
                        <button
                            disabled={isAnonymous}
                            className='likes__button'
                            onClick={() => handleLike(post)}>
                            <img className='likes__icons' src={post.isLiked ? like : unlike} alt={post.isLiked ? "Like" : "Unlike"} />
                        </button>
                        <span className='likes__numbers'>{post.likedBy.length}</span>
                    </div>
                    <p className='my-posts__date'>{displayDate(post.data.createdAt)}</p>

                </div>
            ))}
        </div>
    );
}

export default AllPosts;