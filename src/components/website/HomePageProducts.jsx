"use client";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { BallTriangle } from "react-loader-spinner";
import { getHomeProducts } from "../../app/api/v1/dashboard";
import storage from '../../app/api/v1/firebase';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
function Products() {
  const [products, setProducts] = useState([]);

  async function getProductImages(id) {
    const storageRed = ref(storage, `images/products/${id}`);
    const listRes = await listAll(storageRed);
    
    let urls = [];

    for (let item of listRes.items) {
      urls.push(await getDownloadURL(item));
    }

    return urls;
  }

  useEffect(() => {
    getHomeProducts().then(async (p) => {
      if (p === "error" || p === "unauthorized") {
      } else {
        for (let product of p) {
          product.images = await getProductImages(product.id);
        }

        setProducts(p);
      
      }
      console.log(products);
    });
  }, []);
  return (
    <>
      <div className="container-site">
        <p className="text-center  font-extrabold text-4xl ">
          OUR <span className="text-website2">MARKET</span>
        </p>
        <p className="waves"></p>
        <p className="waves"></p>
        <p className="waves"></p>
        {products?.length ? (
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {products.map((ele) => {
              const id = ele.id;



              return (
                <>
                  <SwiperSlide
                    key={ele.id}
                    className="product shadow-lg flex flex-col justify-center items-center rounded-xl min-w-[300px]"
                  >
                    <Link href={`/product/${ele.id}`}>
                      <div className=" flex flex-col min-h-[280px]">
                        { ele.images?.length &&
                          <img className="w-[220px] self-center" src={ele.images[0]} /> 
                        }
                        <div className="flex w-full p-3 items-center">
                          <p className="w-[100%] min-h-[71px] text-sm mt-2">
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

export default Products;
