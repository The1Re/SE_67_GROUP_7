import React from "react";
import SignupForm from "../../components/Signupguide/SignupForm";

const SignupGuide: React.FC = () => {
  return (
    <div className=" flex justify-center items-center ">
      {/* ✅ พื้นหลังอยู่ตรงกลาง */}
      <div className="w-full max-w-lg bg-white border border-gray-300 rounded-xl shadow-2xl p-10">
        <h3 className="text-2xl font-semibold mb-6 text-black border-b-2 border-gray-400 pb-3 text-left">
          ยื่นเรื่องขอเป็นตัวแทนไกด์
        </h3>

        {/* ✅ ฟอร์มชิดซ้าย */}
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupGuide;
