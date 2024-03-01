import React, { useEffect, useMemo } from 'react';
import { CalendarIcon, CloseIcon, Edit3Icon, UsaFlagIcon } from '../../../theme/svg-icons';
import Button from '../../../components/Button';
import useFormState from '../../../hooks/useFormState'
import { useDispatch, useSelector } from 'react-redux';
import { addUser, editUser, cancelUserDetails } from '../../../features/adminUsers';
import { SnackMessages } from '../../../components/Toast';
import { PhoneField } from '../../../components/PhoneField';
import { countriesList } from '../../../utils/countries';


function ErrorLabel({ error }) {
	return (
		<div className="mt-2 text-sm text-red-300">{error}</div>
	)
}

export default function FormModal({ visible, onClose }) {
	const { showSuccessMessage, showErrorMessage } = SnackMessages()
	const dispatch = useDispatch();
	const { userDetails, userDetailsLoader } = useSelector(state => state.adminUsers);
	const formState = useFormState({
		schema: {
			firstName: { initialValue: '', validator: v => !v && 'This field is required' },
			lastName: { initialValue: '', validator: v => !v && 'This field is required' },
			company: { initialValue: '' },
			country: { initialValue: '', validator: v => !v && 'This field is required' },
			address: { initialValue: '' },
			email: { initialValue: '', validator: v => (v?.length
				? !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v)) && "Enter a  valid email address"
				: 'This field is required') || ''
			},
			phone: { initialValue: '', validator: v => !v && 'This field is required' },
		}, onSubmit: ({ values }) => {
			let p;
			if (userDetails.id)
				p = dispatch(editUser({ id: userDetails.id, payload: { ...userDetails, ...values } }));
			else
				p = dispatch(addUser(values));

			p.then(res => {
				if (res.error)
					showErrorMessage(res.error.message);
				else {
					showSuccessMessage(res.payload.message);
					if(userDetails.id) dispatch(cancelUserDetails());
					else onClose();
				}
			})
		}
	})
	const cancel = () => {
		formState.dispatch({ type: 'reset' });
		if (userDetails.id)
			dispatch(cancelUserDetails());
		else
			onClose();
	}
	const submit = () => {
		formState.submit();
	}

	const enable = useMemo(() => {
		let v = true;
		if (userDetailsLoader) return false;
		if (userDetails.id) {
			v = false;
			for (let i in formState.touched) {
				if (formState.touched[i]) {
					return true
				}
			}
		}
		return v;
	}, [formState, userDetails, userDetailsLoader])
	useEffect(() => {
		formState.dispatch({ values: userDetails || {
			firstName: '',
			lastName: '',
			company: '',
			country: '',
			address: '',
			email: '',
			phone: '',
		}, type: 'reset' })
	}, [userDetails, visible])
	return (
		<>
			<div className={"fixed inset-0 z-30 transition-opacity bg-gray-500 bg-opacity-75 " + (visible || userDetails.id ? '' : 'hidden')}>
				<div className="fixed inset-0 z-30 w-screen overflow-y-auto bg-neutral-1000/40">
					<div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0 max-h-[80vh]">
						<div className="relative z-30 w-full gap-4 text-left transition-all transform sm:max-w-modal-sm">
							<div className="flex px-4 pt-4 pb-7.5 sm:pt-10 sm:pb-10 sm:px-10 bg-white rounded-t-3xl sm:rounded-3xl">
								<div className="flex flex-col flex-grow gap-4 w-100 sm:gap-8">
									<div className="flex justify-between">
										<div className="font-bold tracking-tighter text-neutral-1000 text-md sm:text-heading-7">
											{userDetails.id ? "Edit" : "Add"} Admin
										</div>
										<button onClick={cancel} className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800">
											<CloseIcon iconSize={24} />
										</button>
									</div>
									<div className="flex flex-col gap-4 sm:gap-5 max-h-[calc(100vh-20rem)] overflow-auto pr-2">
										<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
											<div className="form-group">
												<label htmlFor="first name" className="block">First Name<span className="text-red-300">*</span></label>
												<input type="text" className="w-full form-control" placeholder="First Name" name="firstName" value={formState.values.firstName} onChange={formState.dispatch} />
												<ErrorLabel
													error={formState.touched.firstName && formState.errors.firstName}
												/>
											</div>
											<div className="form-group">
												<label htmlFor="last name" className="block">Last Name<span className="text-red-300">*</span></label>
												<input type="text" className="w-full form-control" placeholder="Last Name" name="lastName" value={formState.values.lastName} onChange={formState.dispatch} />
												<ErrorLabel
													error={formState.touched.lastName && formState.errors.lastName}
												/>
											</div>
										</div>
										<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
											<div className="form-group">
												<label htmlFor="company name" className="block">Company Name (Optional)</label>
												<input type="text" className="w-full form-control" placeholder="Company Name (Optional)" name="company" value={formState.values.company} onChange={formState.dispatch} />
												<ErrorLabel
													error={formState.touched.company && formState.errors.company}
												/>
											</div>
											<div className="form-group">
												<label htmlFor="Country" className="block">Country<span className="text-red-300">*</span></label>
												<select className="w-full text-sm !text-neutral-800 border-neutral-300 form-control" id="SelectProject" name="country" value={formState.values.country} onChange={formState.dispatch}>
													<option value="" className="text-neutral-800">Select Country</option>
													{countriesList.map(i => (
														<option key={i.code} value={i.code} className="text-neutral-800">{i.name}</option>
													))}
												</select>
												<ErrorLabel
													error={formState.touched.country && formState.errors.country}
												/>
											</div>
										</div>
										<div className="flex flex-col gap-4 sm:gap-5">

											<div className="w-full form-group">
												<label htmlFor="address" className="block">Address (Optional)</label>
												<input type="text" className="w-full form-control" placeholder="Address" name="address" value={formState.values.address} onChange={formState.dispatch} />
												<ErrorLabel
													error={formState.touched.address && formState.errors.address}
												/>
											</div>
											<div className="grid grid-cols-1 gap-4 mb-1 sm:grid-cols-2 sm:gap-5">
												<div className="form-group">
													<label htmlFor="email" className="block">Email Address<span className="text-red-300">*</span></label>
													<input disabled={userDetails.id} type="text" className="w-full form-control" placeholder="Email Address" name="email" value={formState.values.email} onChange={formState.dispatch} />
													<ErrorLabel
														error={formState.touched.email && formState.errors.email}
													/>
												</div>
												<div className="form-group">
													<label htmlFor="number" className="block">Phone Number<span className="text-red-300">*</span></label>
													<PhoneField
														name="phone"
														handleChange={e => formState.dispatch({ type: 'change', target: { name: 'phone', type: 'custom', value: e } })}
														value={formState.values.phone}
													/>
													<ErrorLabel
														error={formState.touched.phone && formState.errors.phone}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className='flex justify-between gap-4 sm:gap-5'>
										<Button onClick={cancel} variant={"secondaryOutline"} className="flex-grow" label={"Cancel"} />
										<Button disabled={!enable} onClick={submit} variant={"primary"} className="flex-grow" label={userDetails.id ? "Submit" : "Add Admin"} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}