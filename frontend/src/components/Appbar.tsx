import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Appbar = () => {

    const [userName,setUserName] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const path = location.pathname.split("/").slice(-1)[0];

    useEffect(()=>{
        if(!localStorage.getItem("mediumToken")){
            toast.error("Login to access the content!")
            navigate("/signin");
        }
    },[])

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/user/me`,{
            headers: {
                Authorization: localStorage.getItem("mediumToken")
            }
        }).then((response)=>{
            setUserName(response.data.name);
        })
    },[])

    const Signout = () => {
        localStorage.removeItem("mediumToken");
        navigate("/signin");

        setUserName("");
    }

    return <div className="flex justify-between p-5 px-10 border-b mb-10 text-lg">
        <div className="flex flex-col justify-center">
            <Link to="/blogs">Medium</Link>
        </div>
        <div>
        {path != "publish" ? <button type="button" onClick = {()=>{
                navigate('/publish')
            }} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm p-3 mx-3">New Blog</button> : <div></div>}
        </div>
        <div className="flex justify-center items-center gap-4">          
                {userName ? 
                <div>Welcome, {userName.split(" ")[0]}</div> : 
                <div role="status" className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded-full w-28 mt-1"></div>
                </div>}
            <button type="button" onClick={Signout} className=" text-white bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-xl text-sm p-3">
                Logout
            </button>
        </div>
    </div>
}