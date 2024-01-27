"use client";
import { useEffect, useState } from "react";
import { CiSaveDown1 } from "react-icons/ci";
import { CiSaveUp1 } from "react-icons/ci";
import { getAllAnnouncments, markAsRead, getCurrentUserId } from "../api/v1/user";

function Page() {
  const [height400, setHeight400] = useState([]);
  const [dummyDate, setDummyDate] = useState([]);

  useEffect(() => {
    console.log(height400);
    getAllAnnouncments().then(v => { setDummyDate(v ?? []); });
  }, [height400]);

  async function readMessage(id, email) {
    return await markAsRead(id, email);
  }

  return (
    <>
    {dummyDate ? 
    <div className="ml-[26%] mt-10 shadow-xl rounded-[31px] m-4 min-h-[600px] overflow-hidden">
    {dummyDate.map((ele, index) => (
      <div
        key={ele.id}
        className={
          height400.includes(ele.id)
            ? "message flex border-b-2 py-4  h-auto  px-8 duration-500 bg-white z-[20]"
            : "message flex border-b-2 py-4 h-[100px] px-8 duration-500 bg-white z-[10] "
        }
      >
        <div className="flex-1 flex">
          {ele.read ? null : (
            <span onClick={async () => { const res = await readMessage(ele.id, await getCurrentUserId()); console.log("mas: "+JSON.stringify(res))}} className="  w-[198px] mr-2 h-[30px]  flex justify-center mb-0 ml-0 bg-customRed px-2 py-1 cursor-pointer text-white shadow-lg rounded-2xl mt-[24px] ">
              mark as read
            </span>
          )}
          <p className="p-4 cursor-pointer ">
            {ele.text.length > 150 &&
            height400.includes(ele.id) === false
              ? ele.text.slice(0, 150) + " ..."
              : ele.text}
          </p>
        </div>
        <p className=" w-[10%] mt-[14px] opacity-50">{new Date(ele.sent).getUTCFullYear()}</p>
        <p>
          {height400.includes(ele.id) ? (
            <CiSaveUp1
              className="opacity-70  mt-[14px] cursor-pointer"
              onClick={() => {
                const ind = height400.indexOf(ele.id);
                height400[ind] = " ";
                setHeight400([...height400]);
              }}
              size={24}
            />
          ) : (
            <CiSaveDown1
              className="opacity-70 mt-[14px]  cursor-pointer"
              size={24}
              onClick={() => {
                setHeight400([...height400, ele.id]);
              }}
            />
          )}
        </p>
      </div>
    ))}
  </div>
    :
    <>Nothing</>}
      
    </>
  );
}

export default Page;
