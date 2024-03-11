"use client";
import React, { useEffect, useState } from "react";
import { CiSaveDown1 } from "react-icons/ci";
import { CiSaveUp1 } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";

import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import {
  getProductCategories,
  getCategoryProducts,
} from "../../../api/v1/dashboard";
import Swal from "sweetalert2";
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

  const [inEditingProduct, setInEditingProduct] = useState();

  const [newProduct, setNewProduct] = useState();

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
                          <div className="flex justify-between items-center ">
                            <div className="mb-5">
                              {inEditingProduct === el.id ? (
                                <>
                                  <span className="font-bold">Marka : </span>
                                  <input
                                    className="border-2 px-2 rounded-xl"
                                    type="text"
                                    defaultValue={el.marka}
                                  />
                                </>
                              ) : (
                                <>
                                  <span className="font-bold">Marka : </span>{" "}
                                  {el.marka}
                                </>
                              )}
                            </div>
                            <div className="mb-5">
                              {inEditingProduct === el.id ? (
                                <>
                                  <span className="font-bold">Name : </span>
                                  <input
                                    className="border-2 px-2 rounded-xl"
                                    type="text"
                                    defaultValue={el.name}
                                  />
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="flex items-center gap-4">
                              <CiEdit
                                onClick={() => setInEditingProduct(el.id)}
                                color="green"
                                size={23}
                              />
                              <MdDeleteForever color="red" size={23} />
                            </div>
                          </div>
                          <div className="mb-5">
                            {inEditingProduct === el.id ? (
                              <>
                                <span className="font-bold">price : </span>
                                <input
                                  className="border-2 px-2 rounded-xl"
                                  type="text"
                                  defaultValue={el.price}
                                />
                                TL
                              </>
                            ) : (
                              <>
                                <span className="font-bold">Price : </span>{" "}
                                {el.price} TL
                              </>
                            )}
                          </div>
                          <div className="">
                            {inEditingProduct === el.id ? (
                              <>
                                <div className="flex">
                                  <p className="font-bold">Description : </p>
                                  <textarea
                                    className="ml-3 flex-1 border-2 outline-none rounded-xl resize-none h-[200px] px-2"
                                    defaultValue={el.description}
                                  />
                                </div>
                                <button
                                  onClick={() => {
                                    Swal.fire({
                                      title: "Do you want to save the changes?",
                                      showDenyButton: true,
                                      showCancelButton: true,
                                      confirmButtonText: "Save",
                                      denyButtonText: `Don't save`,
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        Swal.fire("Saved!", "", "success");
                                      } else if (result.isDenied) {
                                        Swal.fire(
                                          "Changes are not saved",
                                          "",
                                          "info"
                                        );
                                      }
                                    });
                                  }}
                                  className="bg-green-700 px-2 py-2 rounded-md text-white font-bold mt-3 w-full mx-auto my-0"
                                >
                                  Submit edits
                                </button>
                              </>
                            ) : (
                              <>
                                <div className="flex">
                                  <p className="font-bold">Description : </p>
                                  <textarea
                                    disabled
                                    className="ml-3 flex-1 border-2 outline-none rounded-xl resize-none h-[200px] px-2"
                                    defaultValue={el.description}
                                  />
                                </div>
                              </>
                            )}
                          </div>
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
