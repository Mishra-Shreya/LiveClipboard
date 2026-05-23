"use client";

import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";



export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10  backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2">
          <span className="text-xl">📋</span>
          <span className="text-xl font-bold font-black tracking-tight text-slate-900">
            LiveClipboard
          </span>
        </a>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <RxCross2 /> : <RxHamburgerMenu />}
        </button>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <a href="/" className="transition hover:text-emerald-600">
            Home
          </a>
          <a
            href="https://github.com/Mishra-Shreya/LiveClipboard"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-emerald-600"
          >
            GitHub
          </a>
        </nav>
      </div>

      {open && (
        <div className="border-t border-slate-200 px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium text-slate-600">
            <a href="/" className="rounded-lg px-2 py-2 hover:bg-slate-50">
              Home
            </a>
            <a
              href="https://github.com/Mishra-Shreya/LiveClipboard"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg px-2 py-2 hover:bg-slate-50"
            >
              GitHub
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}