'use client'

import React, { useEffect, useState } from "react";

import { getAdsInfo } from "../../app/api/v1/dashboard";

function Ads() {
  const [ adsInfo, setAdsInfo ] = useState(null);

  useEffect(() => {
    getAdsInfo().then(a => {
      if (a === 'error' || a === 'unauthorized') {}
      else setAdsInfo(a);

      console.log(a)
    })
  }, [])

  return (
    <>
      <div className="ads w-full h-[400px] ">
        <div className="content-of-ads flex items-center justify-center h-full flex-col">
          <p className="z-[10] text-4xl font-extrabold text-white">
            {/* DON’T <span className=" text-website2">THINK</span>, BEGIN{" "}
            <span className=" text-website2">TODAY</span>! */}
            {adsInfo?.title ?? ''}
          </p>
          <p className=" text-white z-[100] w-[50%] text-center mt-4 ">
            {adsInfo?.description ?? ''}
          </p>
        </div>
      </div>
    </>
  );
}

export default Ads;
