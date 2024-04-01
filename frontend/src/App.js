import LogIn from './components/LogIn';
import CreateAccount from './components/CreateAccount';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/create-account' element={<CreateAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
