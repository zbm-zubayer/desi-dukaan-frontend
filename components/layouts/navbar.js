import Link from 'next/link';
import { useEffect, useState } from 'react';
import SearchBar from './navbar-child';
export default function RootNav() {
  const [email, setEmail] = useState(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // checks if the code is running on the client-side and not on the server-side.
      const session = sessionStorage.getItem('email');
      if (session) {
        setEmail(sessionStorage.getItem('email'));
      }
    }
  }, []);
  return (
    <header aria-label="Site Header" className="bg-slate-800 border-fuchsia-700 border-4 m-1 pb-2 rounded-lg">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block text-2xl font-bold" href="/">
              <span className="text-fuchsia-600">Desi</span>
              <span className="text-violet-500">Dukaan</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Site Nav">
              <ul className="flex items-center gap-6 text-sm text-white">
                <li>
                  <Link className="font-semibold transition hover:text-fuchsia-400" href="/">
                    Save More On App
                  </Link>
                </li>
                <li>
                  <Link className="font-semibold transition hover:text-fuchsia-400" href="/">
                    Sell On DesiDukaan
                  </Link>
                </li>
                <li>
                  <Link className="font-semibold transition hover:text-fuchsia-400" href="/">
                    Customer Care
                  </Link>
                </li>
                <li>
                  <Link className="font-semibold transition hover:text-fuchsia-400" href="/">
                    Track My Order
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {email ? (
            <Link className="text-white" href={`/profile/${email}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
                <path
                  fill-rule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <Link
                  className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-violet-500 hover:outline hover:text-violet-700 transition-all duration-300"
                  href="/login"
                >
                  Login
                </Link>

                <div className="hidden sm:flex">
                  <Link
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-violet-500 hover:outline hover:text-violet-700 transition"
                    href="/register"
                  >
                    Register
                  </Link>
                </div>
              </div>

              <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
        <SearchBar />
      </div>
    </header>
  );
}
