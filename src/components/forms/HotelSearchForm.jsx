import { useState } from "react";

import Input from "../ui/Input";
import Button from "../ui/Button";
import GuestSelector from "../ui/GuestSelector";

import hotels from "../../data/hotels";
import { useNavigate } from "react-router-dom";

const HotelSearchForm = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 });
  const [rooms, setRooms] = useState(1);

  const handleInput = (value) => {
    setQuery(value);
    setSuggestions(
      hotels.filter(
        (hotel) =>
          hotel.city.toLowerCase().includes(value.toLowerCase()) ||
          hotel.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSelect = (hotel) => {
    setQuery(`${hotel.name}, ${hotel.city}`);
    setSuggestions([]);
  };

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/hotels", {
      state: {
        query,
        checkIn,
        checkOut,
        guests,
        rooms,
      },
    });
  };

  return (
    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div className="relative col-span-1 md:col-span-2">
        <Input
          placeholder="City or Hotel Name"
          value={query}
          onChange={(e) => handleInput(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border w-full shadow z-10 max-h-40 overflow-y-auto">
            {suggestions.map((hotel, i) => (
              <li
                key={i}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(hotel)}
              >
                {hotel.name}, {hotel.city}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
      <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />

      <GuestSelector onChange={(val) => setGuests(val)} />

      <select
        className="w-full border border-gray-300 rounded px-3 py-2"
        value={rooms}
        onChange={(e) => setRooms(parseInt(e.target.value))}
      >
        {[...Array(10).keys()].map((i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1} Room{i > 0 ? "s" : ""}
          </option>
        ))}
      </select>

      <p className="text-sm text-gray-600">
        {rooms} Room{rooms > 1 ? "s" : ""} — {guests.adults} Adult
        {guests.adults !== 1 ? "s" : ""}
        {guests.children
          ? `, ${guests.children} Child${guests.children > 1 ? "ren" : ""}`
          : ""}
        {guests.infants
          ? `, ${guests.infants} Infant${guests.infants > 1 ? "s" : ""}`
          : ""}
      </p>

      <Button className="col-span-1 md:col-span-2">Search Hotels</Button>
    </form>
  );
};

export default HotelSearchForm;
