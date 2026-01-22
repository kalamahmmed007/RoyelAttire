import React from "react";
import Logo from "../assets/logo.png"; // ekhane tor logo path set kor

const Loader = () => {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="animate-spin-slow">
        <img
          src={Logo}
          alt="Company Logo"
          className="h-16 w-16 object-contain"
        />
      </div>
    </div>
  );
};

export default Loader;
