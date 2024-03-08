import React, { useState } from "react";
import {
  FormRow,
  FormRowSelect,
  FormRowMultiSelect,
} from "../assets/components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { CHOOSEPOSTURES, TYPEPOSTURES, TYPESTATUS } from "../../../utils/constants";
import {
  Form,
  redirect,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
// import { checkIdPatientDuplicate } from "../../../middleware/validationMiddleware";

const isIdPatientDuplicate = async (idPatient) => {
  try {
    const response = await customFetch.get(`/allusers?idPatient=${idPatient}`);
    return response.data.length > 0; // หากมีหมายเลขผู้ป่วยที่ซ้ำกันอยู่ในฐานข้อมูล จะคืนค่า true
  } catch (error) {
    console.error("Error checking duplicate idPatient:", error);
    return false; // หากเกิดข้อผิดพลาดในการเชื่อมต่อกับ API หรือไม่พบข้อมูล จะคืนค่า false
  }
};

export const action = async ({ request }) => {
  try {
    const formData = new FormData();
    const data = await request.formData();
    const idPatient = data.get("idPatient");
    const namePatient = data.get("namePatient");
    const userType = data.get("userType");
    const userPosts = data.getAll("userPosts");
    const userStatus = data.get("userStatus");

    // ตรวจสอบว่าหมายเลขผู้ป่วยซ้ำกันหรือไม่
    const isDuplicate = await isIdPatientDuplicate(idPatient);
    if (isDuplicate) {
      toast.error("หมายเลขผู้ป่วยซ้ำกัน โปรดเลือกหมายเลขอื่น");
      return null; // หยุดการส่งข้อมูลถ้าหมายเลขผู้ป่วยซ้ำกัน
    }

    // ตรวจสอบว่าหมายเลขผู้ป่วยเป็นตัวเลขหรือไม่
    if (!/^[0-9]+$/.test(idPatient)) {
      toast.error("หมายเลขผู้ป่วยต้องเป็นตัวเลขเท่านั้น");
      return null; // หยุดการส่งข้อมูลถ้าหมายเลขผู้ป่วยไม่ใช่ตัวเลข
    }

    // เพิ่มข้อมูลจาก FormData ลงใน formData
    for (const [key, value] of data.entries()) {
      formData.append(key, value);
    }

    const patientData = {
      idPatient: idPatient,
      namePatient: namePatient,
      userType: userType,
      userPosts: userPosts,
      userStatus: userStatus,
    };

    console.log("Sending request:", patientData);
    await customFetch.post("/allusers", patientData);
    toast.success("เพิ่มข้อมูลคนไข้เรียบร้อยแล้ว");
    return redirect("/dashboard/all-patient");
    return null;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddUser = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [selectedUserType, setSelectedUserType] = useState(TYPEPOSTURES.TYPE_1);
  const [selectedUserPosts, setSelectedUserPosts] = useState([]);
  const [selectedUserStatus, setSelectedUserStatus] = useState(TYPESTATUS.TYPE_ST1);

  const handleUserTypeChange = (event) => {
    setSelectedUserType(event.target.value);
    setSelectedUserStatus(event.target.value);
  };

  const handleUserPostsChange = (selectedOptions) => {
    setSelectedUserPosts(selectedOptions);
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">เพิ่มข้อมูลคนไข้</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="idPatient"
            labelText="หมายเลขผู้ป่วย"
            pattern="[0-9]*"
          />
          <FormRow type="text" name="namePatient" labelText="ชื่อผู้ป่วย" />

          <FormRowSelect
            labelText="ชื่อประเภทของท่ากายภาพบำบัด"
            name="userType"
            value={selectedUserType}
            onChange={handleUserTypeChange}
            list={Object.values(TYPEPOSTURES)}
          />

          <FormRowSelect
            labelText="เลือกสถานะปัจจุบันของคนไข้"
            name="userStatus"
            value={selectedUserStatus}
            onChange={handleUserTypeChange}
            list={Object.values(TYPESTATUS)}
          />

          <FormRowMultiSelect
            name="userPosts"
            labelText="เลือกท่ากายภาพบำบัด"
            options={CHOOSEPOSTURES}
            value={selectedUserPosts}
            onChange={handleUserPostsChange}
          />

          {/* <br /> */}
          <button
            type="submit"
            className="btn btn-block form-btn "
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddUser;
