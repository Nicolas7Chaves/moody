import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import './App.scss';
import LogIn from './components/LogIn';
import CreateAccount from './components/CreateAccount';
import HomePage from './pages/HomePage';
import MyProfilePage from './pages/MyProfilePage';

function RequireAuth({ children }) {
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  if (!user) {
    return <Navigate to="/create-account" state={{ from: location }} />;
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
