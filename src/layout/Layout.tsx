import React from "react";

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className="dark:bg-gray-800 pt-10 pb-10 dark:text-white min-h-screen">
             <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
        </div>
    )
}
export default Layout