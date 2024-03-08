import React, { useState } from "react";

const FormRowMultiSelect = ({ name, labelText, options, onChange = "", defaultValue = [] }) => {
  const [selectedPostures, setSelectedPostures] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);


  const handleCheckboxChange = (e, option) => {
    let updatedSelectedPostures;
    if (option === "ท่าทั้งหมด") {
      if (e.target.checked) {
        updatedSelectedPostures = options.filter((opt) => opt !== "ท่าทั้งหมด");
      } else {
        updatedSelectedPostures = [];
      }
    } else {
      if (e.target.checked) {
        updatedSelectedPostures = [...selectedPostures, option];
      } else {
        updatedSelectedPostures = selectedPostures.filter(
          (posture) => posture !== option
        );
      }
    }

    setSelectedPostures(updatedSelectedPostures);

    // เรียกใช้งานฟังก์ชัน onChange เพื่อส่งข้อมูลที่เลือกไปยังองค์ประกอบที่ใช้งาน
    onChange(updatedSelectedPostures);
  };

  return (
    <div className="form-row">
      <label className="form-label">{labelText || name}</label>
      <div className={`dropdown${isOpen ? " open" : ""}`}>
        <div
          className={`dropdown-menu${isOpen ? " show" : ""}`}
          style={{
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {options.map((option, index) => (
            <div key={index} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={option}
                checked={selectedPostures.includes(option)}
                onChange={(e) => handleCheckboxChange(e, option)}
                name={name} // เพิ่ม name เพื่อส่งข้อมูลให้กับฟอร์ม
              />
              <label className="form-check-label">{option}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormRowMultiSelect;
