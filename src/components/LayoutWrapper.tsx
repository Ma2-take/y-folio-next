'use client'

import { usePathname } from 'next/navigation';
import NavBar from './NavBar';
import React from 'react';

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith('/admin');

    return (
        <>
            {!isAdminPage && <NavBar />}
            {children}
        </>
    );
};

export default LayoutWrapper; 