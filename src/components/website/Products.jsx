import Image from "next/image";
import React from "react";

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
  return (
    <>
      <div className="container-site">
        <div className="products flex flex-row overflow-x-auto gap-10 scroll-smooth w-full">
          {dammyData.map((ele) => {
            return (
              <>
                <div
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
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Products;
