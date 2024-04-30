"use client";
import { notFound, useParams } from "next/navigation";
import { getCustomerById, deleteCustomerById } from "../../../api/v1/customer";
import { useRouter } from "next/navigation";
import { CiCircleRemove } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import React, { use, useEffect, useState } from "react";
import "./style.css";
import Swal from "sweetalert2";
import { Mosaic } from "react-loading-indicators";
function page() {
  const params = useParams();
  const [user, setUser] = useState({});
  const [fetchError, setFetchError] = useState(null);
  const [daysLeft, setDaysLeft] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [startedAt, setStartedAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    getCustomerById(Number(id)).then((u) => {
      setLoading(false);
      if (u == null) {
        setFetchError("notFound");
      } else if (u === "error") {
        setFetchError("error");
      } else {
        setFetchError(null);
        setUser(u ?? {});
        const formattedStartAt = new Date(u.startedAt).toLocaleDateString(
          "tr-GB"
        );
        setStartedAt(formattedStartAt);
        const formattedEndsAt = new Date(u.endsAt).toLocaleDateString("tr-GB");
        setEndsAt(formattedEndsAt);
        if (u?.startedAt && u?.endsAt) {
          const startDate = new Date(u.startedAt);
          const endDate = new Date(u.endsAt);
          const timeDifference = endDate - startDate;
          const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
          setDaysLeft(daysDifference);
        }
      }
    });
  }, [id]);

  const showAlert = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCustomerById(Number(id));
        await Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        router.push("/panel/customers");
      }
    });
  };

  const [isEditing, setIsEditing] = useState(false);
  const editing = "bg-black-200 shadow-md duration-300 p-2   mt-[2px]";

  return (
    <>
      {loading ? (
        <div className="pl-[20%] min-h-[100vh] bg-bg_custom flex  justify-center pt-20">
          <Mosaic
            color="rgb(251 107 47/ var(--tw-bg-opacity))"
            size="medium"
            text=""
            textColor=""
          />
        </div>
      ) : fetchError ? (
        <div>Not Found</div>
      ) : (
        <div className="ml-[13%] pl-24  shadow-md  min-h-[94vh] bg-bg_custom p-3">
          <div className="customer-informations ml-8 p-6 w-[95%] bg-white rounded-md mt-12 ">
            <div className="mb-4 flex justify-between">
              <p className="font-bold text-[23px]">
                Details of{" "}
                <span className="font-bold text-[23px] text-txt_primery">
                  {user.name + " " + user.surname}
                </span>
              </p>
              <div className="mr-5 flex">
                <button
                  onClick={() => showAlert(user.id)}
                  className="mr-4 bg-white text-txt_secondery shadow-sm px-4 py-2 rounded-[5px] border-[1px] border-border_secondery border-solid"
                >
                  Delete User
                </button>
                <div>
                  {isEditing ? (
                    <button className="bg-bg_secondery shadow-sm text-white px-4 py-2 rounded-[5px]">
                      Submit edits
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-bg_secondery shadow-sm text-white px-4 py-2 rounded-[5px]"
                    >
                      Edit Informations
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-baseline gap-4">
              <div className="left w-[50%] flex flex-col gap-3 justify-center">
                <div className="name  flex flex-col">
                  <span className=" text-black text-[15px] font-semibold">
                    name{" "}
                  </span>
                  <input
                    className={`duration-700 border-2 border-[#B4B4B041] ${
                      isEditing ? "bg-white py-[8px]" : "bg-[#f0f0f050]"
                    } rounded-[6px] p-1 mt-[2px] outline-[#5540fb]`}
                    type="text"
                    disabled={isEditing ? false : true}
                    defaultValue={user.name}
                    name=""
                    id=""
                  />
                </div>
                <div className="name  flex flex-col">
                  <span className="text-black text-[15px] font-semibold">
                    surname{" "}
                  </span>
                  <input
                    className={`duration-700 border-2 border-[#B4B4B041] ${
                      isEditing ? "bg-white py-[8px]" : "bg-[#f0f0f050]"
                    } rounded-[6px] p-1 mt-[2px] outline-[#5540fb]`}
                    type="text"
                    defaultValue={user.surname}
                    disabled={isEditing ? false : true}
                  />
                </div>
                <div className="name  flex flex-col">
                  <span className=" text-black text-[15px] font-semibold">
                    age{" "}
                  </span>
                  <input
                    className={`duration-700 border-2 border-[#B4B4B041] ${
                      isEditing ? "bg-white py-[8px]" : "bg-[#f0f0f050]"
                    } rounded-[6px] p-1 mt-[2px] outline-[#5540fb]`}
                    type="text"
                    defaultValue={user.age}
                    disabled={isEditing ? false : true}
                  />
                </div>
                <div className="name  flex flex-col">
                  <span className=" text-black text-[15px] font-semibold">
                    price{" "}
                  </span>
                  <input
                    className={`duration-700 border-2 border-[#B4B4B041] ${
                      isEditing ? "bg-white py-[8px]" : "bg-[#f0f0f050]"
                    } rounded-[6px] p-1 mt-[2px] outline-[#5540fb]`}
                    type="text"
                    defaultValue={user.bucketPrice}
                    disabled={isEditing ? false : true}
                  />
                </div>
                <div className="name  flex flex-col">
                  <span className=" text-black text-[15px] font-semibold">
                    paid{" "}
                  </span>
                  <input
                    className={`duration-700 border-2 border-[#B4B4B041] ${
                      isEditing ? "bg-white py-[8px]" : "bg-[#f0f0f050]"
                    } rounded-[6px] p-1 mt-[2px] outline-[#5540fb]`}
                    type="text"
                    defaultValue={user.paymentAmount}
                    disabled={isEditing ? false : true}
                  />
                </div>
              </div>
              <div className="right w-[50%]  flex flex-col  gap-3 justify-center">
                <div className="name  flex flex-col">
                  <span className=" text-black text-[15px] font-semibold">
                    started at{" "}
                  </span>
                  <input
                    className={`duration-700 border-2 border-[#B4B4B041] ${
                      isEditing ? "bg-white py-[8px]" : "bg-[#f0f0f050]"
                    } rounded-[6px] p-1 mt-[2px] outline-[#5540fb]`}
                    hidden={!user?.startedAt}
                    type={"text"}
                    disabled={isEditing ? false : true}
                    defaultValue={startedAt}
                  />
                </div>
                <div className="name  flex flex-col">
                  <span className=" text-black text-[15px] font-semibold">
                    end at{" "}
                  </span>
                  <input
                    className={`duration-700 border-2 border-[#B4B4B041] ${
                      isEditing ? "bg-white py-[8px]" : "bg-[#f0f0f050]"
                    } rounded-[6px] p-1 mt-[2px] outline-[#5540fb]`}
                    type={"text"}
                    hidden={!user?.endsAt}
                    defaultValue={endsAt}
                    disabled={isEditing ? false : true}
                  />
                </div>
                <div className="name  flex flex-col">
                  <span className=" text-black text-[15px] font-semibold">
                    Days left{" "}
                  </span>
                  <input
                    className={`duration-700 border-2 border-[#B4B4B041] ${
                      isEditing ? "bg-white py-[8px]" : "bg-[#f0f0f050]"
                    } rounded-[6px] p-1 mt-[2px] outline-[#5540fb]`}
                    type="text"
                    value={daysLeft !== null ? daysLeft : ""}
                    disabled={isEditing ? false : true}
                  />
                </div>
                <div className="name  flex flex-col">
                  <span className=" text-black text-[15px] font-semibold">
                    gender{" "}
                  </span>
                  <input
                    className={`duration-700 border-2 border-[#B4B4B041] ${
                      isEditing ? "bg-white py-[8px]" : "bg-[#f0f0f050]"
                    } rounded-[6px] p-1 mt-[2px] outline-[#5540fb]`}
                    type="text"
                    disabled={isEditing ? false : true}
                    defaultValue={user.gender}
                    name=""
                    id=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default page;
