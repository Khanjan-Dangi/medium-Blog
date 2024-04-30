import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signupInput } from "@kd21/medium-common"
import axios from "axios"
import toast from 'react-hot-toast';
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: {type: "signin" | "signup"}) => {
    const navigate = useNavigate();

    const [inputData,setInputData] = useState<signupInput>({
        email: "",
        password: "",
        name: ""
    })

    async function sendRequest(){
        toast.dismiss();
        try {
            const response = axios.post(`${BACKEND_URL}/api/v1/user/${type}`,inputData);

            const result = await toast.promise(response,{
                loading: "Please Wait...",
                success: "Success!!",
                error: `Error while ${type == "signin"? "Signing In":"Signing Up"}!!`
            })

            const token = result.data.jwt;

            console.log(token);

            localStorage.setItem("mediumToken",token);

            navigate("/blogs");
        } catch (e: any) {
            toast.error(e.response.data.error);
        }
    }

    return <div className='h-screen flex items-center justify-center '>
        <div className="w-full max-w-sm">
            <div className="text-3xl font-bold text-center">{type == "signup" ? "Create an account" : "Sign In into your account"}</div>
            <div className="text-md fond-medium text-center mt-2 text-slate-400">{type == "signup" ? "Already have an account?" : "Don't have an account?"} 
                {type == 'signin'?<Link to="/signup" className="underline px-1">Create Account</Link>:<Link to="/signin" className="underline px-1">Login</Link>}
            </div>

            {type == 'signup' && <LabelledInput name="Username" placeholder="Khanjan" onChange = {(e: ChangeEvent<HTMLInputElement>) => {
                setInputData({
                    ...inputData,
                    name: e.target.value
                })
            }} /> }

            <LabelledInput name="Email" placeholder="example@email.com" onChange = {(e: ChangeEvent<HTMLInputElement>) => {
                setInputData({
                    ...inputData,
                    email: e.target.value
                })
            }} />

            <LabelledInput name="Password" type="password" placeholder="" onChange = {(e: ChangeEvent<HTMLInputElement>) => {
                setInputData({
                    ...inputData,
                    password: e.target.value
                })
            }} />

            <button type="button" onClick={sendRequest} className="w-full mt-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                {type === 'signin'?"Signin":"Signup"}
            </button>
        </div>
    </div>
}

type labeledInputType = {
    name: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

function LabelledInput({name,placeholder,onChange,type}: labeledInputType){
    return <div className="w-full">
        <label  className="block mt-4 text-lg font-medium text-gray-900">{name}</label>
        <input onChange = {onChange} type={type || "text"}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" placeholder={placeholder} required />
    </div>
}