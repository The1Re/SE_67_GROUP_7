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
        <motion.div 
            className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(null)}
        >
            <motion.div
                className="bg-white p-6 rounded-lg shadow-lg w-[600px]"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-3xl font-bold text-center mb-4" style={{ color: "#44AFB6" }}>
                    {titles[type]}
                </h2>

                {type === "signup" && <SignUpForm />}
                {type === "login" && <SignInForm setIsModalOpen={setIsModalOpen} />}
                {type === "forgot" && <ForgotPasswordForm />}

                <div className="text-center mt-2 text-gray-500">
                    {type === "login" ? (
                        <>Don't have an account? <span className="text-teal-500 cursor-pointer" onClick={() => setIsModalOpen("signup")}>Sign up</span></>
                    ) : type === "signup" ? (
                        <>Already have an account? <span className="text-teal-500 cursor-pointer" onClick={() => setIsModalOpen("login")}>Sign in</span></>
                    ) : null}
                </div>

            </motion.div>
        </motion.div>
    );
};

export default AuthModal