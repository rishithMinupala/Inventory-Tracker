"use client";
import React, { use, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import StoreIcon from "@mui/icons-material/Store";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const Logo = () => {
  return (
    <Link
      href="#"
      className="font-medium flex space-x-2   items-center text-[22px] text-black py-1 relative z-20"
    >
      <div className="h-8 w-8 flex-shrink-0">
        <img src="/WT.png" alt="logo" className="h-8 w-7" />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold text-white dark:text-white whitespace-pre pt-2"
      >
        WareTrack
      </motion.span>
    </Link>
  );
};
const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

export default function SidebarDemo() {
  const router = useRouter();
  const userLogout = () => {
    Cookies.remove("user");
    router.replace("/login");
  };

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-white dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
      ),
    },

    {
      label: "Inventory",
      href: "/inventory",
      icon: (
        <StoreIcon className="text-white dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
      ),
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: (
        <ShowChartIcon className="text-white dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <IconSettings className="text-white dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
      ),
    }
    /*{
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-white dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
      ),
    },*/
  ];
  const [open, setOpen] = useState(false);
  const animate = true;
  return (
    <Sidebar open={open} setOpen={setOpen} animate={true}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col  overflow-y-auto overflow-x-hidden">
          <>
            <Logo />
          </>
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>

          <div
            className={cn(
              "flex items-center justify-start gap-2  group/sidebar py-2 cursor-pointer"
            )}
            onClick={userLogout}
          >
            <IconArrowLeft className="text-white dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
            <motion.span
              animate={{
                display: animate
                  ? open
                    ? "inline-block"
                    : "none"
                  : "inline-block",
                opacity: animate ? (open ? 1 : 0) : 1,
              }}
              className="text-white dark:text-neutral-200 text-base group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
            >
              {"Logout"}
            </motion.span>
          </div>
        </div>
        <div>
          <SidebarLink
            link={{
              label: "Profile",
              href: "/profile",
              icon: (
                <IconUserBolt className="text-white dark:text-neutral-200 h-7 w-7 flex-shrink-0" />
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
