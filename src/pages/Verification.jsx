import React from "react";
import AuthWrapper from "../components/layout/AuthWrapper";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Verification = () => {
  const email = localStorage.getItem("email");
  const maskEmail = (email) => {
    const [username, domain] = email.split("@");
    const maskedUsername = username.slice(0, 2) + "*".repeat(username.length - 2);
    return `${maskedUsername}@${domain}`;
  }
  return (
    <AuthWrapper>
      <div className="bg-white py-[29px] px-[26px] rounded-lg shadow-lg w-full max-w-[453px] ">
        <Link to="/register">
          <button className="flex items-center gap-1.5"> <FaArrowLeft />  Back</button>
        </Link>
        <div className="max-w-[322px] mt-4">
          <h1 className="text-2xl lg:text-4xl font-bold">
            Verification required to proceed
          </h1>
          <p className="text-[#666] text-[16px] font-normal">
            A verification token has been sent to your{" "}
            <span className="font-semibold ml-1">{maskEmail(email)}</span>
          </p>
        </div>
        <button className="btn w-full font-semibold mt-4 ">Go to mail</button>
      </div>
    </AuthWrapper>
  );
};

export default Verification;
