import React from "react";
import { redirect, useParams } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import group from "../assets/group.png";
import { BounceLoader } from "react-spinners";
import { MdCancel } from "react-icons/md";

const VerifyEmail = () => {
  const { token } = useParams();
  const redirect = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [status, setStatus] = useState("verifying");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const handleResendEmail = async () => {
    try {
      const response = await axiosInstance.post("/auth/resend-email", {
        email,
      });
      if (response.status === 200) {
        setFeedback("Email sent")
      }
    } catch (error) {
      console.log(error);
    }
  };
  const checkToken = async () => {
    try {
      const response = await axiosInstance.post(`/auth/verify-email/${token}`, {
        token,
      });
      if (response.status === 200) {
        setStatus("success");
      }
    } catch (error) {
      setErrorMsg("Email Verification Failed");
      setStatus("error");
      //resend email
      setEmail(error?.response?.data?.email);
    }
  };
  useEffect(() => {
    // checkToken();
  }, []);
  if (status === "verifying") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-[505px] py-[29px] px-[26px] shadow-lg text-center">
          <BounceLoader className="mx-auto my-2" />
          <h1 className="text-xl lg:text-[30px] font-semibold">
            Email Verifying.....
          </h1>
          <p className="text-[#666] text-lg">Please Wait</p>
        </div>
      </div>
    );
  }
  if (status === "success") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-[505px] py-[29px] px-[26px] shadow-md text-center">
          <img src={group} alt="verify" className="block mx-auto" />
          <h1 className="text-xl lg:text-[30px] font-semibold">
            Email Verification Successful
          </h1>
          <p className="text-[#666] mb-4">
            Your account has been verified successfully
          </p>
          <Link to={"/login"}>
            <button className="w-full font-semibold rounded-xl bg-[#0c0c0c] text-white h-[56px]">
              Proceed to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-[505px] py-[29px] px-[26px] shadow-md text-center">
        <MdCancel size={80} className="text-red-500 mx-auto" />
        <p className="bg-green-100 text-green-700 pt-1.5 px-3 rounded-lg">{feedback}</p>
        <h1 className="text-xl lg:text-[30px] font-semibold">
          Email Verification Failed
        </h1>
        <p className="text-[#666] mb-4">{errorMsg}</p>
        <Link to={""}>
          <button onClick={handleResendEmail} className="w-full font-semibold rounded-xl bg-[#0c0c0c] text-white h-[56px]">
            Resend Verification Email
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;
