"use client";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const [user, setUser] = useState(null);
    useEffect(() => {
      const userStr: any = localStorage.getItem("userDetails");
      if (userStr) {
        setUser(JSON.parse(userStr));
      } else {
        return redirect("/auth");
      }
    }, []);

    if (!user) {
      return null;
    }

    return <Component user={user} {...props} />;
  };
}
