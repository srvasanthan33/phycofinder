import React from "react"
import { GiAlgae } from "react-icons/gi"
import { VscRunAll } from "react-icons/vsc"
import { IoStatsChart } from "react-icons/io5"
import { IoPersonCircleSharp } from "react-icons/io5"
import { Link } from "react-router-dom"

function Sidebar() {
    return (
        <div
            className="top-0 left-0 h-screen w-28
                        flex flex-col drop-shadow-xl shadow-md shadow-black
                        bg-teal-900 text-lime-300 "
        >
            
            <SideBarIcon icon={<GiAlgae size="36" />} route='/'/>
            <SideBarIcon icon={<VscRunAll size="28" />} route='/launch'/>
            <SideBarIcon icon={<IoStatsChart size="28" />} route='/statistic'/>
            <SideBarIcon icon={<IoPersonCircleSharp size="28" />}route='/profile' />
        </div>
    )
}

const SideBarIcon = ({ icon,route }) => (
    <div className="sidebar-icon">
        <Link to={route}>{icon}</Link>
    </div>
)

export default Sidebar
