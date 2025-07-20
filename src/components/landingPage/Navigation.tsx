"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserViewComponent from "@/src/views/navigation/topNavbar/UserViewComponent";
import ConfirmModel from "../models/ConfirmModel";
// import { make_user_a_host } from "@/services/backend";
import Link from "next/link";

const NavigationSection = () => {
  const router = useRouter();
  const [isActive, handleDropdown] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState(null);

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

  const handleUpdateRole = () => {};

  const handleLogout = async () => {
    localStorage.removeItem("userDetails");
    router.push("/");
  };

  const handleLogin = async () => {
    router.push("/auth");
  };

  return (
    <section className="px-10 py-2.5 space-y-5 max-md:px-5 bg-cover bg-no-repeat bg-center">
      {open && (
        <ConfirmModel
          title="Want to become a host"
          subtitle="Allows you to Rent your properties"
          loading={loading}
          handleConfirmed={handleUpdateRole}
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
              href={`/dashboard`}
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
                  {user?.firstName} {user?.lastName}
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
