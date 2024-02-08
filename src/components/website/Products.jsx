'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { getHomeProducts } from "../../app/api/v1/dashboard";

function Products() {
  const [ products, setProducts ] = useState([]);

  useEffect(() => {
    getHomeProducts().then(p => {
      if (p === 'error' || p === 'unauthorized');
      else {
        setProducts(p);
      }
    });
  }, [])

  
  return (
    <>
      <div className="container-site">
        <div className="products flex flex-row overflow-x-auto gap-10 scroll-smooth w-full">
          {products.map((ele) => {
            return (
              <>
                <div
                  key={ele.name}
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
