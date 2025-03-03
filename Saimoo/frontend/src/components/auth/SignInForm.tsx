import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import api from "@/api";

export type SignInData = {
    username: string
    password: string
}

function SignInForm({ setIsModalOpen }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<SignInData>();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await api.post("/auth/login", formData);

            if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                navigate("/");
            } else {
                console.log(res);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input 
                label="Username" 
                placeholder="Enter your username or email" 
                onChange={handleChange} />
            <Input 
                label="Password" 
                placeholder="Enter your password" 
                type="password" 
                onChange={handleChange} />
            <p className="text-right text-sm text-gray-500 cursor-pointer hover:text-gray-700" onClick={() => setIsModalOpen("forgot")}>
                Forgot password?
            </p>
            <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 mt-2">Sign In</button>
        </form>
    );
};

export default SignInForm;