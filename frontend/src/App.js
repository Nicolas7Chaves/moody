import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import '../src/components/styles.scss';
import LogIn from './components/LogIn';
import CreateAccount from './components/CreateAccount';
import HomePage from './pages/HomePage';
import MyProfilePage from './pages/MyProfilePage';

function RequireAuth({ children }) {
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  if (!user.emailVerified) {
    const errorMessage = "Please verify your email address before logging in.";
    alert(errorMessage); // Consider replacing with a less disruptive UI update
    return <Navigate to="/" state={{ from: location }} />;
  }
  
  return children;
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/create-account' element={<CreateAccount />} />
        <Route
          path='/home'
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route
          path='/my-profile'
          element={
            <RequireAuth>
              <MyProfilePage />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
