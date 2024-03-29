import React from "react";
import Patient from "./Patient";
import Wrapper from "../wrappers/PatientsContainer";
import { useAllPatientContext } from "../../pages/AllPatient";

const PatientsContainer = () => {
  const { data } = useAllPatientContext();

  // ตรวจสอบว่า data ไม่เป็น null หรือ undefined ก่อนที่จะ destructuring
  if (!data) {
    return (
      <Wrapper>
        <h2>Loading...</h2>
      </Wrapper>
    );
  }

  // destructuring allusers ซึ่งเป็น array ของ patients จาก data
  const { allusers: patients } = data;

  // ตรวจสอบว่า patients มีค่าและมีความยาวมากกว่า 0 ก่อนที่จะแสดงผู้ป่วย
  if (!patients || patients.length === 0) {
    return (
      <Wrapper>
        <h2>No patients to display...</h2>
      </Wrapper>
    );
  }

  // หากมีผู้ป่วย ให้แสดงรายการผู้ป่วย
  return (
    <Wrapper>
      <div className="patients">
        {patients.map((patient) => {
          return <Patient key={patient.idPatient} {...patient} />;
        })}
      </div>
    </Wrapper>
  );
};



export default PatientsContainer;
