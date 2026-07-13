"use client";

import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";

export function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container-custom flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">

        <Image
        src="/images/logo_name.png"
        alt="Logo"
        width={200}
        height={200}
      />

        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground">
          <Link href="/exams" className="hover:text-primary transition-colors">
            Exams
          </Link>

          <Link href="/study-plan" className="hover:text-primary transition-colors">
            Study Plan
          </Link>

          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
        </nav>

        {/* Authentication */}
        <div className="flex items-center gap-4">
          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <button className="hidden md:block text-sm font-medium hover:text-primary">
                  Log in
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
                  Get Started
                </button>
              </SignUpButton>
            </>
          ) : (
            <UserButton />
          )}
        </div>
      </div>
    </header>
  );
}