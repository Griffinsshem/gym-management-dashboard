export const Button = ({ children, onClick, variant = "primary" }) => {
  const base = "px-4 py-2 rounded-xl font-medium transition";

  const styles = {
    primary: "bg-black text-white hover:bg-gray-800",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 hover:bg-gray-100",
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
};