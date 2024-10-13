import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Profile from "./Profile/Profile";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Algae from "./Algae/Algae";
import Launcher from "./Launcher/Launcher";
import Statistic from "./Stat/Statistic";
import LoadingIcons from 'react-loading-icons';
import axios from 'axios';
import PageNotFound from "./PageNotFound/PageNotFound";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get('http://localhost:5000/check-auth', { withCredentials: true });
                setIsAuthenticated(res.data.isAuthenticated);
            } catch (err) {
                console.error("Authentication check failed:", err);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-teal-800">
                <LoadingIcons.Oval stroke="#ECFCCB" strokeWidth={3} height={50} width={50} />
            </div>
        );
    }

    const PrivateRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login" />;
    };

    return (
        <div className="App bg-teal-950 min-h-screen text-white">
            <Router>
                <Routes>
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/" element={
                        <PrivateRoute>
                            <div className="flex">
                                <Sidebar setIsAuthenticated={setIsAuthenticated} />
                                <Algae />
                            </div>
                        </PrivateRoute>
                    } />
                    <Route path="/home" element={
                        <PrivateRoute>
                            <div className="flex">
                                <Sidebar setIsAuthenticated={setIsAuthenticated} />
                                <Algae />
                            </div>
                        </PrivateRoute>
                    } />
                    <Route path="/launch" element={
                        <PrivateRoute>
                            <div className="flex">
                                <Sidebar setIsAuthenticated={setIsAuthenticated} />
                                <Launcher />
                            </div>
                        </PrivateRoute>
                    } />
                    <Route path="/statistic" element={
                        <PrivateRoute>
                            <div className="flex">
                                <Sidebar setIsAuthenticated={setIsAuthenticated} />
                                <Statistic />
                            </div>
                        </PrivateRoute>
                    } />
                    <Route path="/profile" element={
                        <PrivateRoute>
                            <div className="flex">
                                <Sidebar setIsAuthenticated={setIsAuthenticated} />
                                <Profile />
                            </div>
                        </PrivateRoute>
                    } />
                    <Route path="*" element={
                        <PrivateRoute>
                            <div className="flex">
                                <Sidebar setIsAuthenticated={setIsAuthenticated} />
                                <PageNotFound />
                            </div>
                        </PrivateRoute>
                    } />
                </Routes>
            </Router>
        </div>
    );
}

export default App;