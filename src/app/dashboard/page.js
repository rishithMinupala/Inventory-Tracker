"use client";
import React, { useState, useEffect } from "react";
import { firestore } from "../../../firebase";
import { useRouter } from "next/navigation";
import SidebarDemo from "@/components/navbar/navbar";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

export default function DashboardPage() {
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    // Fetch inventory items from API or database
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
    <div className="flex flex-col md:flex-row bg-white dark:bg-neutral-800 w-full   mx-auto  dark:border-neutral-700 overflow-hidden h-screen">
      <SidebarDemo />
    </div>
  );
}
