import React from "react";
import InputField from "../components/InputField";
const WorkExperience = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Work Experience</h4>
      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="experienceLevel"
            value=""
            onChange={handleChange}
          />
          <span className="checkmark"></span>Any experience
        </label>
        <InputField
          handleChange={handleChange}
          value="Internship"
          title="Internship"
          name="experienceLevel"
        />
        <InputField
          handleChange={handleChange}
          value="Work remotely"
          title="Work remotely"
          name="experienceLevel"
        />
        {/* <InputField
          handleChange={handleChange}
          value="madrid"
          title="Madrid"
          name="location"
        />
        <InputField
          handleChange={handleChange}
          value="boston"
          title="Boston"
          name="location"
        /> */}
      </div>
    </div>
  );
};

export default WorkExperience;
