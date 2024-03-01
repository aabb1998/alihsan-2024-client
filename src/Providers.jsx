import React, { Suspense, useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { ToastContainer } from "react-toastify";
// import { HelmetProvider } from "react-helmet-async";
import Loader from "./components/Loader";
import { ConfirmationModalProvider } from "./components/ConfirmationModal";

// import { store } from './app/store'
import {store} from './features/store' 
import { initAuth } from './features/authentication/authenticationSlice';

const AuthenticationChecker = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(initAuth());
	}, [])
	return null;
}

export default function Providers ({children}) {
	return (
    <React.StrictMode>
			{/* <HelmetProvider> */}
				<Provider store={store}>
					<AuthenticationChecker />
					<div className="App">
						<Suspense
							fallback={
								<div className="absolute z-50 w-full h-screen overflow-hidden bg-neutral-1000/50">
									<Loader />
								</div>
							}>
							<ToastContainer autoClose={2000} />
							<ConfirmationModalProvider>
								{children}
							</ConfirmationModalProvider>
						</Suspense>
					</div>
				</Provider>
			{/* </HelmetProvider> */}
		</React.StrictMode>
	)
}