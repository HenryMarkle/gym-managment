"use client";
import React, { useEffect, useState } from "react";
import "./helper.css";
import { CiSaveDown1 } from "react-icons/ci";
import { CiSaveUp1 } from "react-icons/ci";
import {
  getHomeGeneralInfo,
  updateHomeGeneralInfo,
  getAdsInfo,
  updateAdsInfo,
  addPlan,
  addHomeProduct,
} from "../../app/api/v1/dashboard";
import Swal from "sweetalert2";

export function HomePage() {
  const [edited, setEdited] = useState(false);
  const [edited2, setEdited2] = useState(false);

  const [gymTitle, setGymTitle] = useState('');

  const [generalInfo, setGeneralInfo] = useState(null);

  const [planOpen, setPlanOpen] = useState(true);
  const [shopOpen, setShopOpen] = useState(true);

  /// Plan values
  const [planTitle, setPlanTitle] = useState("");
  const [planDesc, setPlanDesc] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  const [planSentence, setPlanSentence] = useState("");

  const [planDur, setPlanDur] = useState('');
  ////////// End plan values

  const [adsTitle, setAdsTitle] = useState("");
  const [adsDescription, setAdsDescription] = useState("");

  /// Products values
  const [productTitle, setProductTitle] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productMarka, setProductMarka] = useState("");
  ////////// End Products values

  const [image, setImage] = useState(null);
  const [adsImage, setAdsImage] = useState(null);
  const [productImage, setProductImage] = useState(null);

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
  }, []);

  return (
    <>
      {/* Start starter Blog */}
      <div className="p-2 border-b-2 pb-10 grid grid-cols-2 gap-7 ">
        <div className="1 flex flex-col">
          <label htmlFor="">Gym title</label>
          <input
            defaultValue="default value"
            type="text"
            placeholder="Gym title"
            name="title"
            value={gymTitle}
            onChange={(e) => {
              setGymTitle(e.target.value)
              setEdited(true);
            }}
          />
        </div>
        <div className="2 flex flex-col">
          <label htmlFor="">starter sentence</label>
          <input
            type="text"
            defaultValue="default value"
            placeholder="starter sentence"
            name="starter-center"
            value={generalInfo?.sentence}
            onChange={(e) => {
              setGeneralInfo((g) => {
                return { ...g, sentence: e.target.data };
              });
              setEdited(true);
            }}
          />
        </div>
        <div className="2 flex flex-col">
          <label htmlFor="">second starter sentence</label>
          <input
            type="text"
            defaultValue="default value"
            placeholder="starter sentence"
            name="starter-center"
            value={generalInfo?.secondSentence}
            onChange={(e) => {
              setGeneralInfo((g) => {
                return { ...g, secondSentence: e.target.data };
              });
              setEdited(true);
            }}
          />
        </div>
        <div className=" flex flex-col">
          <label htmlFor="image">Background image</label>
          <input
            type="file"
            className="third border-none bg-white"
            name="image"
            id="image"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setEdited(true);
            }}
          />
        </div>
        <div className="5 flex flex-col">
          <label>plans description</label>
          <input
            defaultValue="default value"
            type="text"
            placeholder="plans description"
            name="plans-description"
            value={generalInfo?.plansDescription}
            onChange={(e) => {
              setGeneralInfo((g) => {
                return { ...g, plansDescription: e.target.value };
              });
              setEdited(true);
            }}
          />
        </div>

        <button
          disabled={!edited}
          type="submit"
          onClick={async () => {
            updateHomeGeneralInfo({
              title: gymTitle,
              description: generalInfo?.description,
              starter: generalInfo?.sentence,
              secondSentence: generalInfo?.secondSentence,
              description: generalInfo?.description
            });

            if (image)
              await fetch("/api/v1/mainimage", {
                method: "POST",
                body: image,
                headers: {
                  "Content-Type": image.type,
                },
              });
          }}
        >
          Update
        </button>
      </div>

      {/* End starter Blog */}

      {/* Start Plan Blog */}

      <div
        className={`create-plan mt-5 w-full shadow-lg overflow-hidden rounded-[30px] duration-700  ${
          planOpen ? "h-[320px]" : "h-[55px]"
        }`}
      >
        <div
          onClick={() => setPlanOpen(!planOpen)}
          className="header flex justify-between items-center mt-4 px-2 cursor-pointer"
        >
          <p className="mb-2 text-[19px]">Create plan</p>
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

          {/* <div className="plan-title flex flex-col">
            <label htmlFor="">Plans motiviting sentence</label>
            <input
              value={planSentence}
              onChange={(e) => setPlanSentence(e.target.value)}
              type="text"
              placeholder="Plan title"
            />
          </div>{" "} */}
          
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
                    duration: planDur
                  });

                  if (result === "success") {
                    setPlanTitle("");
                    setPlanDesc("");
                    setPlanPrice("");
                    setPlanDur('');
                    Swal.fire("Saved!", "", "success");
                  } else {
                    Swal.fire("Fail!", "", "error");
                  }
                } else if (result.isDenied) {
                  Swal.fire("Changes are not saved", "", "info");
                }
              });
            }}
            className={`bg-[#eee] duration-500 hover:bg-green-600 hover:text-white h-[40px] self-end rounded-[31px] text-green-500 text-[23px] shadow-2xl ${
              planDesc.length &&
              planTitle.length &&
              planPrice.length &&
              "bg-green-500 text-white"
            }`}
          >
            Create
          </button>
        </div>
      </div>

      {/*End Plan Blog */}

      {/* Start Ads Blog */}

      <div className="ads p-2 border-t-2 pt-10 border-b-2 pb-10  grid grid-cols-2 gap-7 mt-7">
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
          className=" h-[40px] mt-5"
          disabled={!edited2}
          onClick={async () => {
            updateAdsInfo({ title: adsTitle, description: adsDescription });

            if (adsImage) {
              await fetch("api/v1/adsimage", {
                method: "POST",
                body: adsImage,
                headers: {
                  "Content-Type": adsImage.type,
                },
              });
            }
          }}
        >
          Update
        </button>
      </div>

      {/* End Ads Blog */}

      {/* Start shop Blog */}

      <div className="add-product-to-shop">
        <div
          className={`create-plan mt-5 w-full shadow-lg overflow-hidden rounded-[30px] duration-700  ${
            shopOpen ? "h-[350px]" : "h-[55px]"
          }`}
        >
          <div
            onClick={() => setShopOpen(!shopOpen)}
            className="header flex justify-between items-center mt-4 px-2 cursor-pointer"
          >
            <p className="mb-2 text-[19px]">Add product</p>
            {shopOpen ? <CiSaveUp1 size={24} /> : <CiSaveDown1 size={24} />}
          </div>
          <div className="form-content w-full rounded-[30px] py-1 px-5 grid grid-cols-2 gap-7">
            <div className="product-images flex flex-col">
              <label htmlFor="product-images">Product images</label>
              <input
                type="file"
                multiple
                name=""
                id="product-images"
                onChange={(e) => {
                  setEdited2(true);
                  setProductImage(e.target.files[0]);
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
                    const result = await addHomeProduct({
                      name: productTitle,
                      description: productDesc,
                      price: productPrice,
                      marka: productMarka,
                    });

                    if (productImage) {
                      await fetch(
                        "api/v1/productimage?name=" + encodeURI(productTitle),
                        {
                          method: "POST",
                          body: productImage,
                          headers: {
                            "Content-Type": productImage.type,
                          },
                        }
                      );
                    }

                    if (result === "success") {
                      Swal.fire("Saved!", "", "success");
                      setProductDesc("");
                      setProductMarka("");
                      setProductPrice("");
                      setProductTitle("");
                      setEdited2(false);
                    } else {
                      Swal.fire("Fail!", "", "error");
                    }
                  } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                  }
                });
              }}
              className={`bg-[#eee] duration-500 hover:bg-green-600 hover:text-white h-[40px] self-end rounded-[31px] text-green-500 text-[23px] shadow-2xl ${
                productDesc.length &&
                productPrice.length &&
                productTitle.length &&
                "bg-green-500 text-white"
              }`}
            >
              Create
            </button>
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
