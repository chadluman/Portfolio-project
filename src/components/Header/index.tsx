'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import DropDown from './DropDown';
import menuData from './menuData';

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);

  const pathUrl = usePathname();

  useEffect(() => {
    const handleStickyMenu = () => {
      setStickyMenu(window.scrollY >= 80);
    };

    handleStickyMenu();
    window.addEventListener('scroll', handleStickyMenu, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleStickyMenu);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-1000 w-full border-b transition duration-300 ${
          stickyMenu
            ? 'border-white/10 bg-[#11110f]/90 py-3! backdrop-blur-xl lg:py-0!'
            : 'border-transparent bg-transparent py-5 lg:py-0'
        }`}
      >
        <div className='relative mx-auto max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:flex xl:px-0'>
          <div className='flex w-full items-center justify-between lg:w-1/4'>
            <Link
              href='/'
              className='flex items-center gap-3 text-[#f1efe7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ff3e]'
            >
              <span className='flex h-9 w-9 items-center justify-center border border-[#d8ff3e] font-serif text-lg'>
                CL
              </span>
              <span>
                <span className='block text-sm font-bold tracking-[0.08em]'>
                  CHAD LUMAN
                </span>
                <span className='block font-mono text-[8px] tracking-[0.2em] text-[#77756e] uppercase'>
                  Systems + Web
                </span>
              </span>
            </Link>

            <button
              onClick={() => setNavigationOpen(!navigationOpen)}
              className='block min-h-11 min-w-11 lg:hidden'
              aria-label={
                navigationOpen ? 'Close navigation' : 'Open navigation'
              }
              aria-expanded={navigationOpen}
            >
              <span className='relative block h-5.5 w-5.5 cursor-pointer'>
                <span className='du-block absolute right-0 h-full w-full'>
                  <span
                    className={`relative top-0 left-0 my-1 block h-0.5 rounded-sm bg-white delay-0 duration-200 ease-in-out ${
                      !navigationOpen ? 'w-full! delay-300' : 'w-0'
                    }`}
                  ></span>
                  <span
                    className={`relative top-0 left-0 my-1 block h-0.5 rounded-sm bg-white delay-150 duration-200 ease-in-out ${
                      !navigationOpen ? 'w-full! delay-400' : 'w-0'
                    }`}
                  ></span>
                  <span
                    className={`relative top-0 left-0 my-1 block h-0.5 rounded-sm bg-white delay-200 duration-200 ease-in-out ${
                      !navigationOpen ? 'w-full! delay-500' : 'w-0'
                    }`}
                  ></span>
                </span>
                <span className='du-block absolute right-0 h-full w-full rotate-45'>
                  <span
                    className={`absolute top-0 left-2.5 block h-full w-0.5 rounded-sm bg-white delay-300 duration-200 ease-in-out ${
                      !navigationOpen ? 'h-0! delay-0' : 'h-full'
                    }`}
                  ></span>
                  <span
                    className={`absolute top-2.5 left-0 block h-0.5 w-full rounded-sm bg-white delay-400 duration-200 ease-in-out ${
                      !navigationOpen ? 'h-0! delay-200' : 'h-0.5'
                    }`}
                  ></span>
                </span>
              </span>
            </button>
          </div>

          <div
            className={`invisible h-0 w-full items-center justify-between lg:visible lg:flex lg:h-auto lg:w-3/4 ${
              navigationOpen
                ? 'visible! relative mt-4 h-auto! max-h-[400px] overflow-y-scroll border border-white/10 bg-[#151512] p-7 shadow-lg'
                : ''
            }`}
          >
            <nav>
              <ul className='flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-2'>
                {menuData.map((menuItem, key) => (
                  <li
                    key={key}
                    className={`nav__menu group relative ${
                      stickyMenu ? 'lg:py-4' : 'lg:py-7'
                    }`}
                  >
                    {menuItem.submenu ? (
                      <>
                        <DropDown menuItem={menuItem} />
                      </>
                    ) : (
                      <Link
                        href={`${menuItem.path}`}
                        className={`relative px-4 py-3 font-mono text-[10px] tracking-[0.16em] uppercase transition hover:text-[#d8ff3e] focus-visible:outline-2 focus-visible:outline-[#d8ff3e] ${
                          pathUrl === menuItem.path
                            ? 'text-[#d8ff3e]'
                            : 'text-[#aaa89f]'
                        }`}
                      >
                        {menuItem.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* <div className="mt-7 flex items-center gap-6 lg:mt-0">
              {session ? (
                <>
                  <p>{session?.user?.name}</p>
                  <button
                    aria-label="Sign Out button"
                    onClick={() => signOut()}
                    className="text-sm text-white hover:text-opacity-75"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="text-sm text-white hover:text-opacity-75"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="button-border-gradient hover:button-gradient-hover relative flex items-center gap-1.5 rounded-lg px-4.5 py-2 text-sm text-white shadow-button hover:shadow-none"
                  >
                    Sign up
                    <svg
                      className="mt-0.5"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.4002 7.60002L9.2252 2.35002C9.0002 2.12502 8.6502 2.12502 8.4252 2.35002C8.2002 2.57502 8.2002 2.92502 8.4252 3.15002L12.6252 7.42502H2.0002C1.7002 7.42502 1.4502 7.67502 1.4502 7.97502C1.4502 8.27502 1.7002 8.55003 2.0002 8.55003H12.6752L8.4252 12.875C8.2002 13.1 8.2002 13.45 8.4252 13.675C8.5252 13.775 8.6752 13.825 8.8252 13.825C8.9752 13.825 9.1252 13.775 9.2252 13.65L14.4002 8.40002C14.6252 8.17502 14.6252 7.82503 14.4002 7.60002Z"
                        fill="white"
                      />
                    </svg>
                  </Link>
                </>
              )}
            </div> */}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
