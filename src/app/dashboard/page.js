"use client";
import React, { useState, useEffect } from "react";
import { firestore } from "../../../firebase";
import { useRouter } from "next/navigation";
import SidebarDemo from "@/components/navbar/navbar";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import Link from "next/link";
import StartIcon from "@mui/icons-material/Start";

export default function DashboardPage() {
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    // Fetch inventory items from API or database
    const cookies = Cookies.get("user");

    if (!cookies) {
      redirect("/login");
    }

    const fetchInventoryItems = async () => {
      try {
        const response = await firestore.collection("inventory").get();
        const data = response.docs.map((doc) => doc.data());
        setInventoryItems(data);
      } catch (error) {
        console.error("Error fetching inventory items:", error);
      }
    };

    fetchInventoryItems();
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-white dark:bg-neutral-800  mx-auto  dark:border-neutral-700  h-screen">
      <SidebarDemo />
      <div className="flex flex-col w-full ">
        <div className="flex justify-between items-center p-4  flex-wrap gap-y-3 gap-x-3 2xl:justify-evenly shadow-lg shadow-slate-300 rounded-b-2xl">
          <div className="flex flex-col items-start p-4 rounded-md shadow-md shadow-blue-600  w-full sm:w-[48%] border-2 border-blue-300  2xl:w-[700px]">
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
              Inventory
            </h1>
            <p className="text-base text-neutral-500 dark:text-neutra500">
              Manage your inventory items
            </p>
            <Link href="/inventory" className="hover:scale-[102%]">
              <p className="flex items-center justify-center bg-blue-600 text-white rounded-md p-2 w-full mt-4">
                <StartIcon />
                <span className="ml-2">View Inventory</span>
              </p>
            </Link>
          </div>
          <div className="flex flex-col items-start p-4 rounded-md shadow-md shadow-blue-600 bg-blue-500 w-full sm:w-[48%]  2xl:w-[700px] ">
            <h1 className="text-2xl font-semibold text-white dark:text-neutral-100">
              Analytics
            </h1>
            <p className="text-base text-white dark:text-neutra500">
              View your sales and inventory analytics
            </p>
            <Link href="/analytics" className="hover:scale-[102%]">
              <p className="flex items-center justify-center bg-white text-blue-600 rounded-md p-2 w-full mt-4">
                <StartIcon />
                <span className="ml-2">View Analytics</span>
              </p>
            </Link>
          </div>
        </div>
        <div className="w-full mt-4 rounded-t-2xl shadow-inner shadow-neutral-300  flex flex-col items-center justify-center h-full overflow-y-scroll p-2">
          <h1 className=" ">Inventory</h1>
        </div>
      </div>
    </div>
  );
}
