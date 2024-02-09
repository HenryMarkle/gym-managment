"use client";
import React, { useEffect, useState } from "react";
import { Slide, Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { getHomeProducts } from "../../api/v1/dashboard";
import { BallTriangle } from "react-loader-spinner";
import "./helper.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";

function page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getHomeProducts().then((p) => {
      setProducts(p);
    });
  }, []);

  const slideImages = [
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTemRJxSRKw_u1aX15suIHw8FUeHnQPLL9i5A&usqp=CAU",
      caption: "Slide 1",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZegA_lKLKv_I5wGhzzQt5x5-AM3Q0Tn08Ag&usqp=CAU",
      caption: "Slide 2",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmIPxTaFcHXkC0YvcrBa4PCMAM0Jkcd2gwSg&usqp=CAU",
      caption: "Slide 3",
    },
  ];

  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmIPxTaFcHXkC0YvcrBa4PCMAM0Jkcd2gwSg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmIPxTaFcHXkC0YvcrBa4PCMAM0Jkcd2gwSg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmIPxTaFcHXkC0YvcrBa4PCMAM0Jkcd2gwSg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmIPxTaFcHXkC0YvcrBa4PCMAM0Jkcd2gwSg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmIPxTaFcHXkC0YvcrBa4PCMAM0Jkcd2gwSg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmIPxTaFcHXkC0YvcrBa4PCMAM0Jkcd2gwSg&usqp=CAU",
  ];
  return (
    <>
      <div className="px-20 pt-10 flex justify-between gap-8 h-[550px]">
        <div className="slide-container w-[25%] border-2 p-10 h-[400px]  rounded-md">
          <Slide transitionDuration={300} autoplay={false}>
            {slideImages.map((slideImage, index) => (
              <div
                key={index}
                className="flex justify-center items-center h-[100%] bg-white"
              >
                <img className="w-auto " src={slideImage.url} alt="" />
              </div>
            ))}
          </Slide>
        </div>
        <div className="tow flex-1 ">
          <div className="product-name border-2 p-2 rounded-md ">
            <p className="text-center text-4xl">
              <span className="mr-2 font-bold text-website2">Pro gainer</span>
            </p>
          </div>
          <div className="product-name border-2 p-2 rounded-md mt-4 min-h-[270px] max-h-[270px] overflow-y-auto flex flex-col justify-between pb-10">
            <p className="text-center text-black text-[16.5px]">
              repellendus quos! Magni debitis qui eveniet, omnis, repellendus
              earum officia ullam incidunt adipisci tempora cum unde, distinctio
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia
              officiis beatae repellendus quos! Magni debitis qui eveniet,
              omnis, repellendus earum officia ullam incidunt adipisci tempora
              cum unde, distinctio sunt facere! Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Mollitia officiis beatae
              repellendus quos! Magni debitis qui eveniet, omnis, repellendus
              earum officia ullam incidunt adipisci tempora cum unde, distinctio
              sunt facere! Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Mollitia officiis beatae repellendus quos! Magni debitis qui
              eveniet, omnis, repellendus
            </p>
          </div>
          <div className="price border-2 h-[45px] text-website2  rounded-md mt-2 p-2 flex justify-between hover:bg-orange-600 duration-300 cursor-pointer hover:text-white">
            <button className="font-bold">Buy Now!</button>
            <span className="">1500 TL</span>
          </div>
        </div>
      </div>
      <div className="products-has-same-category px-20">
        <p className="font-bold text-website2 text-2xl">Similar products </p>
      </div>
      <div className="container-site">
        <p className="waves"></p>
        <p className="waves"></p>
        <p className="waves"></p>
        {products.length ? (
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={5}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
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
                    <Link href={`/shop/${ele.id}`}>
                      <div className=" flex flex-col">
                        <img
                          className="w-[220px] self-center"
                          src="https://cdn.akakce.com/hardline-nutrition/hardline-nutrition-progainer-5000-gr-z.jpg"
                          alt=""
                        />
                        <div className="flex w-full p-3 items-center">
                          <p className="w-[100%] text-sm">
                            <span className=" text-website2 font-bold text-lg mr-1">
                              {ele.marka}
                            </span>{" "}
                            {ele.description.length > 70
                              ? ele.description.slice(0, 70) + "..."
                              : ele.description}
                          </p>
                        </div>
                        <div className="flex justify-between items-center w-full p-3">
                          <p className="text-website2">{ele.price} TL</p>
                          <button className="buy-button shadow-md p-2 text-website2 ">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                </>
              );
            })}
          </Swiper>
        ) : (
          <div className="flex justify-center items-center my-20">
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#ed563b"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default page;
