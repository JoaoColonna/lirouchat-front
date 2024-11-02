import React from 'react';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';

const Header: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    console.log('toggleSidebar');
    console.log(sidebarOpen);
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <header className="static bg-background top-0 left-0 w-full py-2 px-3 flex justify-between items-center z-30">
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-200">LirouChat</div>
          <button
            id="toggle-button"
            onClick={toggleSidebar}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground p-1.5 h-fit"
          >
            <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" className="text-current">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 2H1.75H14.25H15V3.5H14.25H1.75H1V2ZM1 12.5H1.75H14.25H15V14H14.25H1.75H1V12.5ZM1.75 7.25H1V8.75H1.75H14.25H15V7.25H14.25H1.75Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <a
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 py-1.5 px-2 h-fit font-normal"
            href="/about"
          >
            Sobre
          </a>
          <a
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 py-1.5 px-2 h-fit font-normal"
            href="/login"
          >
            Login
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;