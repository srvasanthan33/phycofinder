import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiAlgae } from "react-icons/gi";
import { VscRunAll } from "react-icons/vsc";
import { IoStatsChart, IoPersonCircleSharp, IoLogOutOutline } from "react-icons/io5";
import axios from 'axios';

function Sidebar({ setIsAuthenticated }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
            setIsAuthenticated(false);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <div className="top-0 left-0 h-screen w-28 flex flex-col drop-shadow-xl shadow-md shadow-black bg-teal-900 text-lime-300">
            <SideBarIcon icon={<GiAlgae size="36" />} text="Home" route='/' />
            <SideBarIcon icon={<VscRunAll size="28" />} text="Launch" route='/launch' />
            <SideBarIcon icon={<IoStatsChart size="28" />} text="Statistics" route='/statistic' />
            <SideBarIcon icon={<IoPersonCircleSharp size="28" />} text="Profile" route='/profile' />
            <div className="mt-auto mb-4">
                <SideBarIcon icon={<IoLogOutOutline size="28" />} text="Logout" onClick={handleLogout} />
            </div>
        </div>
    );
}

const SideBarIcon = ({ icon, text, route, onClick }) => (
    <div className="sidebar-icon group" onClick={onClick}>
        {route ? <Link to={route}>{icon}</Link> : icon}
        
    </div>
);

export default Sidebar;