import { useState } from "react";
import Input from "./Input";

function ForgotForm() {
    const [email, setEmail] = useState<string>("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Forgot Password Email:", email);
        // Prepare to send data to API
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input 
                label="Email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <p className="text-sm text-gray-500">We will send you a reset link.</p>
            <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 mt-2">Reset Password</button>
        </form>
    );
};

export default ForgotForm;