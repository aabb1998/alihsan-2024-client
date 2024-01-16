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
import { api } from "../../../../utils/api";
import { bulkAddDonation } from "../../../../features/basket/basketSlice";

export const SocialLoginButtons = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState();
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  let navigate = useNavigate();
  const google = "google";
  const facebook = "facebook";

  const onSocialLoginStart = async (loginType) => {
    setIsLoading(true);
    setLoginType(loginType);
  };
  const updateSelectedItems = async () => {
    const checkouts = JSON.parse(localStorage.getItem("checkout") || "[]");
    await dispatch(bulkAddDonation(checkouts));
  };

  const onFbResolve = async (response) => {
    try {
      setIsLoading(true);
      const apiResponse = await facebookLogin(
        response.data.first_name,
        response.data.last_name,
        response.data.email,
        response.data.userID
      );
      if (apiResponse.status == 200) {
        showSuccessMessage(apiResponse.data.message);
        sessionStorage.setItem(
          "loggedIn",
          JSON.stringify({
            token: apiResponse.data.payload.token,
            isloggedIn: true,
          })
        );
        localStorage.setItem(
          "loggedIn",
          JSON.stringify({
            token: apiResponse.data.payload.token,
            isloggedIn: true,
          })
        );
        api.defaults.headers.common["Authorization"] = `Bearer ${apiResponse.data.payload.token}`;

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
        response.data.email
      );
      if (apiResponse.status == 200) {
        showSuccessMessage(apiResponse.data.message);
        sessionStorage.setItem(
          "loggedIn",
          JSON.stringify({
            token: apiResponse.data.payload.token,
            isloggedIn: true,
          })
        );
        localStorage.setItem(
          "loggedIn",
          JSON.stringify({
            token: apiResponse.data.payload.token,
            isloggedIn: true,
          })
        );
        api.defaults.headers.common["Authorization"] = `Bearer ${apiResponse.data.payload.token}`;
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
    <div className="grid grid-cols-1 sm:grid-cols-2 justify-between gap-5 mb-7.5">
      {!isLoading ? (
        <LoginSocialGoogle
          client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          scope="openid profile email"
          discoveryDocs="claims_supported"
          onLoginStart={() => onSocialLoginStart(google)}
          onResolve={onGoogleResolve}
          onReject={onGoogleReject}
        >
          <div className="flex items-center justify-center w-full col-span-1 gap-2 px-4 py-3 tracking-tighter border rounded-md sm:col-span-1 text-button-md border-neutral-300 cursor-pointer">
            <GoogleIcon />
            <div className="font-bold tracking-tighter text-neutral-700 whitespace-nowrap">
              Continue with Google
            </div>
          </div>
        </LoginSocialGoogle>
      ) : loginType == google ? (
        <SocialLoadingButton />
      ) : (
        <div className="flex items-center justify-center w-full col-span-1 gap-2 px-4 py-3 tracking-tighter border rounded-md sm:col-span-1 text-button-md border-neutral-300 cursor-pointer">
          <GoogleIcon />
          <div className="font-bold tracking-tighter text-neutral-700 whitespace-nowrap">
            Continue with Google
          </div>
        </div>
      )}

      {!isLoading ? (
        <LoginSocialFacebook
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
          onLoginStart={() => onSocialLoginStart(facebook)}
          onResolve={onFbResolve}
          onReject={onFbReject}
        >
          <div className="flex items-center justify-center w-full col-span-1 gap-2 px-4 py-3 tracking-tighter border rounded-md sm:col-span-1 text-button-md border-neutral-300 cursor-pointer">
            <FacebookIcon2 />
            <div className="font-bold tracking-tighter text-neutral-700 whitespace-nowrap">
              Continue with Facebook
            </div>
          </div>
        </LoginSocialFacebook>
      ) : loginType == facebook ? (
        <SocialLoadingButton />
      ) : (
        <div className="flex items-center justify-center w-full col-span-1 gap-2 px-4 py-3 tracking-tighter border rounded-md sm:col-span-1 text-button-md border-neutral-300 cursor-pointer">
          <FacebookIcon2 />
          <div className="font-bold tracking-tighter text-neutral-700 whitespace-nowrap">
            Continue with Facebook
          </div>
        </div>
      )}
    </div>
  );
};
