import Link from "next/link";
import React from "react";
import { BallTriangle } from "react-loader-spinner";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function Slider({ data, id, min, max, sendedFilterValue }) {
  return (
    <>
      {data.filter((ele) => ele.price > min && ele.price < max).length ? (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          // onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {data
            .filter(
              (ele) =>
                ele.price > min &&
                ele.price < max &&
                (ele.marka
                  .toUpperCase()
                  .includes(sendedFilterValue.toUpperCase()) ||
                  ele.description
                    .toUpperCase()
                    .includes(sendedFilterValue.toUpperCase()))
            )
            .map((ele) => {
              return (
                <React.Fragment key={id}>
                  <SwiperSlide className="product shadow-lg flex flex-col justify-center items-center rounded-xl min-w-[250px]">
                    <Link href={`/market/${ele.id}`}>
                      <div className="flex flex-col">
                        <img
                          className="w-full self-center p-[30px]"
                          src="https://cdn.akakce.com/hardline-nutrition/hardline-nutrition-progainer-5000-gr-z.jpg"
                          alt=""
                        />
                        <div className="flex w-full p-3 items-center">
                          <p className="w-[100%] text-sm h-[60px]">
                            <span className=" text-website2 font-bold text-lg mr-1 leading-3">
                              <span className="mr-2">{ele.marka}</span>
                              <span className="text-black opacity-80 text-[14px] ">
                                {ele.description?.length > 52
                                  ? ele.description.slice(0, 52) + "..."
                                  : ele.description}
                              </span>
                            </span>{" "}
                          </p>
                        </div>
                        <div className="flex justify-between items-center w-full p-3">
                          <p className="text-website2 font-bold">
                            {ele.price} TL
                          </p>
                          <button className="buy-button shadow-md p-2 text-website2 ">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                </React.Fragment>
              );
            })}
        </Swiper>
      ) : (
        <div className="flex justify-center items-center my-20 text-website2 font-extrabold">
          No elements found
        </div>
      )}
    </>
  );
}

export default Slider;
