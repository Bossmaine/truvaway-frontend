const Tab = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 font-semibold rounded-t-md transition ${
        active
          ? "bg-[#264180] text-white"
          : "bg-gray-100 text-[#264180] hover:bg-[#264180]/10"
      }`}
    >
      {label}
    </button>
  );
};

export default Tab;
