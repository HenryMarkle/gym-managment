"use client";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { BallTriangle } from "react-loader-spinner";
import { getHomeProducts } from "../../app/api/v1/dashboard";
import storage from "../../app/api/v1/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./helper.css";
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
      <div className="lg:py-[100px] py-20">
        <p className="text-center font-extrabold lg:text-4xl flex justify-center">
          OUR <span className="text-website2">MARKET</span>
        </p>
        <p className="waves"></p>
        <p className="waves"></p>
        <p className="waves"></p>
        {products?.length ? (
          <>
            <p>Show product new swipper</p>
          </>
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
