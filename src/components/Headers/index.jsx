import React from 'react'
import HeaderTop from './HeaderTop';
import HeaderMain from './HeaderMain';

export const Headers = ({ isSidebar, setSidebar }) => {
    return (
        <div>
            {/* Top Header Component */}
            <HeaderTop />
            {/* Main Header Component */}
            <HeaderMain isSidebar={isSidebar} setSidebar={setSidebar} />
        </div>
    )
}

