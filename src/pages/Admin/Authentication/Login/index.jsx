import React from 'react'
import { EyeOffIcon } from '../../../../theme/svg-icons'
import { Button } from '../../../../components'
import { Link } from 'react-router-dom'

export const AdminloginComponent = () => {

    return (
        <div className='flex flex-col items-center justify-center w-full h-screen px-3 m-auto sm:px-0 max-w-25'>
            <a href="/"><img src="/images/assets/logo.svg" className="mx-auto mb-15" alt="Al-Ihsan Foundation" /></a>
            <h1 className="mb-10 text-center text-heading-5 md:text-heading-4 text-neutral-900">Login To Your Account</h1>
            <form className='w-full'>
                <div className="flex flex-col mb-6 form-group">
                    <label htmlFor="emailAddress" className="sr-only">Email Address</label>
                    <input type="text" value="" name="email" className="w-full bg-white form-control" id="emailAddress" placeholder="Email Address" />
                </div>
                <div className="relative w-full mb-5 form-group">
                    <label htmlFor="password" className="sr-only">Password</label>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 cursor-pointer text-neutral-500">
                        <Link to="#" aria-label="View Password" /><EyeOffIcon />
                    </div>
                    <input type="password" value="" name="password" className="w-full bg-white form-control" id="password" placeholder="Password" />
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center gap-2 mb-7.5">
                        <input type="checkbox" id="rememberMe" value="" />
                        <label htmlFor="rememberMe" className="text-sm font-medium text-neutral-600">Remember Me</label>
                    </div>
                    {/* <a href="/reset-password" className="text-sm font-medium text-primary-300">Forgot password?</a> */}
                </div>
                <Button className="w-full btn btn-primary" variant="" type="submit" label={'Login'} />
            </form>
        </div>
    )



}