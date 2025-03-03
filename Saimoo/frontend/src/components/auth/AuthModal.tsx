import { motion } from "framer-motion";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgotForm";

export type AuthType = "login" | "signup" | "forgot";

export type AuthModalProps = {
    type: AuthType;
    setIsModalOpen: (type: null | AuthType) => void;
}

function AuthModal({ type, setIsModalOpen }) {
    const titles = {
        login: "Sign In",
        signup: "Sign Up",
        forgot: "Forgot Password"
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
            <motion.div
                className="bg-white p-6 rounded-lg shadow-lg w-[600px]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                drag
                dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            >
                <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "#44AFB6" }}>
                    {titles[type]}
                </h2>

                {type === "signup" && <SignUpForm />}
                {type === "login" && <SignInForm setIsModalOpen={setIsModalOpen} />}
                {type === "forgot" && <ForgotPasswordForm />}

                <p className="text-center mt-2 text-gray-500">
                    {type === "login" ? (
                        <>Don't have an account? <span className="text-teal-500 cursor-pointer" onClick={() => setIsModalOpen("signup")}>Sign up</span></>
                    ) : type === "signup" ? (
                        <>Already have an account? <span className="text-teal-500 cursor-pointer" onClick={() => setIsModalOpen("login")}>Sign in</span></>
                    ) : null}
                </p>

                <button
                    className="w-full bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 mt-4"
                    onClick={() => setIsModalOpen(type === "forgot" || type === "signup" ? "login" : null)}
                >
                    Close
                </button>
            </motion.div>
        </div>
    );
};

export default AuthModal