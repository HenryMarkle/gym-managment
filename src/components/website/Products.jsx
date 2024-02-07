"use client";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import { getHomeProducts } from "../../app/api/v1/dashboard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getHomeProducts().then((p) => {
      if (p === "error" || p === "unauthorized");
      else {
        for (let i = 0; i < p.length; i++) {
          p[i] = { ...p[i], id: i };
        }

        setProducts(p);
      }
    });
  });

  return (
    <>
      <div className="container-site">
        <Swiper
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
          {" "}
          {products.map((ele) => {
            return (
              <>
                <SwiperSlide
                  key={ele.id}
                  className="product shadow-lg flex flex-col justify-center items-center rounded-xl min-w-[300px]"
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
                        ? ele.description.slice(0, 70) + "..."
                        : ele.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full p-3">
                    <p className="text-website2">{ele.price}</p>
                    <button className="buy-button shadow-md p-2 text-website2 ">
                      Buy Now
                    </button>
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
