import { useBlog } from "../hooks"
import { Appbar } from "../components/Appbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Avatar } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blog = () => {

  const navigate = useNavigate();
  
  useEffect(()=>{
    if(!localStorage.getItem("mediumToken")){
      toast.error("Login to access content!");
      navigate("/signin");
    }
  },[])
  
  const {loading,blog} = useBlog();
  
  if(!loading){
    return <div>
      <Appbar />
      <BlogSkeleton />
    </div>
  }
  
  return (<div>
    <Appbar />
      <div className="grid grid-cols-12">
        <div className="col-span-7 flex flex-col justify-center px-20">
          <div className="text-5xl font-bold">{blog.title}</div>
          <div className="text-md mt-5 text-slate-500">Posted on May 12, 2003</div>
          <div className="text-lg mt-6">{blog.content}</div>
        </div>
        <div className="col-span-5 mx-10">
          Author
          <div className="flex gap-5 mt-5">
            <div className="flex justify-center flex-col">
              <Avatar name={blog.author.name || "Anonymous"} size="small"/>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-2xl font-semibold mb-2">{blog.author.name || "Anonymous"}</div>
             <div className="text-md text-gray-500">{blog.author.quote || "" }</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}