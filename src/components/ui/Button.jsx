const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`bg-[#264180] text-white font-medium py-2 px-4 rounded hover:bg-[#1f3668] transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
