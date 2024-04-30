import axios from "axios"
import { Appbar } from "../components/Appbar"
import { useState } from "react"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Publish = () => {
    const navigate = useNavigate();
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");

    return <div className="">
        <Appbar />
        <div className="flex justify-center max-w-xl w-full mx-auto flex-col gap-5">
            <input type="text" onChange = {(e)=>{
                setTitle(e.target.value)
            }} className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl font-semibold rounded-lg block w-full p-5 " placeholder="Title" required />
        
            <textarea id="message" onChange ={(e)=>{
                setContent(e.target.value);
            }} rows={8} className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Tell your story...."></textarea>

            <button type="submit" onClick = {async() => {
                const response = axios.post(`${BACKEND_URL}/api/v1/blog`,{
                    title,content
                },{
                    headers: {
                        Authorization: localStorage.getItem("mediumToken")
                    }
                })

                const result = await toast.promise(response,{
                    loading:"Publishing Post..",
                    success:"Posted Successfully",
                    error:"Errored"
                })

                navigate(`/blog/${result.data.id}`);
            }} className="inline-flex w-32 items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                Publish post
            </button>
        </div>
    </div>
}