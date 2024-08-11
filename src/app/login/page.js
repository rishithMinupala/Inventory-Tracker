"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { redirect, useRouter } from "next/navigation";
import { firestore } from "../../../firebase";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState("");

  const auth = getAuth();
  const router = useRouter();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User logged in: ", user.uid);
        Cookies.set("user", user.uid);
        router.push("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code.replace("auth/", "");

        setError(errorCode.replaceAll("-", " "));
      });
    if (email == "") {
      setMailError(true);
    }
    if (password == "") {
      setPasswordError(true);
    }
    setEmail("");
    setPassword("");
    setShowPassword(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (value == "") {
      setPasswordError(true);
      console.log("Password cannot be empty");
    } else {
      console.log("Password is set to: ", value);
      setPasswordError(false);
      setPassword(value);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (value == "") {
      setMailError(true);
    } else {
      setMailError(false);
      setEmail(value);
    }
  };

  useEffect(() => {
    const userId = Cookies.get("user");
    if (userId) {
      redirect("/dashboard");
    }
  });

  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh] bg-white pt-4 pb-4 ">
      <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-around  w-[100%] max-w-[1230px] ">
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md shadow-zinc-400 flex flex-col gap-y-4 w-[267px] box-content max-lg:order-1">
          <h1 className="text-[30px] text-center font-bold text-[#114DEB]">
            WareTrack
          </h1>
          <div className="flex flex-col  justify-start items-start ">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onBlur={handleEmailChange}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-64 p-2 border border-blue-500 rounded-md ${
                mailError ? "border-red-500" : ""
              }`}
            />
            {mailError && (
              <p className="text-red-500 p-0">*email cannot be empty</p>
            )}
          </div>
          <div className="flex flex-col  justify-start items-start ">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onBlur={handlePasswordChange}
              onChange={handlePasswordChange}
              className={`w-64 p-2 border border-blue-500 rounded-md ${
                passwordError ? "border-red-500" : ""
              } `}
            />
            {passwordError && (
              <p className="text-red-500 p-0">*password cannot be empty</p>
            )}
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={toggleShowPassword}
              className="mr-2"
            />
            <label>Show Password</label>
          </div>
          <button
            onClick={handleLogin}
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md hover:scale-[105%] shadow-md shadow-slate-400"
          >
            Login
          </button>
          <p className="text-sm text-center">
            Don't have an Account?{" "}
            <button className="text-blue-500">
              <Link href="/register">Register</Link>
            </button>
          </p>
          {error && (
            <p className="text-red-500 text-center text-lg">*{error}</p>
          )}
        </div>
        <div className="justify-center items-center flex  p-2">
          <img
            src=" /warehouse.jpg"
            alt="Login Image"
            className="max-md:w-[200px] max-md:h-[200px] w-[460px] h-[400px] ml-4"
          />
        </div>
      </div>
    </div>
  );
}
