import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import Wrapper from "../wrappers/Patient";
import PatientInfo from "./PatientInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Patient = ({ _id, idPatient, namePatient, userType, userStatus, createdAt }) => {
  // แสดงเฉพาะ 8 ตัวแรกของ idPatient และเปลี่ยนตัวอักษรที่เหลือเป็น "x"
  const formattedIdPatient = idPatient.slice(0, 8) + "x".repeat(6);

  const date = day(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{namePatient.charAt(0)}</div>
        <div className="info">
          <h5>{namePatient}</h5>
          <p>{formattedIdPatient}</p> {/* แสดง idPatient ที่ผ่านการจัดรูปแบบ */}
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <PatientInfo icon={<FaLocationArrow />} text={userType} />
          <div className={`status status-${userStatus.replace(/\s/g, "-")}`}>
            {userStatus}
          </div>
        </div>

        <footer className="actions">
          <Link to={`../edit-patient/${_id}`} className="btn edit-btn">
            แก้ไข
          </Link>
          <Form method="post" action={`../delete-patient/${_id}`}>
            <button type="submit" className="btn delete-btn">
              ลบ
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Patient;
