import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./helper.css";

import storage from "../../app/api/v1/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

function Slider({ data, id, min, max, sendedFilterValue, cat }) {
  const [sections, setSections] = useState(data);

  useEffect(() => {
    console.log("product id: " + id);

    async function setImages() {
      for (let product of data.data) {
        product.images = [];

        const response = await listAll(
          ref(storage, `images/products/${product.id}`)
        );
        const urls = await Promise.all(
          response.items.map((i) => getDownloadURL(i))
        );
        product.images = urls;
      }
    }

    setImages().then(() => setSections((prev) => prev));
  }, []);

  return (
    <>
      {cat === "All" ? (
        <>
          <div className="px-20 flex justify-between items-center">
            <p className="text-website2 font-bold text-xl ">{data.cat}</p>
            <Link href={`/market/${data.cat}`}>
              <button className="shadow-lg px-8 py-2 duration-300 hover:bg-orange-600 text-website2 rounded-md hover:text-white">
                See All
              </button>
            </Link>
          </div>
          {sections.data.filter((ele) => ele.price > min && ele.price < max)
            .length ? (
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSlideChange={() => console.log("slide change")}
            >
              {sections.data
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
                .map((ele) => (
                  <React.Fragment key={id}>
                    <SwiperSlide className="product shadow-lg flex flex-col justify-center items-center rounded-xl min-w-[250px]">
                      <Link href={`/product/${ele.id}`}>
                        <div className="flex flex-col">
                          {ele.images?.length > 0 ? (
                            <img
                              className="w-full self-center h-[200px] p-[20px]"
                              src={ele.images[0]}
                            />
                          ) : (
                            ""
                          )}
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
                ))}
            </Swiper>
          ) : (
            <div className="flex justify-center items-center my-20 text-website2 font-extrabold">
              No elements found
            </div>
          )}
        </>
      ) : (
        sections.cat === cat && (
          <>
            <div className="px-20 flex justify-between items-center">
              <p className="text-website2 font-bold text-xl ">{data.cat}</p>
              <Link href={`/market/${cat}`}>
                <button className="shadow-lg px-8 py-2 duration-300 hover:bg-orange-600 text-website2 rounded-md hover:text-white">
                  See All
                </button>
              </Link>
            </div>
            {sections.data.filter((ele) => ele.price > min && ele.price < max)
              .length ? (
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSlideChange={() => console.log("slide change")}
              >
                {sections.data
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
                  .map((ele) => (
                    <React.Fragment key={id}>
                      <SwiperSlide className="product shadow-lg flex flex-col justify-center items-center rounded-xl min-w-[250px]">
                        <Link href={`/product/${ele.id}`}>
                          <div className="flex flex-col">
                            {ele.images?.length && (
                              <img
                                className="w-full self-center p-[30px]"
                                src={ele.images[0]}
                                alt=""
                              />
                            )}

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
                  ))}
              </Swiper>
            ) : (
              <div className="flex justify-center items-center my-20 text-website2 font-extrabold">
                No elements found
              </div>
            )}
          </>
        )
      )}
    </>
  );
}
export default Slider;
