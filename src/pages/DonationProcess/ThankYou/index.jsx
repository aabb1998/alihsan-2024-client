import React, { useEffect, useState } from "react";
import { getProfile } from "../../../features/authentication/authenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon2,
} from "../../../theme/svg-icons";
import { StepperThankYou } from "../Common/Stepper/StepperThankYou";
import { useLocation } from "react-router-dom";
import { updatePaypalToken } from "../../../features/paymentDetails/paymentDetailsSlice";
import { SnackMessages } from "../../../components/Toast";
import Loader from "../../../components/Loader";
import { getBasketItems } from "../../../features/basket/basketSlice";

const retrieveUserInfo = () => {
  const isLoggedIn = localStorage.getItem("loggedIn");
  return isLoggedIn
    ? JSON.parse(isLoggedIn)
    : { token: null, role: null, id: null };
};
const ThankYouComponent = () => {
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tokenValue = queryParams.get("token");
  const { role,id } = retrieveUserInfo();

  const profile = useSelector((state) => state.profile);
  const url = process.env.REACT_APP_URL;
  const message =
    'I just donated to charity, you can too!\n\n"Spend (on charity), o sun of Adam, and I shall spend on you"\n- Allah';

  const paypalTokenAction = async (tokenValue) => {
    setLoading(true);
    if (role === "USER") {
    }
    const response = await dispatch(
      updatePaypalToken({
        orderId: tokenValue,
        userId: role === "USER" ? id : null,
      })
    );
    if (response.payload.success) {
      setLoading(false);
      dispatch(getBasketItems())
      showSuccessMessage(response.payload.message);
    } else {
      setLoading(false);
      showErrorMessage(response.payload.message);
    }
  };
  useEffect(() => {
    localStorage.removeItem("checkout");
    localStorage.removeItem("personalInfo");
    dispatch(getBasketItems())
    if (!profile.email && !profile.isFetching && !profile.isError)
      dispatch(getProfile());
  }, [profile]);

  useEffect(() => {
    if (tokenValue) {
      paypalTokenAction(tokenValue);
    }
  }, [tokenValue]);

  return (
    <div>
      <div className="py-7.5 md:py-15">
        <section>
          <div className="pb-5 md:pb-15">
            <StepperThankYou />
          </div>
          <div className="container">
            <div className="flex flex-col items-center justify-center px-8 py-20 rounded-2xl bg-neutral-200">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <div>
                    <img
                      src="/images/illustration/thank-you.svg"
                      alt=""
                      className="max-h-[11.75rem] md:max-h-[16.375rem]"
                    />
                  </div>
                  <h3 className="mt-5 mb-3 text-center md:my-6 text-heading-7 md:text-heading-5">
                    Thank you for your donation
                  </h3>
                  <p className="max-w-[15rem] text-neutral-700 text-center text-sm md:text-md">
                    A receipt and certificate has been sent to{" "}
                    {!profile.email ? "your email" : ""}
                  </p>
                  <a
                    href={profile.email && "mailto:" + profile.email}
                    className="text-sm tracking-tighter text-center break-all text-button-lg md:text-md"
                  >
                    {profile.email || ""}
                  </a>
                </>
              )}
              <div className="mt-5 md:mt-7.5 mb-15 w-full sm:w-85">
                <a href="/" className="btn btn-primary filled">
                  Back to Home
                </a>
              </div>
              <p className="text-heading-7 mb-3.5">Share with friends</p>
              <div className="flex items-center gap-5">
                <a
                  target="blank"
                  href={
                    "https://www.facebook.com/sharer.php?u=" +
                    encodeURIComponent(url)
                  }
                  className="flex items-center justify-center w-12 h-12 rounded-lg text-white bg-[#3B5998]"
                >
                  <FacebookIcon iconSize={24} />
                </a>

                <a
                  target="blank"
                  href={
                    "https://twitter.com/intent/tweet?text=" +
                    encodeURIComponent(message) +
                    "&text=" +
                    encodeURIComponent(url)
                  }
                  className="flex items-center justify-center w-12 h-12 rounded-lg text-white bg-[#000000]"
                >
                  <TwitterIcon iconSize={24} />
                </a>
                <a
                  target="blank"
                  href={
                    "https://api.whatsapp.com/send?text=" +
                    encodeURIComponent(message + "\n\n" + url)
                  }
                  className="flex items-center justify-center w-12 h-12 rounded-lg text-white bg-[#53CC60]"
                >
                  <WhatsappIcon2 iconSize={24} />
                </a>

                <a
                  target="blank"
                  href={
                    "http://www.linkedin.com/shareArticle?mini=true&url=" +
                    encodeURIComponent(url) +
                    "&summary=" +
                    encodeURIComponent(message) +
                    "&source=" +
                    encodeURIComponent(url)
                  }
                  className="flex items-center justify-center w-12 h-12 rounded-lg text-white bg-[#1275B1]"
                >
                  <LinkedinIcon iconSize={24} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default React.memo(ThankYouComponent);
