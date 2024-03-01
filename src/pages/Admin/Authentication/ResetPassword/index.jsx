import React from "react";
import { Button } from "../../../../components";

const AdminResetPasswordComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen px-3 m-auto sm:px-0 max-w-25">
      <a href="/">
        <img
          src="/images/assets/logo.svg"
          className="mx-auto mb-15"
          alt="Al-Ihsan Foundation"
        />
      </a>
      <h1 className="mb-10 text-center text-heading-5 md:text-heading-4 text-neutral-900">
        Reset Your Password
      </h1>
      <form className="w-full">
        <div className="flex flex-col mb-7.5 form-group">
          <label htmlFor="emailAddress" className="sr-only">
            Email Address
          </label>
          <input
            type="text"
            value=""
            name="email"
            className="w-full bg-white form-control"
            id="emailAddress"
            placeholder="Email Address"
          />
        </div>
        <Button
          className="w-full btn btn-primary"
          variant=""
          type="submit"
          label={"Reset Password"}
        />
      </form>
    </div>
  );
};

export default AdminResetPasswordComponent;
