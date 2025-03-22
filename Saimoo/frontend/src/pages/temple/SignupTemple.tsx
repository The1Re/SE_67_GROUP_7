import React from "react";
import SignupForm from "../../components/signuptemple/SignupForm";

const SignupTemple: React.FC = () => {
  return (
    <div className="h-full bg-gray-100 flex justify-center items-center p-10">
      <div className="w-[800px] bg-white border border-gray-300 rounded-lg shadow-xl p-8"> 
        {/* ✅ เพิ่มขนาดกรอบ และทำให้ดูโดดเด่นขึ้น */}
        
        <h3 className="text-xl font-semibold mb-6 text-black border-b-2 border-gray-400 pb-3">
          ยื่นเรื่องขอเป็นตัวแทนวัด
        </h3>

        <SignupForm /> {/* ✅ ใช้ Form Component */}
      </div>
    </div>
  );
};

export default SignupTemple;