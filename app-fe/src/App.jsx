import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Sidebar from "./Sidebar/Sidebar"
import Profile from "./Profile/Profile"
import Login from "./Auth/Login"
import Register from "./Auth/Register"
import Algae from "./Algae/Algae"
import Launcher from "./Launcher/Launcher"
import Statistic from "./Stat/Statistic"

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="flex text-white ">
                                <Sidebar />
                                <Profile />
                            </div>
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <div className="flex">
                                <Login />
                            </div>
                        }
                    />

                    <Route
                        path="/register"
                        element={
                            <div className="flex">
                                <Register />
                            </div>
                        }
                    />
                    <Route
                        path="/home"
                        element={
                            <div className="flex">
                                <Sidebar/>
                                <Algae/>
                            </div>
                        }
                    />
                    <Route
                        path="/launch"
                        element={
                            <div className="flex">
                                <Sidebar/>
                                <Launcher/>
                            </div>
                        }
                    />
                    <Route
                        path="/statistic"
                        element={
                            <div className="flex">
                                <Sidebar/>
                                <Statistic/>
                            </div>
                        }
                    />
                </Routes>
            </Router>
        </div>
    )
}

export default App
