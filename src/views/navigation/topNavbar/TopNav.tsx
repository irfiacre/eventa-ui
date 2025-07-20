"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import UserViewComponent from "./UserViewComponent";
import isAuth from "@/src/components/isAuth";

const TopNav = ({ user, title }: { user: any; title: string }) => {
  const router = useRouter()
  const params: any = useParams();
  const [isActive, handleDropdown] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("Overview");

  const handleLogout = async () => {
    localStorage.removeItem("userDetails");
    router.push("/");
  };

  useEffect(() => {
    const currentUrl = window.location.href.split("/");
    setCurrentTitle(
      params.id
        ? `Property (${params.id?.substring(0, 50)})`
        : currentUrl[currentUrl.length - 1]
        ? currentUrl[currentUrl.length - 1]
        : "overview"
    );
  }, [params]);

  return (
    <div className="flex flex-row justify-between">
      <h1 className="text-primary text-2xl capitalize">{currentTitle}</h1>
      <div className="mr-6 flex flex-row gap-3 items-center text-notificationIconColor">
        <div className="">
          {user?.firstName}
        </div>
        <div>|</div>
        <UserViewComponent
          user={user}
          isActive={isActive}
          handleDropdown={handleDropdown}
          handleLogout={handleLogout}
        />
      </div>
    </div>
  );
};

export default isAuth(TopNav);
