import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const PillComponent = ({
  text,
  hasCheck = false,
}: {
  text: string;
  hasCheck: boolean;
}) => {
  return (
    <div className={`text-secondary py-1.5 m-1 rounded-full text-center cursor-pointer capitalize font-light`}>
      <div className="flex flex-row items-center gap-1.5">
       {<Icon icon="fa6-solid:location-dot" fontSize={20} />}
        <span>{text}</span>
      </div>
    </div>
  );
};

export default PillComponent;
