import React, { useState } from "react";
import axios from "axios";
import login from "../assets/login.jpg";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const initialFormState = {
    name: "",
    address: "",
    mobile: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
    course: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialFormState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInput = (input) => {
    return input === "" ? "This field is required." : "";
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
    Object.keys(formData).forEach((key) => {
      validationErrors[key] = validateInput(formData[key]);
    });
    setErrors(validationErrors);
    if (Object.values(validationErrors).every((error) => error === "")) {
      console.log("Form submitted successfully with data:", formData);
      try {
        const response = await axios.post(
          "http://localhost:3000/register",
          formData
        );
        console.log(response.data);
        setFormData(initialFormState);
        navigate("/students");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors(initialFormState);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center mt-5">
        <div>
          <img src={login} alt="" width={400} height={400} />
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <p>{errors.name}</p>
          <input type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
          <p>{errors.address}</p>
          <input type="number"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            required
          />
          <p>{errors.mobile}</p>
          <input type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <p>{errors.email}</p>

          <input type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
            required
          />
          <p>{errors.password}</p>

          <div className="mt-3 mb-3">
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            <label className="me-2" htmlFor="male">
              Male
            </label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            <label htmlFor="female">Female</label>
          </div>

          <input type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="Date of Birth"
            required
          />
          <p>{errors.dob}</p>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            <option value="Biology">Biology</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Commerce">Commerce</option>
            <option value="Humanities">Humanities</option>
          </select>
          <p>{errors.course}</p>
          <button className="btn btn-success me-3" type="submit">Register</button>
          <button className="btn btn-danger" type="button" onClick={handleReset}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default RegisterForm;
