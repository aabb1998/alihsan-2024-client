import React from "react";
import { Button } from "../../components";
import Img from "../../components/Image";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen px-5 sm:px-10 py-15">
        <div className="flex items-center justify-center w-full h-auto p-5 sm:h-full bg-neutral-200 rounded-xl">
          <div className="flex flex-col items-center justify-center">
            <div className="w-48 h-48 sm:w-[17.125rem] sm:h-[16.375rem] overflow-hidden mb-6">
              <Img
                src={`../images/401-error.svg`}
                className="object-cover w-full h-full"
                alt="error"
              />
            </div>

            <h5 className="mb-2 text-heading-6">Unauthenticated</h5>
            <p className="text-md text-neutral-700 mb-7.5 text-center w-55">
              Authorization required to get the access.
            </p>
            <Button
              variant={"primaryFull"}
              label={"Back to Home"}
              onClick={() => navigate("/login")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;
