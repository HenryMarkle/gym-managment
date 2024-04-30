// 👇 those icons are for the sidebar windows

import { BsCalendar2EventFill } from "react-icons/bs";
import { TiWorld } from "react-icons/ti";
import { BsFillPersonFill } from "react-icons/bs";
import { FaHome, FaClipboardList } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

// 👇 this data is for the sidebar

export const windows = [
  {
    id: 1,
    to: "/panel",
    title: "Home",
    icon: <FaHome size="23px" />,
    active: true,
  },
  {
    id: 2,
    to: "/panel/dashboard",
    title: "Web sitesi",
    icon: <TiWorld size="23px" />,
    active: false,
  },
  {
    id: 3,
    to: "/panel/add-customer",
    title: "Müşteri oluştur",
    icon: <IoIosAddCircle size="23px" />,
    active: false,
  },
  {
    id: 4,
    to: "/panel/customers",
    active: false,
    title: "Müşteriler",
    icon: <FaClipboardList size="23px" />,
  },
  {
    id: 5,
    to: "/panel/add-manager",
    title: "Yönetici Oluştur",
    active: false,
    icon: <IoIosAddCircle size="23px" />,
  },
  {
    id: 6,
    to: "/panel/managers",
    title: "Yöneticiler",
    active: false,
    icon: <BsFillPersonFill size="23px" />,
  },
  {
    id: 7,
    to: "/panel/events",
    active: false,
    title: "Olaylar",
    icon: <BsCalendar2EventFill size="23px" />,
  },
];

// 👇 This data is for the dashboard (the one where user manage his website) .

export const headerData = [
  { id: 1, title: "Home", to: "/panel/dashboard" },
  {
    id: 2,
    title: "Market ",
    to: "/panel/dashboard/market",
    active: false,
  },
  {
    id: 3,
    title: "Plans",
    to: "/panel/dashboard/plans",
    active: false,
  },
  {
    id: 4,
    title: "Exercises ",
    to: "/panel/dashboard/exercises",
    active: false,
  },
  {
    id: 5,
    title: "Managers",
    to: "/panel/dashboard/managers",
    active: false,
  },
];

// 👇 This data is for the rightSideStats (for filtering the income) + for the chart .

export const months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];
