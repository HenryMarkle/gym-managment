"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductsOfCategory } from "../../api/v1/dashboard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";

function page({}) {
  const params = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log(params);
    getProductsOfCategory(params.cat ?? "").then((c) => {
      if (c === "error") {
      } else setProducts(c);

      console.log(c);
    });
  }, []);

  return (
    <>
      <div className="cards flex p-10 gap-5 flex-wrap">
        {products.map((ele) => {
          return (
            <>
              <div className="product-card w-[23%] shadow-lg">
                <Link href={`/product/${ele.id}`}>
                  <div className=" flex flex-col min-h-[280px]">
                    <img
                      className="w-[220px] self-center"
                      src="https://cdn.akakce.com/hardline-nutrition/hardline-nutrition-progainer-5000-gr-z.jpg"
                      alt=""
                    />
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
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default page;
