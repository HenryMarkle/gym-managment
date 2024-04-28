"use client";
import React, { useState } from "react";
import { addCustomer } from "../../api/v1/customer";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function Page() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    age: null,
    gender: "",
    startDate: null,
    endDate: null,
    bucketPrice: null,
    payment: 0,
  });

  // const [disabled, setDisabled] = useState(true);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateCustomer = async () => {
    const result = await addCustomer({
      ...formData,
      age: Number(formData.age),
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      bucketPrice: Number(formData.bucketPrice),
    }).catch((err) => console.log(err));

    if (result) {
      router.replace("/panel/customers");
      Swal.fire("Saved!", "", "success");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const validateForm = () => {
    const { name, surname } = formData;
    return name.length && surname.length;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Swal.fire({
        title: "Do you want to save the customer?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          handleCreateCustomer();
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      Swal.fire("Please enter name and surname", "", "error");
    }
  };

  return (
    <div className="bg-bg_custom pt-10 h-[100vh]">
      <div className="add ml-[30%] px-4 mr-[10%] shadow-sm rounded-[6px] bg-white">
        <div className="head flex justify-between items-center pt-10">
          <p className="font-bold text-[20px]">Create Customer</p>
          <div>
            <button
              onClick={handleCancel}
              className="mr-4 bg-white text-txt_secondery shadow-sm px-4 py-2 rounded-[5px] border-[1px] border-border_secondery border-solid"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-bg_secondery shadow-sm text-white px-4 py-2 rounded-[5px]"
            >
              Create Customer
            </button>
          </div>
        </div>
        <div className="mt-12 flex w-full h-[450px] gap-3">
          {/* Left Column */}
          <div className="left w-1/2 z-30 flex flex-col gap-3">
            <div className="start-date flex-col flex">
              <label className="font-bold text-md mb-[5px]">Start Date</label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px]"
                onChange={handleChange}
                name="startDate"
                type="date"
                placeholder="Start date"
              />
            </div>
            <div className="name flex-col flex">
              <label className="font-bold text-md mb-[5px]">Name</label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px]"
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Name"
              />
            </div>
            <div className="surname flex-col flex">
              <label className="font-bold text-md mb-[5px]">Surname</label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px]"
                onChange={handleChange}
                name="surname"
                type="text"
                placeholder="Surname"
              />
            </div>
            <div className="age flex-col flex">
              <label className="font-bold text-md mb-[5px]">Age</label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px]"
                onChange={handleChange}
                name="age"
                type="number"
                placeholder="Age"
              />
            </div>
          </div>
          {/* Right Column */}
          <div className="right w-1/2 z-30 flex flex-col gap-3">
            <div className="end-date flex-col flex">
              <label className="font-bold text-md mb-[5px]">End Date</label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px]"
                onChange={handleChange}
                name="endDate"
                type="date"
                placeholder="End date"
              />
            </div>
            <div className="gender flex-col flex">
              <label className="font-bold text-md mb-[5px]">Gender</label>
              <select
                className="outline-none py-2 px-3 border-2 border-red rounded-[9px]"
                onChange={handleChange}
                name="gender"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="price flex-col flex">
              <label className="font-bold text-md mb-[5px]">Bucket Price</label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px]"
                onChange={handleChange}
                name="bucketPrice"
                type="number"
                placeholder="Bucket price"
              />
            </div>
            <div className="paid flex-col flex">
              <label className="font-bold text-md mb-[5px]">Payment</label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px]"
                onChange={handleChange}
                name="payment"
                type="number"
                placeholder="Paid"
              />
            </div>
            <div className="money-left flex-col flex">
              <label className="font-bold text-md mb-[5px]">Money Left</label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px]"
                type="text"
                value={formData.bucketPrice - formData.payment}
                disabled
                placeholder="Money left"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
