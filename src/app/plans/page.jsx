import React from "react";

function page() {
  return (
    <>
      <div className="plans px-[40px] py-10 flex flex-col gap-5">
        <p className=" font-extrabold text-4xl">Plans</p>
        <div className="plan bg-red-950 min-h-[250px] rounded-xl">1</div>
        <div className="plan bg-red-950 min-h-[250px] rounded-xl">1</div>
        <div className="plan bg-red-950 min-h-[250px] rounded-xl">1</div>
        <div className="plan bg-red-950 min-h-[250px] rounded-xl">1</div>
        <div className="plan bg-red-950 min-h-[250px] rounded-xl">1</div>
      </div>
    </>
  );
}

export default page;
