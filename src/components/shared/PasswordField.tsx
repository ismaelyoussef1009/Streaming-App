"use client";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";

const PasswordField = (parent: any) => {
  const [passwordField, setPasswordField] = useState(true);
  const [password, setPassword] = useState();
  function sendToParent (e: any) {
    const { value } = e.target;
    setPassword(value);
    parent.sendToParent(password)
  }

  return (
    <div className="cover__grp inputPassword">
      <label
        htmlFor="phones"
        className="mb-16 fs-18 d-block fw-500 white bodyfont"
      >
        Password <span className="base2">*</span>
      </label>
      <input
        className="inputPassword"
        type={passwordField ? "password" : "text"}
        id="phones"
        placeholder="Type Your Password"
        value={password}
        onChange={sendToParent}
      />
      <div className="toggle-icon">
        {passwordField ? (
          <IconEyeOff onClick={() => setPasswordField(!passwordField)} />
        ) : (
          <IconEye onClick={() => setPasswordField(!passwordField)} />
        )}
      </div>
    </div>

    
  );
};

export default PasswordField;
