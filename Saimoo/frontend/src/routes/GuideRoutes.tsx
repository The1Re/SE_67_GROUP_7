import { Routes, Route } from "react-router-dom";


import SignupForm from "@/components/Signupguide/SignupForm";

const TempleRoutes = () => {
  return (
    <Routes>
      
      <Route path="signup" element={<SignupForm/>} />
      
    </Routes>
  );
};

export default TempleRoutes;

