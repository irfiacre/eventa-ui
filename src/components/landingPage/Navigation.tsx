"use client";
import React, { useState } from "react";
import LogoIcon from "../logo/LogoIcon";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import UserViewComponent from "@/src/views/navigation/topNavbar/UserViewComponent";
import ConfirmModel from "../models/ConfirmModel";
import { make_user_a_host } from "@/services/backend";
import { toast } from "react-toastify";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

const NavigationSection = ({ user }: { user: any }) => {
  const router = useRouter();
  const [isActive, handleDropdown] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleBtnClicked = () => {
    setOpen(true);
  };

  const handleLoginWithGoogle = () => signIn("google");

  const handleLogout = async () => {
    await signOut({ callbackUrl: process.env.APP_BASE_URL });
  };

  const handleUpdateRole = async () => {
    setLoading(true);
    const result = await make_user_a_host(user.email);
    setOpen(false);

    if (result.role) {
      router.push("/dashboard");
    }
    setLoading(false);
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
          {user?.role === "host" ? (
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
                  Become a Host
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
              onClick={() => handleLoginWithGoogle()}
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
