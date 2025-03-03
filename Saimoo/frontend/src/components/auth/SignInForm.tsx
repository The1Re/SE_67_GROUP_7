import { useState } from "react";
import Input from "./Input";

export type SignInData = {
    username: string
    password: string
}

function SignInForm({ setIsModalOpen }) {
    const [formData, setFormData] = useState<SignInData>();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login Data:", formData);
        // Prepare to send data to API
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