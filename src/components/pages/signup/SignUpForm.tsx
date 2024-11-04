"use client";

import PasswordField from "@/components/shared/PasswordField";
import Link from "next/link";
import { useState } from "react";

const SignUpForm = () => {
  // Step 1: Set up state for form inputs
  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    username: "",
    email: "",
    password: "",
    password_confirm: ""
  });

  function setPassword (password: string) {

    setFormData({
      ...formData,
      password: password, 
      password_confirm: password
    });
  }

  // Step 2: Handle input changes
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Step 3: Update the submit handler to handle form submission
  const loging = (e:any) => {
    e.preventDefault(); // Prevent the default form submission
    console.log(formData);
    
    fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify(formData), // Send form data as JSON
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        if (data.status_code === 201) {
          // Redirect to login
        } else {
          alert(data.message)
        }
        // Handle success (e.g., redirect the user or display a success message)
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error (e.g., display an error message)
      });
  };

  return (
    <section className="signin__section pr-24 pl-24 pb-80">
      <div className="container">
        <div className="row g-4 justify-content-center">
          <div className="col-lg-6">
            <div className="event__createcover checkout__wrapper">
              <h3 className="white text-center mb-30">Sign Up</h3>
              <form onSubmit={loging} className="cover__form">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="cover__grp">
                      <label
                        htmlFor="first_name"
                        className="mb-16 fs-18 d-block fw-500 white bodyfont"
                      >
                        First Name <span className="base2">*</span>
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name" // Use name attribute to identify input
                        placeholder="First_Name"
                        value={formData.first_name} // Set the input value
                        onChange={handleInputChange} // Attach change handler
                      />
                    </div>

                    <div className="cover__grp">
                      <label
                        htmlFor="last_name"
                        className="mb-16 fs-18 d-block fw-500 white bodyfont"
                      >
                        Last Name <span className="base2">*</span>
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name" // Use name attribute to identify input
                        placeholder="Last Name"
                        value={formData.last_name} // Set the input value
                        onChange={handleInputChange} // Attach change handler
                      />
                    </div>

                    <div className="cover__grp">
                      <label
                        htmlFor="namess"
                        className="mb-16 fs-18 d-block fw-500 white bodyfont"
                      >
                        username <span className="base2">*</span>
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username" // Use name attribute to identify input
                        placeholder="Username"
                        value={formData.username} // Set the input value
                        onChange={handleInputChange} // Attach change handler
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="cover__grp">
                      <label
                        htmlFor="eemail"
                        className="mb-16 fs-18 d-block fw-500 white bodyfont"
                      >
                        Email Address <span className="base2">*</span>
                      </label>
                      <input
                        type="email"
                        id="eemail"
                        name="email" // Use name attribute to identify input
                        placeholder="Email"
                        value={formData.email} // Set the input value
                        onChange={handleInputChange} // Attach change handler
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <PasswordField sendToParent={ setPassword } />
                  </div>
                  {/* <div className="col-lg-12">
                    <PasswordField sendToParent={ setPassword } />
                  </div> */}
                  <div className="col-lg-12">
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                      <div className="pay__check remember__radio mb-16 d-flex align-items-center gap-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label mt-1 fs-16 fw-400 bodyfont pra"
                          htmlFor="flexCheckDefault"
                        >
                          Remember me
                        </label>
                      </div>
                      <Link href="#0" className="base fs-14 fw-500 bodyfont">
                        Forget Password?
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="cover__grp mb-30 sign__inbtn">
                      <button
                        type="submit"
                        aria-label="submit button"
                        className="cmn--btn d-block w-100"
                      >
                        <span>Sign Up Now</span>
                      </button>
                    </div>
                    <p className="ffs-16 text-center bodyfont pra fw-500">
                      Don’t have an account?{" "}
                      <Link href="signin" className="base">
                        Sign In now!
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
