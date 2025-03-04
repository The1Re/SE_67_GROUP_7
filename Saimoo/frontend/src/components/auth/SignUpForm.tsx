import { useState } from "react";
import Input from "./Input";

export type SignUpData = {
	username: string;
	email: string;
	password: string;
	firstname?: string;
	surname?: string;
	phone?: string;
}

function SignupForm() {
	const [formData, setFormData] = useState<SignUpData>({
		username: "",
		email: "",
		password: "",
		firstname: "",
		surname: "",
		phone: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Signup Data:", formData);
		// Prepare to send data to API
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="grid grid-cols-2 gap-6 relative">
				<div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-300 transform -translate-x-1/2"></div>
				<Input
					label="Email"
					placeholder="Enter your email"
					value={formData.email}
					name="email"
					onChange={handleChange} />
				<Input
					label="Firstname"
					placeholder="Enter your firstname"
					value={formData.firstname}
					name="firstname"
					onChange={handleChange} />
				<Input
					label="Username"
					placeholder="Enter your username"
					value={formData.username}
					name="username"
					onChange={handleChange} />
				<Input
					label="Surname"
					placeholder="Enter your surname"
					value={formData.surname}
					name="surname"
					onChange={handleChange} />
				<Input
					label="Password"
					placeholder="Enter your password"
					type="password"
					value={formData.password}
					name="password"
					onChange={handleChange} />
				<Input
					label="Phone"
					placeholder="Enter your phone number"
					value={formData.phone}
					name="phone"
					onChange={handleChange} />
			</div>
			<button
				type="submit"
				className="mt-2 w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 col-span-2"
			>
				Sign Up
			</button>
		</form>
	);
};

export default SignupForm;