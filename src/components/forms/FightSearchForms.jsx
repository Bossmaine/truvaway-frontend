import { useState } from "react";

import Input from "../ui/Input";
import Button from "../ui/Button";
import GuestSelector from "../ui/GuestSelector";
import ClassSelector from "../ui/ClassSelector";
import airports from "../../data/airports";

const FlightSearchForm = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 });
  const [travelClass, setTravelClass] = useState("Economy");

  const handleFromInput = (value) => {
    setFrom(value);
    setFromSuggestions(
      airports.filter(
        (airport) =>
          airport.city.toLowerCase().includes(value.toLowerCase()) ||
          airport.code.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleToInput = (value) => {
    setTo(value);
    setToSuggestions(
      airports.filter(
        (airport) =>
          airport.city.toLowerCase().includes(value.toLowerCase()) ||
          airport.code.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSelectFrom = (airport) => {
    setFrom(`${airport.city} (${airport.code})`);
    setFromSuggestions([]);
  };

  const handleSelectTo = (airport) => {
    setTo(`${airport.city} (${airport.code})`);
    setToSuggestions([]);
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div className="relative">
        <Input
          placeholder="From (e.g. Lagos)"
          value={from}
          onChange={(e) => handleFromInput(e.target.value)}
        />
        {fromSuggestions.length > 0 && (
          <ul className="absolute bg-white border w-full shadow z-10 max-h-40 overflow-y-auto">
            {fromSuggestions.map((airport) => (
              <li
                key={airport.code}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectFrom(airport)}
              >
                {airport.city} ({airport.code}) - {airport.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative">
        <Input
          placeholder="To (e.g. London)"
          value={to}
          onChange={(e) => handleToInput(e.target.value)}
        />
        {toSuggestions.length > 0 && (
          <ul className="absolute bg-white border w-full shadow z-10 max-h-40 overflow-y-auto">
            {toSuggestions.map((airport) => (
              <li
                key={airport.code}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectTo(airport)}
              >
                {airport.city} ({airport.code}) - {airport.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Input type="date" />
      <GuestSelector onChange={(val) => setGuests(val)} />
      <ClassSelector value={travelClass} onChange={setTravelClass} />

      <p className="text-sm text-gray-600">
        Searching for {guests.adults} adult{guests.adults !== 1 ? "s" : ""}
        {guests.children
          ? `, ${guests.children} child${guests.children > 1 ? "ren" : ""}`
          : ""}
        {guests.infants
          ? `, ${guests.infants} infant${guests.infants > 1 ? "s" : ""}`
          : ""}
      </p>
      <Button className="col-span-1 md:col-span-2">Search Flights</Button>
    </form>
  );
};

export default FlightSearchForm;
