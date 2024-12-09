import React from "react";

const DivideLine = ({ text, Icon }) => {
  return (
    <div className="w-full h-[5px] my-4 relative">
      {text && (
        <div className="w-28 h-5 absolute bg-[#f5f5f5] top-[-10px] right-5 flex items-center gap-2">
          {Icon && <Icon size={19} className="text-orange" />}
          <h3 className="text-orange font-bold text-lg">{text}</h3>
        </div>
      )}
      <div
        style={{
          background: "url(./line-bg.png)",
        }}
        className={`h-full w-full`}
      />
    </div>
  );
};

export default DivideLine;
