'use client'

import { usePathname } from 'next/navigation';
import NavBar from './NavBar';
import React from 'react';

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isNavHidden = pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/recruiter') || pathname === '/portfolio' || pathname.startsWith('/portfolio/edit');

    const wrapperClass = !isNavHidden ? 'pt-20 md:pt-24' : undefined;

    return (
        <>
            {!isNavHidden && <NavBar />}
            <div className={wrapperClass}>{children}</div>
        </>
    );
};

export default LayoutWrapper; 