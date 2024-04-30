import { Link, useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"
import { useEffect } from "react";
import toast from "react-hot-toast";
import { BlogsSkeleton } from "../components/BlogSkeleton";

export const Blogs = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem("mediumToken")){
            toast.error("Login to access content!");
            navigate("/signin");
        }
    },[])
    
    const {loading,blogs} = useBlogs();

    if(!loading){
        return <div>
            <Appbar />
            <div className="h-full flex justify-center items-center max-w-full">
                <div className="max-w-xl w-full p-5 flex flex-col gap-7">
                    <BlogsSkeleton />
                    <BlogsSkeleton />
                    <BlogsSkeleton />
                    <BlogsSkeleton />
                    <BlogsSkeleton />
                    <BlogsSkeleton />
                    <BlogsSkeleton />
                </div>
            </div>
        </div>
    }

    return <div className="">
        <Appbar />

        <div className="h-full flex justify-center items-center max-w-full">
                <div className="max-w-xl w-full p-5 flex flex-col gap-7">

                    {blogs.map((blog)=>{
                        return <Link to={`/blog/${blog.id}`}> 
                        <BlogCard 
                        authorName={blog.author.name || "Anonymous"}
                        title={blog.title}
                        content={blog.content}
                        publishedDate="May 21, 2003"/>
                        </Link>
                    })}

                </div>
        </div>
    </div> 
    
    
}