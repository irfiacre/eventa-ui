"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Footer = () => {
  const socialMedia = [
    { icon: "jam:linkedin", url: "https://www.linkedin.com/in/irfiacre/" },
    { icon: "mdi:github", url: "https://github.com/irfiacre" },
    { icon: "mdi:instagram", url: "https://www.instagram.com/irfiacre/" },
    { icon: "ant-design:x-outlined", url: "https://x.com/irfiacre" },
  ];
  const [email, setEmail] = useState("");

  return (
    <footer className="px-36 py-10 bg-primary flex flex-row items-center justify-between max-md:px-5 max-md:flex-wrap max-md:space-y-10">
      <div className="space-y-10">
        <div className="flex items-center">
          <span className="text-white text-4xl font-semibold">eVENTA</span>
        </div>
        <div>
          <p className="text-white text-sm">
            Copyright © {new Date().getFullYear()} Iradukunda Allelua Fiacre. All rights reserved
          </p>
        </div>
        <div className="flex flex-row items-center justify-start gap-5">
          {socialMedia.map((elt) => (
            <div key={elt.url} className="p-2 bg-white/10 rounded-full z-50">
              <a href={elt.url} target="_blank" className="z-1">
                <Icon
                  icon={elt.icon}
                  fontSize={18}
                  className="text-white opacity-100"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/4 flex flex-row items-start justify-between gap-5 max-md:flex-wrap max-md:space-y-10 max-md:pl-2">
        <div className="space-y-4 max-md:w-full">
          <p className="text-white text-xl font-semibold">Support</p>
          <p>
            <a
              href="/dashboard"
              className="text-white text-sm font-extralight hover:underline"
            >
              Login
            </a>
          </p>
          <p>
            <a
              href="https://www.acgroup.rw/?page_id=3"
              target="_blank"
              className="text-white text-sm  font-extralight hover:underline"
            >
              Terms of service
            </a>
          </p>
          <p>
            <a
              href="https://www.acgroup.rw/?page_id=3"
              target="_blank"
              className="text-white text-sm font-extralight hover:underline"
            >
              Privacy policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
