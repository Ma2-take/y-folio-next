'use client'

import { usePathname } from 'next/navigation';
import NavBar from './NavBar';
import React from 'react';

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isNavHidden = pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/recruiter');

    return (
        <>
            {!isNavHidden && <NavBar />}
            {children}
        </>
    );
};

export default LayoutWrapper; 