import React from "react";

import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdComment } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { IoMdPodium } from "react-icons/io";

const links = [
  {
    text: "หน้าแรก",
    path: ".",
    icon: <IoBarChartSharp />,
  },
  {
    text: "จัดการท่ากายภาพบำบัด",
    path: "add-posture",
    icon: <FaWpforms />,
  },
  {
    text: "all posture",
    path: "all-posture",
    icon: <MdQueryStats />,
  },
  {
    text: "จัดการกระทู้",
    path: "blogmanage",
    icon: <MdComment />,
  },
  {
    text: "จัดการการทำกายภาพบำบัด",
    path: "add-user",
    icon: <IoBarChartSharp />,
  },
  {
    text: "ดูคะแนนท่ากายภาพบำบัด",
    path: "",
    icon: <IoMdPodium />,
  },
  {
    text: "โปรไฟล์",
    path: "profile",
    icon: <ImProfile />,
  },
  {
    text: "admin",
    path: "admin",
    icon: <MdAdminPanelSettings />,
  },
  {
    text: "ออกจากระบบ",
    path: "admin",
    icon: <CiLogout />,
  },
];

export default links;
