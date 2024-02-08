'use client'

import React, { useEffect, useState } from "react";

import { getHomeGeneralInfo } from "../../app/api/v1/dashboard";

function Ads() {
  const [ genInfo, setGenInfo ] = useState(null);

  useEffect(() => {
    getHomeGeneralInfo().then(g => {
      if (g === 'error' || g === 'unauthorized');
      else setGenInfo(g);
    })
  }, [])

  return (
    <>
      <div className="ads w-full h-[400px] ">
        <div className="content-of-ads flex items-center justify-center h-full flex-col">
          <p className="z-[100] text-4xl font-extrabold text-white">
            {/* DON’T <span className=" text-website2">THINK</span>, BEGIN{" "}
            <span className=" text-website2">TODAY</span>! */}
            {genInfo?.adsOnImageBoldText ?? ''}
          </p>
          <p className=" text-white z-[100] w-[50%] text-center mt-4 ">
            {genInfo?.adsOnImageDescription ?? ''}
          </p>
        </div>
      </div>
    </>
  );
}

export default Ads;
