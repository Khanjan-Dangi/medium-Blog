type BlogCardType = {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    size?: "big" | "small"
}
export const BlogCard = ({authorName,title,content,publishedDate,size = "small"}: BlogCardType) => {
    return <div className="w-full border-b border-slate-200 pb-6">
        <div className="flex gap-2">
            <div className="flex justify-center">
                <Avatar name= {authorName} size={size}/>
            </div>
            <div className="text-md font-normal">{authorName}</div>
            <div className="flex items-center"><Circle /></div>
            <div className="text-md font-light text-slate-500">{publishedDate}</div>
        </div>

        <div className="mt-4">
            <div className="text-2xl font-bold">{title}</div>
            <div className="text-md mt-3 font-light">{content.slice(0,100)}{content.length > 100 ? "..." : ""}</div>

            <div className="mt-5 text-xs font-light text-slate-500 rounded-md bg-slate-200 max-w-24 text-center p-0.5">
                {`${Math.floor(content.length/100)} minute(s) read`}
            </div>
        </div>
        
    </div>
}

export function Circle(){
    return <div className="h-0.5 w-0.5 bg-slate-500 rounded-md"></div>
}

export function Avatar({name,size = "small"}: {name:string,size?: "big" | "small"}){
    return(
        <div className= {`relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-600 ${size == "small"? "w-6 h-6": "w-10 h-10"}`}>
            <span className={`font-medium text-gray-300 ${size == 'small'? "text-md" : "text-xl"}`}>{name[0]}</span>
        </div>
    )
}