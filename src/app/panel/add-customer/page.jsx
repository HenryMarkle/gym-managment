"use client";
import React, { useState } from "react";
import { addCustomer } from "../../api/v1/customer";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function page() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState("");
  const [startDate, setStartdate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bucketPrice, setPucketPrice] = useState(null);
  const [payment, setPayment] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();
  async function doIt() {
    const result = await addCustomer({
      name,
      surname,
      age: Number(age),
      gender,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      bucketPrice: bucketPrice,
      payment,
    })
      .then((res) => router.replace("/panel/customers"))
      .catch((err) => console.log(err));

    console.log(result);
  }

  const createCustomer = () => {
    Swal.fire({
      title: "Do you want to save the customer?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (name.length && surname.length) {
          doIt();
          Swal.fire("Saved!", "", "success");
        } else {
          Swal.fire("Please enter name and surname", "", "error");
        }
      }
      if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <>
      <div className=" bg-bg_custom -z-40 pt-10 h-[100vh]">
        <div className="add ml-[30%] px-4 mr-[10%] shadow-sm rounded-[6px] bg-white">
          <div className="head flex justify-between items-center pt-10">
            <p className="font-bold text-[20px]">Create Customer</p>
            <div>
              <button className="mr-4 bg-white text-txt_secondery border border_primery px-4 py-2 rounded-[5px]">
                Cansel
              </button>

              <button
                onClick={() => createCustomer()}
                className="bg-bg_secondery text-white px-4 py-2 rounded-[5px]"
              >
                Create Customer
              </button>
            </div>
          </div>
          <div className="mt-12 flex w-full h-[450px] gap-3">
            <div className="left w-1/2 z-30 flex flex-col gap-3">
              <div className="start-date flex-col flex  ">
                <label className=" font-bold text-md mb-[5px]" htmlFor="">
                  Start Date
                </label>
                <input
                  className="py-2 px-3 border-2 border-red rounded-[9px]"
                  onChange={(e) => setStartdate(e.target.value)}
                  type="date"
                  placeholder="Start date"
                />
              </div>
              <div className="name flex-col flex ">
                <label className=" font-bold text-md mb-[5px]" htmlFor="">
                  Name
                </label>
                <input
                  className="py-2 px-3 border-2 border-red rounded-[9px]"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div className="surname flex-col flex">
                <label className=" font-bold text-md mb-[5px]" htmlFor="">
                  Surname
                </label>
                <input
                  className="py-2 px-3 border-2 border-red rounded-[9px]"
                  onChange={(e) => setSurname(e.target.value)}
                  type="text"
                  placeholder="Surname"
                />
              </div>
              <div className="age flex-col flex">
                <label className=" font-bold text-md mb-[5px]" htmlFor="">
                  Age
                </label>
                <input
                  className="py-2 px-3 border-2 border-red rounded-[9px]"
                  onChange={(e) => setAge(e.target.value)}
                  type="number"
                  placeholder="Age"
                />
              </div>
              <div className="gender flex-col flex">
                <label className=" font-bold text-md mb-[5px]" htmlFor="">
                  Gender
                </label>
                <select
                  onChange={(e) => setGender(e.target.value)}
                  name="gender"
                  id=""
                  className=" outline-none  py-2 px-3 border-2 border-red rounded-[9px]"
                >
                  <option value="Gender">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              {/* Duration dont forget */}
            </div>
            <div className="right z-30 w-1/2 flex flex-col gap-3">
              {" "}
              <div className="end-date flex-col flex">
                <label className=" font-bold text-md mb-[5px]" htmlFor="">
                  End Date
                </label>
                <input
                  className="py-2 px-3 border-2 border-red rounded-[9px]"
                  onChange={(e) => setEndDate(e.target.value)}
                  type="date"
                  placeholder="End date"
                />
              </div>
              <div className="price flex-col flex">
                <label className=" font-bold text-md mb-[5px]" htmlFor="pucket">
                  Pucket price
                </label>
                <input
                  className="py-2 px-3 border-2 border-red rounded-[9px]"
                  onChange={(e) => setPucketPrice(e.target.value)}
                  name="pucket-price"
                  type="number"
                  placeholder="pucket price"
                />
              </div>
              <div className="paid flex-col flex">
                <label className=" font-bold text-md mb-[5px]">Payment</label>
                <input
                  className="py-2 px-3 border-2 border-red rounded-[9px]"
                  onChange={(e) => setPayment(e.target.value)}
                  type="number"
                  name=""
                  id=""
                  placeholder="Paied"
                />
              </div>
              <div className="money-left flex-col flex">
                <label className=" font-bold text-md mb-[5px]">
                  {" "}
                  Money left
                </label>
                <input
                  className="py-2 px-3 border-2 border-red rounded-[9px]"
                  type="text"
                  value={bucketPrice - payment}
                  disabled
                  placeholder="money left"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
