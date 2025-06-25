const Input = ({ type = "text", placeholder, className = "", ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`border border-gray-300 rounded px-3 py-2 w-full ${className}`}
      {...props}
    />
  );
};

export default Input;
