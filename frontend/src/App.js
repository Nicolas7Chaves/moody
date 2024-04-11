import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
import './App.scss';
import LogIn from './components/LogIn';
import CreateAccount from './components/CreateAccount';
import Home from './components/Home';


function App() {
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        console.log("User is signed in", user);
        // You can use navigate function here if you want to redirect the user to /home
        // navigate('/home'); // Uncomment this and see the note below about navigation
      } else {
        console.log("No user is signed in.");
        // navigate('/'); // Redirect to login page
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Note: Direct navigation inside useEffect in App.js may require a different approach
  // because useNavigate() hook can only be used inside components that are children of <Router>

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/home' element={<Home />} />
        <Route path='/create-account' element={<CreateAccount />} />
      </Routes>
    </Router>
  );
}

export default App;