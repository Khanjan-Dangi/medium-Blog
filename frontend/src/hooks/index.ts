import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { useLocation } from "react-router-dom";

type Blog = {
    id: string,
    title: string,
    content: string,
    author: {
        name: string
    }
}

export const useBlog = () => {
    const [blog,setBlog]= useState<Blog>({
        id: "",
        title: "",
        content: "",
        author: {
            name: ""
        }
    });
    const [loading,setLoading] = useState(false);

    const url = useLocation();

    const id = url.pathname.split("/").slice(-1)[0];

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                "Authorization": localStorage.getItem("mediumToken")
            }
        }).then((response)=>{
            setBlog(response.data.blog);
            setLoading(true);
        })
    },[])

    return {loading,blog};
}

export const useBlogs = () => {
    const [blogs,setBlogs]= useState<Blog[]>([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                "Authorization": localStorage.getItem("mediumToken")
            }
        }).then((response)=>{
            //@ts-ignore
            console.log(response.data.blogs)
            setBlogs(response.data.blogs);
            setLoading(true);
        })
    },[])

    return {loading,blogs};
}