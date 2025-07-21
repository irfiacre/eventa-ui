import React from "react";

const TopSection = () => {
  return (
    <section
      className="mx-10 rounded-3xl bg-cover bg-no-repeat bg-center max-md:mx-3"
      style={{ height: "45vh" }}
    >
      <div
        className="rounded-2xl bg-taxiMeter bg-cover bg-no-repeat bg-center brightness-50"
        style={{ height: "45vh" }}
      ></div>
      <div>
        <div className="ml-5 px-5 py-2 -mt-44 z-40 absolute text-center max-md:ml-5 max-md:px-5 max-md:-mt-28">
          <span className="text-white text-5xl font-semibold max-md:text-lg">
            Find the right vibe for you!
          </span>
        </div>
      </div>
    </section>
  );
};

export default TopSection;
