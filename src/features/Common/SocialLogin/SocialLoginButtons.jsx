import React, { useState } from "react";
import {
  FacebookIcon2,
  GoogleIcon,
  LoaderIcon,
} from "../../../../theme/svg-icons";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import { SnackMessages } from "../../../../components/Toast";
import { useNavigate } from "react-router-dom";
import { facebookLogin, googleLogin } from "./SocialLoginAPI";
import { SocialLoadingButton } from "../../../../components/LoadingButtons";
import { useDispatch } from "react-redux";
import { bulkAddDonation } from "../../basket/basketSlice";

export const SocialLoginButtons = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState();
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  let navigate = useNavigate();
  const google = "google";
  const facebook = "facebook";

  const updateSelectedItems = async () => {
    const checkouts = JSON.parse(localStorage.getItem("checkout") || "[]");
    await dispatch(bulkAddDonation(checkouts));
  };

  const onSocialLoginStart = async (loginType) => {
    setIsLoading(true);
    setLoginType(loginType);
  };

  const onFbResolve = async (response) => {
    try {
      setIsLoading(true);
      const apiResponse = await facebookLogin(
        response.data.first_name,
        response.data.last_name,
        response.data.email,
        response.data.userID,
      );
      if (apiResponse.status == 200) {
        showSuccessMessage(apiResponse.data.message);
        sessionStorage.setItem(
          "loggedIn",
          JSON.stringify({
            token: apiResponse.data.payload.token,
            isloggedIn: true,
          }),
        );
        localStorage.setItem(
          "loggedIn",
          JSON.stringify({
            token: apiResponse.data.payload.token,
            isloggedIn: true,
          }),
        );
        await updateSelectedItems();
        navigate("/");
      } else {
        showErrorMessage(apiResponse.error);
      }
      setIsLoading(false);
    } catch (error) {
      showErrorMessage(error.message);
      setIsLoading(false);
    }
  };
  const onFbReject = (error) => {
    setIsLoading(false);
  };

  const onGoogleResolve = async (response) => {
    try {
      setIsLoading(true);
      const apiResponse = await googleLogin(
        response.data.given_name,
        response.data.family_name,
        response.data.email,
      );
      if (apiResponse.status == 200) {
        showSuccessMessage(apiResponse.data.message);
        sessionStorage.setItem(
          "loggedIn",
          JSON.stringify({
            token: apiResponse.data.payload.token,
            isloggedIn: true,
          }),
        );
        localStorage.setItem(
          "loggedIn",
          JSON.stringify({
            token: apiResponse.data.payload.token,
            isloggedIn: true,
          }),
        );
        await updateSelectedItems();
        navigate("/");
      } else {
        showErrorMessage(apiResponse.error);
      }
      setIsLoading(false);
    } catch (error) {
      showErrorMessage(error.message);
      setIsLoading(false);
    }
  };
  const onGoogleReject = (error) => {
    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 justify-between gap-5 mb-7.5"></div>
  );
};
