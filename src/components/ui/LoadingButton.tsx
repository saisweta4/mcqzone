"use client";

import LoadingSpinner from "./LoadingSpinner";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

export default function LoadingButton({
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={`${className} disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
    >
      {loading && <LoadingSpinner size={16} />}
      {children}
    </button>
  );
}