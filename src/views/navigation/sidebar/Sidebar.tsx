"use client";
import SearchableInput from "@/src/components/inputs/SearchInput";
import React, { useState } from "react";
import { MenuItem } from "./MenuSection";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export const Sidebar = () => {
  const sidebarMenu = {
    dashboard: [
      {
        title: "Dashboard",
        subtitle: "Latest Analytics",
        url: "dashboard",
        icon: "material-symbols:dashboard",
      },
    ],
  };

  return (
    <div className="px-6 py-9 border border-r-sidebarBorderColor h-lvh flex flex-col gap-6">
      <div>
        <div className="flex justify-center align-middle items-center gap-2">
          <Link
            href="/"
            className="text-primary text-2xl hover:text-primary/75"
          >
            eVENTA
          </Link>
        </div>
      </div>
      <div>
        <MenuItem content={sidebarMenu.dashboard[0]} />
      </div>
    </div>
  );
};
