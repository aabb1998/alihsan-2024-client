import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import { Headers, Sidebar } from '../components';
import { Footer } from '../components/Footer';


export const Layout = () => {
    const [isSidebar, setSidebar] = useState(true);
    const [modalOptions, setModalOptions] = useState(null)

    return (
        <div className="relative">
            <div className={`hidden${modalOptions ? ' md:block' : ''} absolute top-0 bottom-0 left-0 right-0 z-20`}
                onClick={() => setModalOptions(null)}>
            </div>
            {/* Sidebar Component */}
            <Sidebar isSidebar={isSidebar} setSidebar={setSidebar} />
            {/* 2 Header files are included */}
            <Headers isSidebar={isSidebar} setSidebar={setSidebar} />
            {/* This is Main component */}
            <Outlet />
            {/* Footer component */}
            <Footer />
        </div>
    )
}

