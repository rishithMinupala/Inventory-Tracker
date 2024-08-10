"use client";
import React, { useState } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import RunCircleIcon from "@mui/icons-material/RunCircle";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export default function Home() {
  const userId = Cookies.get("user");
  if (userId) {
    redirect("/dashboard");
  }
  return (
    <div className="flex flex-col bg-white flex-grow min-h-[100vh] flex-shrink-0">
      <div className="max-md:justify-center flex items-center flex-row justify-between gap-y-6 w-[100%]  p-3 pl-6 pr-6 shadow-md shadow-slate-300 z-0 top-0 fixed bg-white ">
        <h1 className="text-[30px] text-center font-bold text-[#114DEB] ">
          <Link href="/">WareTrack</Link>
        </h1>
        <div className="max-md:hidden flex items-center gap-x-5">
          <Link href="/login">
            <button className="bg-blue-500 text-white p-2 pl-5 pr-5 rounded-md text-base hover:scale-[105%] shadow-md shadow-slate-400 hover:bg-blue-700">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center  2xl:items-start justify-around gap-x-5 p-5 pl-6 pr-6 box-content mt-[70px] gap-y-4 flex-grow flex-shrink-0 ">
        <div className=" flex flex-col gap-y-7 items-start justify-center pt-6 h-[100%] max-lg:items-center ">
          <p className="text-lg  text-black font-normal max-w-[1024px] leading-8 font-[[Inter]] ">
            <span className="text-[#114deb] font-semibold text-[26px]">
              Welcome to WareTrack{" "}
            </span>{" "}
            - your ultimate solution for efficient and organized warehouse
            management. WareTrack is designed to streamline the tracking of
            inventory, ensuring you always know the status and location of every
            item in your warehouse. With real-time inventory tracking, you can
            monitor stock levels instantly, knowing exactly what items are in
            stock, running low, or need reordering. Our intuitive dashboard
            provides a user-friendly overview of your warehouse operations,
            making it easy to manage and optimize your storage. Say goodbye to
            manual tracking and embrace the future of warehouse management with
            WareTrack.
          </p>
          <Link href="/login">
            <button className="bg-blue-500 text-white p-2 pl-5 pr-5 rounded-md text-base hover:scale-[105%] shadow-md shadow-slate-400  hover:bg-blue-700">
              Get Started
            </button>
          </Link>
        </div>
        <img
          src="/home.jpg"
          alt="Warehouse"
          className="w-[100%] max-w-[560px] max-h-[370px] lg:max-w-[425px] xl:max-w-[650px] xl:max-h-[600px]"
        />
      </div>
    </div>
  );
}
