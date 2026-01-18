import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TransactionProvider } from './context/TransactionContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Transactions } from './pages/Transactions';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
    return (
        <AuthProvider>
            <TransactionProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                        <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
                    </Routes>
                </Router>
            </TransactionProvider>
        </AuthProvider>
    );
}

export default App;
