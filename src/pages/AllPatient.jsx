import React, { useContext, createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch.js";
import PatientsContainer from "../assets/components/PatientsContainer.jsx";
import SearchContainer from "../assets/components/SearchContainer.jsx";
import { useLoaderData } from "react-router-dom";

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get("/allusers");
    return {
      data,
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllPatientContext = createContext();

const AllPatient = () => {
  const { data } = useLoaderData();

  useEffect(() => {
    // ตรวจสอบว่ามีข้อมูลผู้ป่วยหรือไม่
    if (data && data.allusers) {
      // หากมีข้อมูลผู้ป่วย ให้ทำตามปกติ
      console.log(data.allusers);
    } else {
      // หากไม่มีข้อมูลผู้ป่วย ให้แสดงข้อความว่า No patients to display
      console.log("No patients to display");
    }
  }, [data]);

  return (
    <AllPatientContext.Provider value={{ data }}>
      <SearchContainer />
      <PatientsContainer />
    </AllPatientContext.Provider>
  );
};

export const useAllPatientContext = () => useContext(AllPatientContext);

export default AllPatient;
