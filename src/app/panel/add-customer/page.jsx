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
      Swal.fire("Kaydedildi!", "", "Başarı");
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
        title: "Müşterinin bilgilerini kaydetmek istiyor musunuz?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Kaydetmek",
        denyButtonText: `Kaydetme`,
      }).then((result) => {
        if (result.isConfirmed) {
          handleCreateCustomer();
        } else if (result.isDenied) {
          Swal.fire("Değişiklikler kaydedilmedi", "", "Bilgi");
        }
      });
    } else {
      Swal.fire("Lütfen adınızı ve soyadınızı girin", "", "Hata");
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
              İptal etmek
            </button>
            <button
              onClick={handleSubmit}
              className="bg-bg_secondery shadow-sm text-white px-4 py-2 rounded-[5px]"
            >
              Müşteri oluştur
            </button>
          </div>
        </div>
        <div className="mt-12 flex w-full h-[450px] gap-3">
          {/* Left Column */}
          <div className="left w-1/2 z-30 flex flex-col gap-3">
            <div className="start-date flex-col flex">
              <label className="font-bold text-md mb-[5px]">
                Başlangıç ​​tarihi
              </label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px] outline-[#5540fb] "
                onChange={handleChange}
                name="startDate"
                type="date"
                placeholder="Start date"
              />
            </div>
            <div className="name flex-col flex">
              <label className="font-bold text-md mb-[5px]">İsim</label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px] outline-[#5540fb] "
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="İsim"
              />
            </div>
            <div className="surname flex-col flex">
              <label className="font-bold text-md mb-[5px]">Soyadı</label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px] outline-[#5540fb] "
                onChange={handleChange}
                name="surname"
                type="text"
                placeholder="Soyadı"
              />
            </div>
            <div className="age flex-col flex">
              <label className="font-bold text-md mb-[5px]">Yaş</label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px] outline-[#5540fb] "
                onChange={handleChange}
                name="age"
                type="number"
                placeholder="Yaş"
              />
            </div>
          </div>
          {/* Right Column */}
          <div className="right w-1/2 z-30 flex flex-col gap-3">
            <div className="end-date flex-col flex">
              <label className="font-bold text-md mb-[5px]">Bitiş tarihi</label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px] outline-[#5540fb] "
                onChange={handleChange}
                name="endDate"
                type="date"
                placeholder="Bitiş tarihi"
              />
            </div>
            <div className="gender flex-col flex">
              <label className="font-bold text-md mb-[5px]">Cinsiyet</label>
              <select
                className="outline-none py-2 px-3 border-2 border-red rounded-[9px] "
                onChange={handleChange}
                name="gender"
              >
                <option value="">Cinsiyet seç</option>
                <option value="Male">Erkek</option>
                <option value="Female">Dişi</option>
              </select>
            </div>
            <div className="price flex-col flex">
              <label className="font-bold text-md mb-[5px]">Kova Fiyatı</label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px] outline-[#5540fb] duration-300"
                onChange={handleChange}
                name="bucketPrice"
                type="number"
                placeholder="Kova Fiyatı"
              />
            </div>
            <div className="paid flex-col flex">
              <label className="font-bold text-md mb-[5px]">Ödeme</label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px] outline-[#5540fb] "
                onChange={handleChange}
                name="payment"
                type="number"
                placeholder="Ödenen miktar"
              />
            </div>
            <div className="money-left flex-col flex">
              <label className="font-bold text-md mb-[5px]">Kalan para</label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px] outline-[#5540fb] "
                type="text"
                value={formData.bucketPrice - formData.payment}
                disabled
                placeholder="Kalan para"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
