"use client";
import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import Slider from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
function Products() {
  const dammyData = [
    {
      id: 1,
      marka: "marka",
      desc: "MysupplementMass Gainer 3000 gr Çikolata Aroma Karbonhidrat Tozu Weight Gainer Kilo Almaya Yardımcı Kilo HacimMysupplementMass Gainer 3000 gr Çikolata Aroma Karbonhidrat Tozu Weight Gainer Kilo Almaya Yardımcı Kilo Hacim",
    },
    {
      id: 2,
      marka: "marka",
      desc: "MysupplementMass Gainer 3000 gr Çikolata Aroma Karbonhidrat Tozu Weight Gainer Kilo Almaya Yardımcı Kilo HacimMysupplementMass Gainer 3000 gr Çikolata Aroma Karbonhidrat Tozu Weight Gainer Kilo Almaya Yardımcı Kilo Hacim",
    },
    {
      id: 3,
      marka: "marka",
      desc: "MysupplementMass Gainer 3000 gr Çikolata Aroma Karbonhidrat Tozu Weight Gainer Kilo Almaya Yardımcı Kilo HacimMysupplementMass Gainer 3000 gr Çikolata Aroma Karbonhidrat Tozu Weight Gainer Kilo Almaya Yardımcı Kilo Hacim",
    },
    {
      id: 4,
      marka: "marka",
      desc: "MysupplementMass Gainer 3000 gr Çikolata Aroma Karbonhidrat Tozu Weight Gainer Kilo Almaya Yardımcı Kilo HacimMysupplementMass Gainer 3000 gr Çikolata Aroma Karbonhidrat Tozu Weight Gainer Kilo Almaya Yardımcı Kilo Hacim",
    },
    {
      id: 5,
      marka: "marka",
      desc: "MysupplementMass Gainer 3000 gr Çikolata Aroma Karbonhidrat Tozu Weight Gainer Kilo Almaya Yardımcı Kilo HacimMysupplementMass Gainer 3000 gr Çikolata Aroma Karbonhidrat Tozu Weight Gainer Kilo Almaya Yardımcı Kilo Hacim",
    },
    {
      id: 6,
      marka: "marka",
      desc: "MysupplementMass Gainer 3000 gr Çikolata Aroma Karbonhidrat Tozu Weight Gainer Kilo Almaya Yardımcı Kilo HacimMysupplementMass Gainer 3000 gr Çikolata Aroma Karbonhidrat Tozu Weight Gainer Kilo Almaya Yardımcı Kilo Hacim",
    },
    {
      id: 7,
      marka: "marka",
      desc: "MysupplementMass Gainer 3000 gr Çikolata Aroma Karbonhidrat Tozu Weight Gainer Kilo Almaya Yardımcı Kilo HacimMysupplementMass Gainer 3000 gr Çikolata Aroma Karbonhidrat Tozu Weight Gainer Kilo Almaya Yardımcı Kilo Hacim",
    },
    {
      id: 8,
      marka: "marka",
      desc: "MysupplementMass Gainer 3000 gr Çikolata Aroma Karbonhidrat Tozu Weight Gainer Kilo Almaya Yardımcı Kilo HacimMysupplementMass Gainer 3000 gr Çikolata Aroma Karbonhidrat Tozu Weight Gainer Kilo Almaya Yardımcı Kilo Hacim",
    },
    {
      id: 9,
      marka: "marka",
      desc: "MysupplementMass Gainer 3000 gr Çikolata Aroma Karbonhidrat Tozu Weight Gainer Kilo Almaya Yardımcı Kilo HacimMysupplementMass Gainer 3000 gr Çikolata Aroma Karbonhidrat Tozu Weight Gainer Kilo Almaya Yardımcı Kilo Hacim",
    },
  ];
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 5,
  };

  return (
    <>
      <div className="container-site">
        <p className="text-center  font-extrabold text-4xl ">
          OUR <span className="text-website2">MARKET</span>
        </p>
        <p className="waves"></p>
        <p className="waves"></p>
        <p className="waves"></p>
        <Swiper
          className=""
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {dammyData.map((ele) => {
            return (
              <>
                <SwiperSlide>
                  <div
                    key={ele.id}
                    className="product shadow-lg flex flex-col justify-center items-center rounded-xl min-w-[300px] "
                  >
                    <img
                      className="w-[220px]"
                      src="https://cdn.akakce.com/hardline-nutrition/hardline-nutrition-progainer-5000-gr-z.jpg"
                      alt=""
                    />
                    <div className="flex w-full p-3 items-center">
                      <p className="w-[90%]">
                        <span className=" text-website2 font-bold mr-1">
                          {ele.marka}
                        </span>{" "}
                        {ele.desc.length > 70
                          ? ele.desc.slice(0, 70) + "..."
                          : ele.desc}
                      </p>
                    </div>
                    <div className="flex justify-between items-center w-full p-3">
                      <p className="text-website2">1200 TL</p>
                      <button className="buy-button shadow-md p-2 text-website2 ">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}

export default Products;
