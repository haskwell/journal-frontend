import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './MainPage';
import ResetPasswordPage from './ResetPasswordPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </Router>
  );
}


export default App;
