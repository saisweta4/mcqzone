"use client";

import Link from "next/link";
import Image from "next/image";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { isSignedIn } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
  <>
    {/* Overlay */}
    {mobileOpen && (
      <div
        onClick={() => setMobileOpen(false)}
        className="fixed inset-0 bg-black/40 z-40 md:hidden"
      />
    )}

    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container-custom flex h-16 items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo_name.png"
            alt="MCQZone Logo"
            width={180}
            height={180}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-lg font-medium">
          <Link
            href="/exams"
            className="hover:text-primary transition-colors"
          >
            Exams
          </Link>

          <Link
            href="/study-planner"
            className="hover:text-primary transition-colors"
          >
            Study Plan
          </Link>

          <Link
            href="/profile"
            className="hover:text-primary transition-colors"
          >
            Profile
          </Link>
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <button className="text-lg font-medium hover:text-primary">
                  Log in
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="rounded-full bg-primary px-4 py-2 text-white hover:bg-primary/90">
                  Get Started
                </button>
              </SignUpButton>
            </>
          ) : (
            <UserButton />
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden"
        >
          <Menu className="w-7 h-7" />
        </button>
      </div>
    </header>

    {/* Mobile Sidebar */}
    <aside
      className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
        mobileOpen ? "translate-x-0" : "translate-x-full"
      } md:hidden`}
    >
      <div className="flex items-center justify-between border-b p-5">
        <span className="font-bold text-lg">
          Menu
        </span>

        <button onClick={() => setMobileOpen(false)}>
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex flex-col p-5 gap-5 text-lg">

        <Link
          href="/exams"
          onClick={() => setMobileOpen(false)}
        >
          Exams
        </Link>

        <Link
          href="/study-planner"
          onClick={() => setMobileOpen(false)}
        >
          Study Plan
        </Link>

        <Link
          href="/profile"
          onClick={() => setMobileOpen(false)}
        >
          Profile
        </Link>

        <hr />

        {!isSignedIn ? (
          <>
            <SignInButton mode="modal">
              <button
                onClick={() => setMobileOpen(false)}
                className="text-left"
              >
                Log in
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-primary text-white py-3"
              >
                Get Started
              </button>
            </SignUpButton>
          </>
        ) : (
          <div className="pt-2">
            <UserButton />
          </div>
        )}
      </nav>
    </aside>
  </>
);
}