import { Circle } from "./BlogCard"

export const BlogsSkeleton= () => {
    return <div className="w-full border-b border-slate-200 pb-6">
        <div role="status" className="animate-pulse">
            <div className="flex gap-2">
                <div className="flex justify-center">
                    <div className="h-6 bg-gray-200 rounded-full w-6 mb-4"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded-full w-28 mt-1"></div>
                <div className="flex items-center"><Circle /></div>
                <div className="h-4 bg-gray-200 rounded-full w-20 mt-1"></div>
            </div>

            <div className="mt-4">
            <div className="h-10 bg-gray-200 rounded-full w-84 mt-1"></div>
            <div className="h-5 bg-gray-200 rounded-full w-72 mt-4"></div>
            <div className="h-5 bg-gray-200 rounded-full w-84 mt-4"></div>
            <div className="h-5 bg-gray-200 rounded-full w-80 mt-4"></div>

            <div className="h-2 bg-gray-200 rounded-full w-24 mt-4"></div>
            </div>
        </div>
    </div> 
}

export const BlogSkeleton = () => {
    return <div role="status" className="animate-pulse">
        <div className="grid grid-cols-12">
            <div className="col-span-7 flex flex-col justify-center px-20">
                <div className="h-10 bg-gray-200 rounded-full w-full mt-1"></div>
                <div className="h-10 bg-gray-200 rounded-full w-11/12 mt-1"></div>
                <div className="h-3  bg-gray-200 rounded-full w-80 mt-4"></div>
                <div className="h-5 bg-gray-200 rounded-full w-full mt-4"></div>
                <div className="h-5 bg-gray-200 rounded-full w-full mt-4"></div>
                <div className="h-5 bg-gray-200 rounded-full w-full mt-4"></div>
                <div className="h-5 bg-gray-200 rounded-full w-full mt-4"></div>
                <div className="h-5 bg-gray-200 rounded-full w-full mt-4"></div>
                <div className="h-5 bg-gray-200 rounded-full w-10/12 mt-4"></div>
            </div>
            <div className="col-span-5 mx-10">
                Author
                <div className="flex gap-5 mt-5">
                    <div className="flex justify-center flex-col">
                        <div className="h-6 bg-gray-200 rounded-full w-6 mt-4"></div>
                    </div>
                    <div className="flex flex-col justify-center w-9/12">
                        <div className="h-6 bg-gray-200 rounded-full w-36 mt-4"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-full mt-4"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-11/12 mt-4"></div>                    </div>
                </div>
            </div>
        </div>
    </div>
}