"use client";
import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { CiSaveDown1 } from "react-icons/ci";
import { CiSaveUp1 } from "react-icons/ci";
import {
  getHomeGeneralInfo,
  updateHomeGeneralInfo,
  getProductCategories,
  getAdsInfo,
  updateAdsInfo,
  addPlan,
  addHomeProduct,
} from "../../api/v1/dashboard";
import StarterS from "../../../components/website/components/starterS";
// Firebase

import storage from "../../api/v1/firebase";
import { listAll, ref, uploadBytes, deleteObject } from "firebase/storage";
import Swal from "sweetalert2";

export default function HomePage() {
  const [edited, setEdited] = useState(false);
  const [edited2, setEdited2] = useState(false);
  const [gymTitle, setGymTitle] = useState("");
  const [generalInfo, setGeneralInfo] = useState(null);
  const [planOpen, setPlanOpen] = useState(true);
  const [shopOpen, setShopOpen] = useState(true);

  /// Plan values
  const [planTitle, setPlanTitle] = useState("");
  const [planDesc, setPlanDesc] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  const [planfeature, setPlanFeature] = useState("");
  const [Planfeatuers, setPlanFeatures] = useState([]);
  const [planDur, setPlanDur] = useState("");

  ////////// End plan values

  const [adsTitle, setAdsTitle] = useState("");
  const [adsDescription, setAdsDescription] = useState("");

  /// Products values

  const [productTitle, setProductTitle] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productMarka, setProductMarka] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [categoreies, setCategories] = useState([]);
  const [newcategorTitle, setNewCategoryTitle] = useState("");
  const [allProductCategories, setAllProductCategories] = useState([]);
  const [deletedCategories, setDeletedCategories] = useState([]);

  ////////// End Products values

  const [image, setImage] = useState(null);
  const [adsImage, setAdsImage] = useState(null);
  const [productImage, setProductImage] = useState({});

  useEffect(() => {
    getHomeGeneralInfo().then((d) => {
      setGeneralInfo(d === "error" || d === "unauthorized" ? null : d);
      setGymTitle(d.title);
    });

    getAdsInfo().then((d) => {
      if (d === "error" || d === "unauthorized");
      else {
        setAdsTitle(d.title);
        setAdsDescription(d.description);
      }
    });

    getProductCategories().then((c) => {
      if (c === "error") {
        console.log("error");
      } else {
        setAllProductCategories(c.map((ele) => ele.name));
        console.log(allProductCategories);
        setCategories(c.map((cat) => cat.name));
      }
    });
  }, []);

  useEffect(() => {
    console.log(productCategory);
  }, [productCategory]);

  useEffect(() => {
    console.log(Planfeatuers);
  }, [Planfeatuers]);
  const [whichHomePart, setWhichHomePart] = useState(["starter"]);
  return (
    <>
      <StarterS />

      {/* Start Plan Blog */}

      <div
        id="plan"
        className={`create-plan mt-5 w-full  overflow-hidden   duration-700 shadow-xl rounded-lg  ${
          planOpen ? "h-[570px]" : "h-[85px]"
        }`}
      >
        <div
          onClick={() => setPlanOpen(!planOpen)}
          className="header flex justify-between items-center mt-4 px-2 cursor-pointer"
        >
          <p className="mb-2 text-[19px] font-bold text-center w-full py-5 ">
            Create plan
          </p>
          {planOpen ? <CiSaveUp1 size={24} /> : <CiSaveDown1 size={24} />}
        </div>
        <div className="form-content w-full rounded-[30px] py-1 px-5 grid grid-cols-2 gap-7">
          <div className="plan-title flex flex-col">
            <label htmlFor="">Plan title</label>
            <input
              value={planTitle}
              onChange={(e) => setPlanTitle(e.target.value)}
              type="text"
              placeholder="Plan title"
            />
          </div>{" "}
          <div className="plan-desc flex flex-col">
            <label htmlFor="">Plan description</label>
            <input
              value={planDesc}
              onChange={(e) => setPlanDesc(e.target.value)}
              type="text"
              placeholder="Plan description"
            />
          </div>
          <div className="plan-desc flex flex-col">
            <label htmlFor="">Plan duration</label>
            <input
              value={planDur}
              onChange={(e) => setPlanDur(e.target.value)}
              type="text"
              placeholder="Plan description"
            />
          </div>
          <div className="plan-price flex flex-col">
            <label htmlFor="">Plan price</label>
            <input
              value={planPrice}
              onChange={(e) => setPlanPrice(e.target.value)}
              type="number"
              placeholder="Plan price"
            />
          </div>{" "}
          <div className="plan-price flex flex-col">
            <label htmlFor="">Plan Features</label>
            <div className="w-full ">
              <input
                className=" w-[81%] rounded-r-none"
                value={planfeature}
                onChange={(e) => setPlanFeature(e.target.value)}
                type="text"
                placeholder="Add feature"
              />
              <button
                onClick={() => {
                  setPlanFeatures([...Planfeatuers, planfeature]);
                  setPlanFeature("");
                }}
                className="w-[19%] bg-green-700 py-1 rounded-r-xl text-white"
              >
                Add
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              Swal.fire({
                title: `Do you want to save the plan?
                You will be able to edit the plan from Plans page.
                `,
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`,
              }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  const result = await addPlan({
                    title: planTitle,
                    description: planDesc,
                    price: planPrice,
                    duration: planDur,
                  });
                  if (result === "success") {
                    setPlanTitle("");
                    setPlanDesc("");
                    setPlanPrice("");
                    setPlanDur("");
                    Swal.fire("Saved!", "", "success");
                  } else {
                    Swal.fire("Fail!", "", "error");
                  }
                } else if (result.isDenied) {
                  Swal.fire("Changes are not saved", "", "info");
                }
              });
            }}
            className="bg-green-700 h-[60%] mt-6 rounded-xl text-white"
          >
            Create
          </button>
          <div className="plan-price flex flex-col">
            <label htmlFor="">Added features</label>
            <div className=" h-[140px] border-2 overflow-y-auto rounded-xl">
              <div className=" flex flex-row flex-wrap gap-2 p-6">
                {Planfeatuers.filter((ele) => ele != "").map((ele) => {
                  return (
                    <>
                      <p className="plan-feature relative bg-gray-50 px-4 py-1 m-2">
                        {ele}
                        <span
                          onClick={() => {
                            const filterdArray = Planfeatuers.filter(
                              (e) => e != ele
                            );
                            setPlanFeatures(filterdArray);
                          }}
                          className="absolute -top-5 right-0 bg-gray-50 px-2 cursor-pointer hover:bg-red-500 duration-200 hover:text-white"
                        >
                          X
                        </span>
                      </p>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*End Plan Blog */}

      {/* Start Ads Blog */}
      <div className="p-6 rounded-xl mt-10  pt-10 border-b-2 pb-10 shadow-lg ">
        <p className="font-bold text-center mb-10 text-xl">Ads section</p>
        <div id="ads" className="ads  grid grid-cols-2 gap-7 ">
          <div className=" flex flex-col">
            <label htmlFor="image">Ads Background image</label>
            <input
              type="file"
              className="third border-none bg-white"
              name=""
              id="image"
              onChange={(e) => {
                setAdsImage(e.target.files[0]);
                setEdited2(true);
              }}
            />
          </div>
          <div className="4 flex flex-col">
            <label>Ads on image (Bold text)</label>
            <input
              defaultValue="default value"
              type="text"
              placeholder="Ads on image"
              value={adsTitle}
              onChange={(e) => {
                setAdsTitle(e.target.value);
                setEdited2(true);
              }}
            />
          </div>
          <div className="5 flex flex-col">
            <label>Ads on image (descriptio)</label>
            <input
              defaultValue="default value"
              type="text"
              placeholder="Ads on image"
              value={adsDescription}
              onChange={(e) => {
                setAdsDescription(e.target.value);
                setEdited2(true);
              }}
            />
          </div>
          <button
            className=" h-[40px] mt-5 bg-green-700 text-white font-bold rounded-xl"
            disabled={!edited2}
            onClick={async () => {
              Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`,
              }).then(async (result) => {
                if (result.isConfirmed) {
                  const result = await updateAdsInfo({
                    title: adsTitle,
                    description: adsDescription,
                  });

                  if (result === "success" && adsImage) {
                    var extension = adsImage.name.includes(".")
                      ? image.name.substring(
                          adsImage.name.lastIndexOf(".") + 1,
                          adsImage.name.length
                        )
                      : "";
                    const imagesRef = ref(storage, "images/");

                    const allImages = await listAll(imagesRef);

                    const adsBackgroundImage = allImages.items.find((i) =>
                      i.name.startsWith("adsBackgroundImage")
                    );

                    if (adsBackgroundImage) {
                      const imageRef = ref(
                        storage,
                        `images/${adsBackgroundImage.name}`
                      );
                      await deleteObject(imageRef);
                    }

                    const imageRef = ref(
                      storage,
                      `images/adsBackgroundImage.${extension}`
                    );
                    try {
                      await uploadBytes(imageRef, adsImage);
                    } catch (e) {
                      console.log(
                        "failed to upload ads background image: " + e
                      );
                    }
                  }
                  Swal.fire("Saved!", "", "success");
                } else if (result.isDenied) {
                  Swal.fire("Changes are not saved", "", "info");
                }
              });
            }}
          >
            Update
          </button>
        </div>
      </div>

      {/* End Ads Blog */}

      {/* Start shop Blog */}

      <div id="shop" className="add-product-to-shop mt-20 border-t-2 ">
        <p>Create Product</p>
        <div
          className={`create-plan mt-5 w-full shadow-lg overflow-hidden rounded-[30px] duration-700 flex flex-col ${
            shopOpen ? "h-[620px]" : "h-[55px]"
          }`}
        >
          <div
            onClick={() => setShopOpen(!shopOpen)}
            className="header flex justify-between items-center mt-4 px-2 cursor-pointer"
          >
            <p className="mb-2 text-[19px]">Add product</p>
            {shopOpen ? <CiSaveUp1 size={24} /> : <CiSaveDown1 size={24} />}
          </div>
          <div className="form-content w-full mr-10 rounded-[30px] py-1 px-5 flex gap-5">
            <div className="flex flex-col gap-5 w-[100%] border-r-2 pr-10 ">
              <div className="product-images flex flex-col">
                <label htmlFor="product-images">Product images</label>
                <input
                  type="file"
                  multiple
                  name=""
                  id="product-images"
                  onChange={(e) => {
                    setEdited2(true);
                    setProductImage(e.target.files ?? { length: 0 });
                  }}
                />
              </div>{" "}
              <div className="product-name flex flex-col">
                <label htmlFor="product-name">Product name</label>
                <input
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  type="text"
                  placeholder="Product name"
                  id="product-name"
                />
              </div>{" "}
              <div className="product-desc flex flex-col">
                <label htmlFor="product-description">Product Description</label>
                <input
                  value={productDesc}
                  onChange={(e) => setProductDesc(e.target.value)}
                  type="text"
                  placeholder="Product description"
                  id="product-description"
                />
              </div>{" "}
              <div className="product-price flex flex-col">
                <label htmlFor="product-price">Product price</label>
                <input
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  type="text"
                  placeholder="Product price"
                  id="product-price"
                />
              </div>{" "}
              <div className="product-company flex flex-col">
                <label htmlFor="product-company">Product marka</label>
                <input
                  value={productMarka}
                  onChange={(e) => setProductMarka(e.target.value)}
                  type="text"
                  placeholder="Product company"
                  id="product-company"
                />
              </div>
              <div className="product-category flex flex-col">
                <label htmlFor="product-company">Product category</label>
                <select
                  onChange={(e) => {
                    setProductCategory(e.target.value);
                  }}
                  className="select px-2 py-2 border-2 rounded-[31px] outline-none"
                >
                  <option selected value="select">
                    Select
                  </option>
                  {allProductCategories.map((c) => (
                    <option>{c}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => {
                  Swal.fire({
                    title: `Do you want to save the Product?
                      You will be able to edit the product from Products page.
                      `,
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: "Save",
                    denyButtonText: `Don't save`,
                  }).then(async (result) => {
                    /* Read more about isConfirmed, isDenied below */

                    if (result.isConfirmed) {
                      const addResult = await addHomeProduct({
                        name: productTitle,
                        description: productDesc,
                        price: productPrice,
                        marka: productMarka,
                        category: productCategory,
                      });

                      if (
                        productImage &&
                        productImage.length &&
                        typeof addResult === "number"
                      ) {
                        const storageRef = ref(
                          storage,
                          `images/products/${addResult}/`
                        );

                        try {
                          const allImages = await listAll(storageRef);

                          allImages.items.forEach(
                            async (i) => await deleteObject(i)
                          );

                          for (let f = 0; f < productImage.length ?? 0; f++) {
                            await uploadBytes(
                              ref(
                                storage,
                                `images/products/${addResult}/${
                                  productImage.item(f).name
                                }`
                              )
                            );
                          }
                        } catch (e) {
                          console.log(
                            "could not perform product creation operation: " + e
                          );
                          Swal.fire("Fail!", "", "error");
                        }

                        Swal.fire("Saved!", "", "success");
                        setProductDesc("");
                        setProductMarka("");
                        setProductPrice("");
                        setProductTitle("");
                        setProductCategory("");
                        setProductImage({ length: 0 });
                        setEdited2(false);
                      }
                    } else if (result.isDenied) {
                      Swal.fire("Changes are not saved", "", "info");
                    }
                  });
                }}
                className="bg-green-700 h-[40px] text-white font-bold rounded-xl"
              >
                Create
              </button>
            </div>
            <div className="create-cat w-full">
              <p className="text-xl font-bold pb-2">Create Category</p>
              <div className="add-cat flex justify-between w-[100%] items-center">
                <div className="flex flex-col w-[76%]">
                  <label htmlFor="product-name">Category name</label>
                  <input
                    value={newcategorTitle}
                    onChange={(e) => setNewCategoryTitle(e.target.value)}
                    type="text"
                    placeholder="Category name"
                    id="product-name"
                  />
                </div>
                <button
                  onClick={() => {
                    if (newcategorTitle !== "") {
                      setCategories([...categoreies, newcategorTitle]);
                      console.log(categoreies);
                      setNewCategoryTitle("");
                    }
                  }}
                  className="w-[20%] h-[36px] mt-5"
                >
                  Create
                </button>
              </div>
              <div className="already-added-categories mt-7 w-full h-[200px] border-2 p-5 rounded-[21px] overflow-y-auto ">
                <div className="flex flex-wrap w-full gap-5 ">
                  {categoreies.map((ele) => {
                    return (
                      <>
                        <div className="relative">
                          <p className="bg-gray-100 rounded-full px-2">{ele}</p>
                          <p
                            onClick={() => {
                              const filtetdArray = categoreies.filter(
                                (e) => e != ele
                              );
                              setCategories(filtetdArray);
                              setDeletedCategories([...deletedCategories, ele]);
                            }}
                            className="text-sm absolute -top-3 -right-4 bg-gray-100 cursor-pointer hover:bg-red-600 duration-300 hover:text-white w-[30px] flex items-center justify-center rounded-full"
                          >
                            x
                          </p>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div
                style={
                  deletedCategories.length > 0
                    ? { opacity: 1, height: "200px" }
                    : { opacity: 0, height: "0px" }
                }
                className="already-added-categories duration-300 mt-7 w-full  border-2 p-5 rounded-[21px] overflow-y-auto "
              >
                <p className=" text-center font-extrabold mb-3">
                  Deleted Categories
                </p>
                <div className=" flex flex-wrap w-full gap-5 ">
                  {deletedCategories
                    .filter((ele) => allProductCategories.includes(ele))
                    .map((ele) => {
                      return (
                        <>
                          <div className="w-full flex">
                            <div>
                              {ele} {`=>`}
                            </div>
                            <select className=" outline-none  border-2 px-2 ml-2 rounded-xl border-green-200">
                              <option selected value="1">
                                delete all products related
                              </option>
                              {allProductCategories
                                .filter((e) => e != ele)
                                .map((ele) => {
                                  return (
                                    <>
                                      <option value={ele}>
                                        Add All products related to {ele}
                                      </option>
                                    </>
                                  );
                                })}
                            </select>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="mb-14 mt-10 text-center font-bold text-[23px]">
          Changes you make here will appear directly on your gym website.
        </p>
      </div>

      {/* End shop Blog */}
    </>
  );
}
