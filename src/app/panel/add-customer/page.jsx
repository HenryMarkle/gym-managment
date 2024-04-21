"use client";
import React, { useState } from "react";
import { addCustomer } from "../../api/v1/customer";
import "./main.css";
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
      <div className="bg-gray-100 -z-40 h-[100vh]">
        <div className="add ml-[30%]  flex justify-between px-4  mr-[10%] shadow-xl rounded-[31px]">
          <div className="mt-12 flex justify-between w-full">
            <div className="left w z-30">
              <div className="start-date flex-col flex">
                <label htmlFor="">Start Date</label>
                <input
                  onChange={(e) => setStartdate(e.target.value)}
                  type="date"
                  placeholder="Start date"
                />
              </div>
              <div className="name flex-col flex ">
                <label htmlFor="">Name</label>
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div className="surname flex-col flex">
                <label htmlFor="">Surname</label>
                <input
                  onChange={(e) => setSurname(e.target.value)}
                  type="text"
                  placeholder="Surname"
                />
              </div>
              <div className="age flex-col flex">
                <label htmlFor="">Age</label>
                <input
                  onChange={(e) => setAge(e.target.value)}
                  type="number"
                  placeholder="Age"
                />
              </div>
              <div className="gender flex-col flex">
                <label htmlFor="">Gender</label>
                <select
                  onChange={(e) => setGender(e.target.value)}
                  name="gender"
                  id=""
                  className=" outline-none rounded-xl"
                >
                  <option value="Gender">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              {/* Duration dont forget */}
            </div>
            <div className="right z-30">
              {" "}
              <div className="end-date flex-col flex">
                <label htmlFor="">End Date</label>
                <input
                  onChange={(e) => setEndDate(e.target.value)}
                  type="date"
                  placeholder="End date"
                />
              </div>
              <div className="price flex-col flex">
                <label htmlFor="pucket">Pucket price</label>
                <input
                  onChange={(e) => setPucketPrice(e.target.value)}
                  name="pucket-price"
                  type="number"
                  placeholder="pucket price"
                />
              </div>
              <div className="paid flex-col flex">
                <label>Payment</label>
                <input
                  onChange={(e) => setPayment(e.target.value)}
                  type="number"
                  name=""
                  id=""
                  placeholder="Paied"
                />
              </div>
              <div className="money-left flex-col flex">
                <label> Money left</label>
                <input
                  type="text"
                  value={bucketPrice - payment}
                  disabled
                  placeholder="money left"
                />
              </div>
              <button
                disabled={false}
                onClick={() => createCustomer()}
                className={`mt-[25px] px-9 w-full py-2 rounded-xl bg-customRed text-white font-bold text-[18px]`}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
