import React from "react";

const BaseButton = ({
  handleSubmit,
  loading,
  text
}: {
  handleSubmit: (e: any) => void;
  text: string;
  loading?: boolean;
}) => {
  return (
    <div className="p-3.5">
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full text-white bg-primary hover:bg-primaryDark focus:outline-none font-medium rounded-md text-md text-center px-5 py-2 disabled:bg-borderColorLight"
        disabled={loading}
      >
        {loading ? "..." : text}
      </button>
    </div>
  );
};

export default BaseButton;
