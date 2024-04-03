import LogIn from './components/LogIn';
import CreateAccount from './components/CreateAccount';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';


function App() {
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
