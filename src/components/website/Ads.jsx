import React from "react";

function Ads() {
  return (
    <>
      <div className="ads w-full h-[400px] ">
        <div className="content-of-ads flex items-center justify-center h-full flex-col">
          <p className="z-[100] text-4xl font-extrabold text-white">
            DON’T <span className=" text-website2">THINK</span>, BEGIN{" "}
            <span className=" text-website2">TODAY</span>!
          </p>
          <p className=" text-white z-[100] w-[50%] text-center mt-4 ">
            Ut consectetur, metus sit amet aliquet placerat, enim est ultricies
            ligula, sit amet dapibus odio augue eget libero. Morbi tempus mauris
            a nisi luctus imperdiet.
          </p>
        </div>
      </div>
    </>
  );
}

export default Ads;
