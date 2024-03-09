import React, { useState } from "react";
import { CiSaveDown1 } from "react-icons/ci";
import { CiSaveUp1 } from "react-icons/ci";
function Exercises() {
  const [sectionOpen, setSectionOpen] = useState(false);
  const [exercisesOpen, setExercisesOpen] = useState(false);
  return (
    <>
      <div>
        <p className="font-bold text-center text-2xl mb-2 ">Exercises</p>
        {/* Start section blog */}
        <div
          className={` shadow-lg p-2  rounded-md overflow-hidden ${
            sectionOpen ? "h-[max]" : "h-[40px]"
          }`}
        >
          <div
            onClick={() => setSectionOpen(!sectionOpen)}
            className="flex justify-between items-center"
          >
            <p className="font-bold text-xl">Sections</p>
            <span>
              <CiSaveDown1 size={23} />
            </span>
          </div>
          <div className="flex flex-wrap gap-4 pb-10">
            <div className="create-section mt-10 p-3 shadow-md w-1/3 rounded-md border-r-2 mr-20 mb-4 ">
              <p className="font-bold text-center mb-4">Create section</p>
              <p className="font-bold mb-2">Sectio name</p>
              <input
                className="w-full"
                type="text"
                name=""
                id=""
                placeholder="Section name"
              />
              <p className="font-bold mt-4 mb-2">Sectio image</p>
              <input type="file" className=" w-full" />
              <button className=" bg-green-700 text-white px-4 py-2 mt-4 rounded-md mx-auto w-full my-0 ">
                Crete section
              </button>
            </div>
            <div className="sction w-1/6 shadow-md px-4">
              <p className="font-bold text-center mb-2">Section name</p>
              <img
                src="https://image-prod.iol.co.za/resize/640x64000/?source=https://xlibris.public.prod.oc.inl.infomaker.io:8443/opencontent/objects/47e4c8ec-2500-58d9-a698-e8d54f04be98&operation=CROP&offset=0x0&resize=1080x1350&webp=true"
                alt=""
              />
            </div>{" "}
            <div className="sction w-1/6 shadow-md px-4">
              <p className="font-bold text-center mb-2">Section name</p>
              <img
                src="https://image-prod.iol.co.za/resize/640x64000/?source=https://xlibris.public.prod.oc.inl.infomaker.io:8443/opencontent/objects/47e4c8ec-2500-58d9-a698-e8d54f04be98&operation=CROP&offset=0x0&resize=1080x1350&webp=true"
                alt=""
              />
            </div>{" "}
            <div className="sction w-1/6 shadow-md px-4">
              <p className="font-bold text-center mb-2">Section name</p>
              <img
                src="https://image-prod.iol.co.za/resize/640x64000/?source=https://xlibris.public.prod.oc.inl.infomaker.io:8443/opencontent/objects/47e4c8ec-2500-58d9-a698-e8d54f04be98&operation=CROP&offset=0x0&resize=1080x1350&webp=true"
                alt=""
              />
            </div>{" "}
            <div className="sction w-1/6 shadow-md px-4">
              <p className="font-bold text-center mb-2">Section name</p>
              <img
                src="https://image-prod.iol.co.za/resize/640x64000/?source=https://xlibris.public.prod.oc.inl.infomaker.io:8443/opencontent/objects/47e4c8ec-2500-58d9-a698-e8d54f04be98&operation=CROP&offset=0x0&resize=1080x1350&webp=true"
                alt=""
              />
            </div>{" "}
            <div className="sction w-1/6 shadow-md px-4">
              <p className="font-bold text-center mb-2">Section name</p>
              <img
                src="https://image-prod.iol.co.za/resize/640x64000/?source=https://xlibris.public.prod.oc.inl.infomaker.io:8443/opencontent/objects/47e4c8ec-2500-58d9-a698-e8d54f04be98&operation=CROP&offset=0x0&resize=1080x1350&webp=true"
                alt=""
              />
            </div>{" "}
            <div className="sction w-1/6 shadow-md px-4">
              <p className="font-bold text-center mb-2">Section name</p>
              <img
                src="https://image-prod.iol.co.za/resize/640x64000/?source=https://xlibris.public.prod.oc.inl.infomaker.io:8443/opencontent/objects/47e4c8ec-2500-58d9-a698-e8d54f04be98&operation=CROP&offset=0x0&resize=1080x1350&webp=true"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* Start Exercises blog */}

        <div
          className={`Exercises shadow-lg p-2 rounded-md mt-6 ${
            exercisesOpen ? "h-[auto]" : "h-[45px]"
          }`}
        >
          <div
            onClick={() => setExercisesOpen(!sectionOpen)}
            className="flex justify-between items-center"
          >
            <p className="font-bold text-xl">Exercises</p>
            <span>
              <CiSaveDown1 size={23} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Exercises;
