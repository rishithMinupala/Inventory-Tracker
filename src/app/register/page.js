"use client";

import React, { useState } from "react";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { firestore } from "../../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookie";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const db = firestore;
  const router = useRouter();

  const registerUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        const uid = user.uid;
      })
      .catch((error) => {
        const errorCode = error.code.replace("auth/", "");
        if (errorCode === "email-already-in-use") {
          console.log("Email already in use");
          setUser(true);
        }
        setError(errorCode.replaceAll("-", " "));
      });

    setUsername("");
    setEmail("");
    setPassword("");
  };
  const userId = Cookies.get("user");

  if (user) {
    redirect("/login");
    return;
  }

  if (userId) {
    router.replace("/dashboard");
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh]">
      <nav className="fixed top-0 left-0 right-0 bg-blue-500 p-4 pl-5 pr-5 flex justify-between items-center ">
        <h1 className="text-white text-2xl font-bold">
          <Link href="/">WareTrack</Link>
        </h1>
        <Link
          href="/login"
          className="text-white font-semibold text-lg max-sm:hidden flex items-center"
        >
          <button className="bg-blue-500 text-white p-2 pl-5 pr-5 rounded-lg text-base hover:scale-[103%] hover:bg-blue-700 border  border-white ">
            Login
          </button>
        </Link>
        <Link
          href="/login"
          className="text-white font-semibold text-[26px] sm:hidden flex items-center"
        >
          <button className="bg-blue-500 text-white p-2 pl-5 pr-5 rounded-lg text-base hover:scale-[103%] hover:bg-blue-700 ">
            <LoginIcon />
          </button>
        </Link>
      </nav>
      <div className="flex flex-row max-lg:flex-col items-center justify-center 2xl:items-start gap-x-5 p-5 pl-6 pr-6 box-content mt-[70px] gap-y-4 flex-grow flex-shrink-0 w-[100%] max-w-[1230px] lg:justify-evenly">
        <img
          src={"/register.jpg"}
          alt="Warehouse"
          className="w-[100%] max-w-[560px] max-h-[370px] lg:max-w-[425px] xl:max-w-[650px] xl:max-h-[600px]"
        />
        <div className="flex flex-col  p-5 bg-white rounded-lg shadow-lg w-[300px] gap-y-2">
          <h1 className="text-2xl font-bold text-center mt-4">Sign up</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-blue-400 rounded-md p-2 mt-4"
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-blue-400 rounded-md p-2 mt-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-blue-400 rounded-md p-2 mt-4"
          />
          <button
            className="bg-blue-500 text-white rounded-md p-2 mt-4 mb-4 hover:scale-[103%] hover:bg-blue-700 shadow-md shadow-slate-400
          "
            onClick={registerUser}
          >
            Register
          </button>
          {error && (
            <p className="text-red-500 text-center text-lg">*{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
