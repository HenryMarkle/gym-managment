"use client";
import React, { useEffect, useState } from "react";
import { CiSaveDown1 } from "react-icons/ci";
import { CiSaveUp1 } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";

import {
  getProductCategories,
  getCategoryProducts,
} from "../../../api/v1/dashboard";
function page() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeSection, setActiveSection] = useState();
  const [openProducts, setOpenProducts] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  useEffect(() => {
    getCategoryProducts().then((cp) => {
      if (cp === "error") {
        console.log("There is an error with getting the data !");
      } else {
        setActiveSection(cp[0]?.id || null);
        setProducts(cp);
        console.log(cp);
      }
    });

    getProductCategories().then((c) => {
      if (c === "error") {
      } else setCategories(c);
    });
  }, []);

  useEffect(() => {}, [filterValue]);

  return (
    <>
      <div className="shadow-lg h-full m-3 p-4 rounded-lg">
        <div className="flex items-center ">
          <p className="font-bold text-3xl">Market</p>
          <div className="self-center ml-10 relative">
            <CiSearch size={22} className=" absolute left-1 top-[2px]" />
            <input
              onChange={(e) => setFilterValue(e.target.value)}
              className="border-2 rounded-xl px-7 w-[400px]"
              type="text"
              placeholder="Search product by name"
            />
          </div>
        </div>
        <div className="prodcuts w-full  flex justify-between px-20 mt-6">
          <div className={`categories  px-6 py-1  font-bold rounded-lg `}>
            <p className="font-bold cursor-pointer">All Products</p>
          </div>
          {products?.map((ele, index) => {
            return (
              <React.Fragment key={index}>
                <div
                  onClick={() => {
                    setActiveSection(ele.id);
                  }}
                  className={`categories ${
                    activeSection === ele.id
                      ? "bg-green-700 text-white"
                      : "bg-gray-300 text-black"
                  }  px-6 py-1  font-bold rounded-lg `}
                >
                  <p className="font-bold cursor-pointer">{ele.cat}</p>
                </div>
              </React.Fragment>
            );
          })}
        </div>
        {products.map((ele) => {
          return (
            <>
              {ele.data
                .filter((ele) =>
                  ele.name
                    .trim()
                    .toLowerCase()
                    .includes(filterValue.trim().toLowerCase())
                )
                .filter((e) => e.categoryId === activeSection)
                .map((el, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div
                        className={`shadow-lg px-2 py-2 rounded-lg mt-4 duration-300 overflow-hidden ${
                          openProducts.includes(el.id)
                            ? "h-[450px]"
                            : "h-[45px]"
                        }`}
                      >
                        <div
                          onClick={() => {
                            if (openProducts.includes(el.id)) {
                              setOpenProducts(
                                openProducts.filter((id) => id !== el.id)
                              );
                            } else {
                              setOpenProducts([...openProducts, el.id]);
                            }
                            console.log(el.id);
                          }}
                          className="flex justify-between items-center h-[45px]"
                        >
                          <p className="font-bold">{el.name}</p>
                          {openProducts.includes(el.id) ? (
                            <CiSaveUp1 size={24} />
                          ) : (
                            <CiSaveDown1 size={24} />
                          )}
                        </div>
                        <div className="content mt-4">
                          <p className="mb-2">
                            <span className="font-bold">Marka</span> :{" "}
                            {el.marka}
                          </p>
                          <p className="mb-5">
                            <span className="font-bold">Price : </span>{" "}
                            {el.price} TL
                          </p>
                          <p>
                            <span className="font-bold">Description : </span>
                            {el.description}
                          </p>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
            </>
          );
        })}
      </div>
    </>
  );
}

export default page;
