
export default function Button({ children, disabled, className = "", ...props }) {
  return (
    <button
      className={`bg-primary bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-700'
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
