import React from 'react';
import { Button } from '../../../../../components';
import { EyeOffIcon } from '../../../../../theme/svg-icons';
import { Link } from 'react-router-dom';
export const AdminProfile = () => {

    return (
        <>
            <div className='py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto'>
                <div className='flex flex-wrap gap-4 items-center justify-between w-full pb-3.5'>
                    <h5 className='text-heading-7 md:text-heading-5'>Profile</h5>
                    <div className='flex flex-wrap items-center gap-2 lg:gap-3'>
                        <Button className="flex-grow btn btn-outline-secondary text-button-md md:text-button-lg" variant="flex-grow btn btn-outline-secondary text-button-md md:text-button-lg" type="submit" label={'Cancel'} />
                        <Button className="flex-grow btn btn-danger text-button-md md:text-button-lg" variant="flex-grow btn btn-danger text-button-md md:text-button-lg" type="submit" label={'Delete Account'} />
                        <Button className="flex-grow btn btn-primary text-button-md md:text-button-lg" variant="" type="submit" label={'Save Changes'} />
                    </div>
                </div>
                <div className='mt-5 md:mt-7.5 flex flex-col gap-5 sm:gap-7.5'>
                    <form className='w-full flex flex-col gap-5 sm:max-w-[37.5rem]'>
                        <div className="form-group">
                            <input type="text" value="" name="fname" className="w-full bg-white form-control" id="fname" placeholder="First Name" />
                        </div>
                        <div className="form-group">
                            <input type="text" value="" name="lname" className="w-full bg-white form-control" id="lname" placeholder="Last Name" />
                        </div>
                        <div className="form-group">
                            <input type="text" value="" name="name" className="w-full bg-white form-control" id="name" placeholder="Full Name" />
                            <p className='mt-2 text-xs font-medium text-neutral-700'>This will be how your name will be displayed in the account section and in donation</p>
                        </div>
                        <div className="form-group">
                            <input type="text" value="" name="email" className="w-full bg-white form-control" id="emailAddress" placeholder="Email Address" />
                        </div>
                    </form>
                    <div className='flex flex-col'>
                        <h2 className='mb-4 text-heading-6'>Change Password</h2>
                        <form className='w-full flex flex-col gap-5 sm:max-w-[37.5rem]'>
                            <div className="relative form-group">
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                                    <Link to="#" aria-label="View Password" /><EyeOffIcon />
                                </div>
                                <input type="password" value="" name="password" className="w-full bg-white form-control" id="password" placeholder="Old Password" />
                            </div>
                            <div className="relative form-group">
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                                    <Link to="#" aria-label="View Password" /><EyeOffIcon />
                                </div>
                                <input type="password" value="" name="password" className="w-full bg-white form-control" id="new-password" placeholder="New Password" />
                            </div>
                            <div className="relative form-group">
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                                    <Link to="#" aria-label="View Password" /><EyeOffIcon />
                                </div>
                                <input type="password" value="" name="password" className="w-full bg-white form-control" id="confirm-password" placeholder="Confirm Password" />
                            </div>
                        </form>
                        <div className='flex flex-row gap-6 mt-8'>
                            <Button className={'grow sm:flex-grow-0'} variant={'secondaryOutline'} label={'Cancel'}/>
                            <Button className={'grow sm:flex-grow-0'} variant={'primary'} label={'Update Password'}/>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}