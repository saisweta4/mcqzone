interface LoadingSpinnerProps {
  size?: number;
}

export default function LoadingSpinner({
  size = 20,
}: LoadingSpinnerProps) {
  return (
    <div
      className="animate-spin rounded-full border-2 border-gray-300 border-t-primary"      style={{
        width: size,
        height: size,
      }}
    />
  );
}