import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import HomePage from './pages/HomePage';
import OptionsPage from './pages/user/OptionsPage';
import ChangeEmailPage from './pages/user/ChangeEmailPage';
import ChangePasswordPage from './pages/user/ChangePasswordPage';
import ChangeUsernamePage from './pages/user/ChangeUsernamePage';
import EntriesPage from './pages/entries/EntriesPage';
import UpdateEntriesPage from './pages/entries/UpdateEntriesPage';
import SharingPage from './pages/sharing/SharingPage';
import ViewSharedPage from './pages/sharing/ViewSharedPage';
import AuthGuard from './utils/authGuard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route element={<AuthGuard/>}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/options/email" element={<ChangeEmailPage />} />
          <Route path="/options/password" element={<ChangePasswordPage />} />
          <Route path="/options/username" element={<ChangeUsernamePage />} />
          <Route path="/options" element={<OptionsPage />} />
          <Route path="/entries" element={<EntriesPage />} />
          <Route path="/entries/update/:pageNumber" element={<UpdateEntriesPage />} />
          <Route path="/entries/shared" element={<SharingPage />} />
          <Route path="/entries/shared/:pageId" element={<ViewSharedPage />} />
        </Route>
      </Routes>
    </Router>
  );
}


export default App;
