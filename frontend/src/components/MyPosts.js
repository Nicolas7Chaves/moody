import './styles.scss';
import { collection, getDocs, orderBy, query, where, deleteDoc, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from '../firebase-config';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import like from '../images/like.svg';
import unlike from '../images/unlike.svg';


function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [active, setActive] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [isAnonymous, setIsAnonymous] = useState(false);

    const fetchPosts = async () => {
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
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setActive('all');
                setCurrentUser(user);
                setIsAnonymous(user.isAnonymous);
                fetchPosts();
            } else {
                setCurrentUser(null);
                setIsAnonymous(false);
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

    const fetchPostsForToday = async () => {
        setActive('today');
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
            console.log("Query snapshot:", querySnapshot.docs);
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
            console.log("Posts data:", postsData);
            if (postsData.length === 0) {
                console.log("No posts found for today.");
            } else {
                setPosts(postsData);
                console.log("Fetched today's posts:", postsData);
            }
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

        const q = query(postsRef, where("uid", "==", auth.currentUser.uid),
            where("createdAt", ">=", startOfWeek),
            where("createdAt", "<=", endOfWeek),
            orderBy("createdAt", "desc")
        );

        try {
            const querySnapshot = await getDocs(q);
            console.log("Query snapshot:", querySnapshot.docs);
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
            console.log("Posts data:", postsData);
            if (postsData.length === 0) {
                console.log("No posts found for today.");
            } else {
                setPosts(postsData);
                console.log("Fetched today's posts:", postsData);
            }
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

        const q = query(postsRef, where("uid", "==", auth.currentUser.uid),
            where("createdAt", ">=", startOfMonth),
            where("createdAt", "<=", endOfMonth),
            orderBy("createdAt", "desc")
        );

        try {
            const querySnapshot = await getDocs(q);
            console.log("Query snapshot:", querySnapshot.docs);
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
            console.log("Posts data:", postsData);
            if (postsData.length === 0) {
                console.log("No posts found for today.");
            } else {
                setPosts(postsData);
                console.log("Fetched today's posts:", postsData);
            }
        } catch (error) {
            console.error("Error fetching today's posts:", error);
        }
    };


    const fetchAllPosts = async () => {
        setActive('all');
        const postsRef = collection(db, "posts");

        const q = query(postsRef, where("uid", "==", auth.currentUser.uid),
            orderBy("createdAt", "desc")
        );

        try {
            const querySnapshot = await getDocs(q);
            console.log("Query snapshot:", querySnapshot.docs);
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
            console.log("Posts data:", postsData);
            if (postsData.length === 0) {
                console.log("No posts found for today.");
            } else {
                setPosts(postsData);
                console.log("Fetched today's posts:", postsData);
            }
        } catch (error) {
            console.error("Error fetching today's posts:", error);
        }
    };

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
            <div className='filter'>
                <button className={`filter__button ${active === 'today' ? 'active' : ''}`} onClick={fetchPostsForToday}>Today</button>
                <button className={`filter__button ${active === 'week' ? 'active' : ''}`} onClick={fetchPostsForThisWeek}>Week</button>
                <button className={`filter__button ${active === 'month' ? 'active' : ''}`} onClick={fetchPostsForThisMonth}>Month</button>
                <button className={`filter__button ${active === 'all' ? 'active' : ''}`} onClick={fetchAllPosts}>All</button>
            </div>
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
