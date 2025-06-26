const ClassSelector = ({ value = "Economy", onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded px-3 py-2 bg-white w-full"
    >
      <option value="Economy">Economy</option>
      <option value="Business">Business</option>
      <option value="First">First Class</option>
    </select>
  );
};

export default ClassSelector;
