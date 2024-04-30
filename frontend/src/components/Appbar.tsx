import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard"
import { useEffect } from "react";
import toast from "react-hot-toast";

export const Appbar = () => {

    const userName = "Khanjan";
    const navigate = useNavigate();
    const location = useLocation();

    const path = location.pathname.split("/").slice(-1)[0];

    useEffect(()=>{
        if(!localStorage.getItem("mediumToken")){
            toast.error("Login to access the content!")
            navigate("/signin");
        }
    },[])

    const Signout = () => {
        localStorage.removeItem("mediumToken");
        navigate("/signin");
    }

    return <div className="flex justify-between p-5 px-10 border-b mb-10 text-lg">
        <div className="flex flex-col justify-center">
            <Link to="/blogs">Medium</Link>
        </div>
        <div className="flex justify-center items-center gap-4">
            <div>
            {path != "publish" ? <button type="button" onClick = {()=>{
                navigate('/publish')
            }} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm p-3 mx-3">New</button> : <span></span>}            
            Welcome, {userName.split(" ")[0]}</div>
            <Avatar name={userName} size="big"/>
            <button type="button" onClick={Signout} className=" text-white bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-xl text-sm p-3">
                Logout
            </button>
        </div>
    </div>
}