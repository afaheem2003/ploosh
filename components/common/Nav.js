// app/components/Nav.jsx or Nav.tsx (if using TS)
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

/* react-burger-menu styles ----------------------------------------- */
const menuStyles = {
  bmMenuWrap: { top: 0 },
  bmOverlay: { background: "rgba(0,0,0,.35)" },
  bmMenu: { background: "#1F2937", padding: "1.5rem 1rem" },
  bmItemList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  bmCrossButton: { height: "36px", width: "36px" },
};

/* helper ─ close dropdown on outside-click -------------------------- */
function useOutside(ref, cb) {
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) cb();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, cb]);
}

export default function Nav() {
  const [open, setOpen] = useState(false); // mobile slide-out
  const [drop, setDrop] = useState(false); // desktop dropdown
  const dropRef = useRef(null);
  const { data: session } = useSession();
  const router = useRouter();

  useOutside(dropRef, () => setDrop(false));

  const close = () => setOpen(false);
  const login = () => {
    router.push("/login");
    close();
  };
  const logout = () => signOut().finally(close);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/discover', label: 'Discover' },
    { href: '/creators', label: 'Creators' },
    { href: '/design', label: 'Design' },
  ];

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold text-gray-900">
          Ploosh
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              {l.label}
            </Link>
          ))}

          {session?.user?.role === "ADMIN" && (
            <Link
              href="/admin"
              className="text-sm font-medium text-yellow-500 hover:text-yellow-400"
            >
              Admin
            </Link>
          )}

          {!session?.user ? (
            <button
              onClick={login}
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Log&nbsp;in
            </button>
          ) : (
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setDrop((prev) => !prev)}
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                My&nbsp;Account
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6 8l4 4 4-4" />
                </svg>
              </button>

              {drop && (
                <div className="absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-gray-200 py-2 text-sm">
                  <Link
                    href="/my-preorders"
                    onClick={() => setDrop(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    My Pre-orders
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setDrop(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setDrop(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    Log&nbsp;out
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* MOBILE BURGER */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-gray-700 hover:text-gray-500 focus:outline-none"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* MOBILE SLIDE-OUT MENU */}
      <Menu
        right
        isOpen={open}
        onStateChange={({ isOpen }) => setOpen(isOpen)}
        customBurgerIcon={false}
        customCrossIcon={false}
        styles={menuStyles}
      >
        <button onClick={close} className="mb-6 text-white hover:text-gray-300">
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {session?.user?.role === "ADMIN" && (
          <Link
            href="/admin"
            onClick={close}
            className="bm-item text-xl text-yellow-400 hover:text-yellow-300"
          >
            Admin Dashboard
          </Link>
        )}

        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={close}
            className="bm-item text-xl text-white hover:text-gray-300"
          >
            {l.label}
          </Link>
        ))}

        <div className="mt-6 flex flex-col gap-4">
          {!session?.user ? (
            <>
              <button
                onClick={login}
                className="bm-item text-left text-xl text-white hover:text-gray-300"
              >
                Log in
              </button>
              <Link
                href="/signup"
                onClick={close}
                className="bm-item text-xl text-white hover:text-gray-300"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/my-preorders"
                onClick={close}
                className="bm-item text-xl text-white hover:text-gray-300"
              >
                My Pre-orders
              </Link>
              <Link
                href="/profile"
                onClick={close}
                className="bm-item text-xl text-white hover:text-gray-300"
              >
                My Profile
              </Link>
              <Link
                href="/settings"
                onClick={close}
                className="bm-item text-xl text-white hover:text-gray-300"
              >
                Settings
              </Link>
              <button
                onClick={logout}
                className="bm-item text-left text-xl text-white hover:text-gray-300"
              >
                Log out
              </button>
            </>
          )}
        </div>
      </Menu>
    </header>
  );
}
