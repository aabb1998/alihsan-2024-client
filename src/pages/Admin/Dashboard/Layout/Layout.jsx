import React from 'react';
import { AdminHeaderComponent } from '../Header';
import Sidemenus from '../SideMenu';

export const LayoutComponent = ({ children }) => {
    return (
        <div className='h-screen overflow-hidden'>
            <AdminHeaderComponent />
            <div className='flex h-screen overflow-hidden pt-18'>
                <Sidemenus/>
                <div className='w-full'>
                {children}
                </div>

            </div>
        </div>
    )
}
