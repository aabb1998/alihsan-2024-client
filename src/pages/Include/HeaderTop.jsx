import React from 'react';
import { useSelector } from 'react-redux';
import { ChevronDownIcon, GlobeIcon, SearchIcon, ShoppingCartIcon, UserIcon } from '../../theme/svg-icons';
import AccountMenu from './UserMenu';



export const HeaderTop = () => {
    const userData = useSelector(state => state.profile.auth);
    return (

        <div className="border-b border-b-neutral-300">
            <div className="container justify-between hidden !py-2 md:flex">
                {/* USA */}
                {/* <div className="flex items-center gap-1 text-neutral-800">
        <UsaFlagIcon />
        <span className="text-md">United states</span>
        <ChevronDownIcon iconSize={16} />
    </div> */}
                {/* Global */}
                <div className="flex items-center gap-1 text-neutral-800">
                    <div className="px-1.5 py-0.5 bg-neutral-200 rounded-sm">
                        <GlobeIcon iconSize={20} />
                    </div>
                    Global
                    <ChevronDownIcon iconSize={16} />
                </div>
                <div className="flex gap-7.5">
                    <div className="form-group">
                        <label className="relative block w-113 !mb-0">
                            <span className="sr-only">Search</span>
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-neutral-500">
                                <SearchIcon />
                            </span>
                            <input className="block w-full !py-2 !pr-3 bg-white border rounded-md form-control !pl-9" placeholder="Search" type="text" name="search" />
                        </label>
                    </div>

                    {/* <a href='/login' className="flex items-center gap-2">
            <UserIcon iconSize={20} />
            <span className="text-sm text-neutral-800">Account</span>
            <ChevronDownIcon iconSize={16} />
        </a> */}
                    {userData ?
                        <AccountMenu />
                        :
                        //  If not logged in show below
                        < a href='/login' className="flex items-center gap-2">
                            <UserIcon iconSize={20} />
                            <span className="text-sm text-neutral-800">Login</span>
                        </a>
                    }

                    <div className="flex items-center gap-2">
                        <ShoppingCartIcon iconSize={20} />
                        <span className="text-sm text-neutral-800">Basket</span>
                    </div>
                </div>
            </div>
        </div >
    )
}


{/*
<a href='/login' className="flex items-center gap-2">
    <UserIcon iconSize={20} />
    <span className="text-sm text-neutral-800"></span>
    <ChevronDownIcon iconSize={16} />
</a> 
*/}

