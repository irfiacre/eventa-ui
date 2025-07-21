"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserViewComponent from "@/src/views/navigation/topNavbar/UserViewComponent";
import ListModel from "../models/ListModel";
import Link from "next/link";

const NavigationSection = () => {
  const router = useRouter();
  const [isActive, handleDropdown] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  const handleBtnClicked = () => {
    setOpen(true);
  };
  useEffect(() => {
    const userStr: any = localStorage.getItem("userDetails");
    const userObj = JSON.parse(userStr);
    if (userStr) setUser(userObj);
    if (userObj?.role === "admin") {
      router.push("/dashboard");
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("userDetails");
    router.push("/auth");
  };

  const handleLogin = async () => {
    router.push("/auth");
  };

  return (
    <section className="px-10 py-2.5 space-y-5 max-md:px-5 bg-cover bg-no-repeat bg-center">
      {open && (
        <ListModel
          title="My Booking"
          handleClose={() => setOpen(false)}
        />
      )}

      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-primary text-2xl hover:text-primary/75"
          >
            eVENTA
          </Link>
        </div>
        <div className="flex flex-row items-center justify-end">
          {user?.role === "admin" ? (
            <Link
              href="/dashboard"
              className="text-primary hover:text-primary focus:outline-none font-medium rounded-lg text-md text-center py-2.5 px-5"
            >
              Dashboard
            </Link>
          ) : (
            <div>
              {user && (
                <button
                  type="button"
                  onClick={() => handleBtnClicked()}
                  className="text-primary hover:text-primary focus:outline-none font-medium rounded-lg text-md text-center py-2.5 px-5"
                >
                  My bookings
                </button>
              )}
            </div>
          )}

          {user ? (
            <UserViewComponent
              user={user}
              isActive={isActive}
              handleDropdown={handleDropdown}
              handleLogout={handleLogout}
            />
          ) : (
            <button
              type="button"
              onClick={() => handleLogin()}
              className="text-primary hover:text-primary/50 focus:outline-none font-medium rounded-lg text-md text-center py-2.5 px-5"
            >
              Login
            </button>
          )}

          <div className="mr-6 flex flex-row gap-3 items-center text-primary text-pretty"></div>
        </div>
      </div>
    </section>
  );
};

export default NavigationSection;
