"use client";
import React, { useEffect, useState } from "react";
import "./dashboard.css";
import {
  getHomeGeneralInfo,
  getAdsInfo,
  updateAdsInfo,
} from "../../api/v1/dashboard";
import StarterS from "../../../components/website/components/starterS";
// Firebase

import storage from "../../api/v1/firebase";
import { listAll, ref, uploadBytes, deleteObject } from "firebase/storage";
import Swal from "sweetalert2";

export default function HomePage() {
  const [edited2, setEdited2] = useState(false);
  const [gymTitle, setGymTitle] = useState("");
  const [generalInfo, setGeneralInfo] = useState(null);

  const [adsTitle, setAdsTitle] = useState("");
  const [adsDescription, setAdsDescription] = useState("");

  const [image, setImage] = useState(null);
  const [adsImage, setAdsImage] = useState(null);

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
      <div className="mb-20">
        <StarterS />
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
                        ? image?.name?.substring(
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
                      Swal.fire("Saved!", "", "success");
                    }
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
      </div>
    </>
  );
}
