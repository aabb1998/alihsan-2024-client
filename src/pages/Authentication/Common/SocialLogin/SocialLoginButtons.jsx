import React, { useState } from "react";
import {
  FacebookIcon2,
  GoogleIcon,
  LoaderIcon,
} from "../../../../theme/svg-icons";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import { SnackMessages } from "../../../../components/Toast";
import { useNavigate } from "react-router-dom";
import { SocialLoadingButton } from "../../../../components/LoadingButtons";
import { useDispatch } from "react-redux";
import { bulkAddDonation } from "../../../../features/basket/basketSlice";
import { socialMediaLogin } from "../../../../features/authentication/authenticationSlice";

const SocialLoginButtons = () => {
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
		setIsLoading(true);
		const actionResponse = await dispatch(socialMediaLogin({body: {
			firstName: response.data.first_name,
			lastNAme: response.data.last_name,
			email: response.data.email,
			facebokId: response.data.userID
		}, keepSession: true, provider: 'facebook'}))
		
		if(actionResponse.error){
			showErrorMessage(actionResponse?.error?.message);
			setIsLoading(false);
		} else {
			showSuccessMessage(actionResponse.payload.message);

			await updateSelectedItems();
			navigate("/");
		}
		setIsLoading(false);
  };
  const onFbReject = (error) => {
    setIsLoading(false);
  };

  const onGoogleResolve = async (response) => {

		setIsLoading(true);
		const actionResponse = await dispatch(socialMediaLogin({body: {
			firstName: response.data.given_name,
			lastName: response.data.family_name,
			email: response.data.email
		}, keepSession: true, provider: 'google'}))
		
		if(actionResponse.error){
			showErrorMessage(actionResponse.error.message);
			setIsLoading(false);
		} else {
			showSuccessMessage(actionResponse.payload.message);

			await updateSelectedItems();
			navigate("/");
		}
		setIsLoading(false);
  };
  const onGoogleReject = (error) => {
    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 justify-between gap-5 mb-7.5">
      {!isLoading ? (
        <LoginSocialGoogle
          client_id={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}
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
          appId={import.meta.env.VITE_APP_FACEBOOK_APP_ID}
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

export default SocialLoginButtons