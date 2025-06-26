import { useState } from "react"
import Input from "../ui/Input"
import Button from "../ui/Button"
import GuestSelector from "../ui/GuestSelector"
import ClassSelector from "../ui/ClassSelector"
import airports from "../../data/airports"
import { useNavigate } from "react-router-dom"

const FlightSearchForm = () => {
  const navigate = useNavigate()

  // Trip type: 'oneway' | 'return' | 'multi'
  const [tripType, setTripType] = useState("return")

  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [departureDate, setDepartureDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 })
  const [travelClass, setTravelClass] = useState("Economy")
  const [fromSuggestions, setFromSuggestions] = useState([])
  const [toSuggestions, setToSuggestions] = useState([])

  const handleFromInput = (value) => {
    setFrom(value)
    setFromSuggestions(
      airports.filter(
        (airport) =>
          airport.city.toLowerCase().includes(value.toLowerCase()) ||
          airport.code.toLowerCase().includes(value.toLowerCase())
      )
    )
  }

  const handleToInput = (value) => {
    setTo(value)
    setToSuggestions(
      airports.filter(
        (airport) =>
          airport.city.toLowerCase().includes(value.toLowerCase()) ||
          airport.code.toLowerCase().includes(value.toLowerCase())
      )
    )
  }

  const handleSelectFrom = (airport) => {
    setFrom(`${airport.city} (${airport.code})`)
    setFromSuggestions([])
  }

  const handleSelectTo = (airport) => {
    setTo(`${airport.city} (${airport.code})`)
    setToSuggestions([])
  }

  const handleSearch = (e) => {
    e.preventDefault()

    navigate("/flights", {
      state: {
        tripType,
        from,
        to,
        departureDate,
        returnDate: tripType === "return" ? returnDate : null,
        guests,
        travelClass,
      },
    })
  }

  return (
    <form onSubmit={handleSearch} className="mt-6 space-y-4">

      {/* Trip Type Selector */}
      <div className="flex justify-end space-x-3">
        {["oneway", "return", "multi"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setTripType(type)}
            className={`px-3 py-1 rounded-full text-sm border ${
              tripType === type
                ? "bg-[#264180] text-white border-[#264180]"
                : "bg-white border-gray-300 text-gray-600"
            }`}
          >
            {type === "oneway" ? "One Way" : type === "return" ? "Return" : "Multi-city"}
          </button>
        ))}
      </div>

      {/* From/To Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />

        {tripType === "return" && (
          <Input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        )}
      </div>

      {/* Guests and Class */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GuestSelector onChange={setGuests} />
        <ClassSelector value={travelClass} onChange={setTravelClass} />
      </div>

      {/* Summary and Submit */}
      <p className="text-sm text-gray-600">
        Searching for {guests.adults} adult{guests.adults !== 1 ? "s" : ""}
        {guests.children
          ? `, ${guests.children} child${guests.children > 1 ? "ren" : ""}`
          : ""}
        {guests.infants
          ? `, ${guests.infants} infant${guests.infants > 1 ? "s" : ""}`
          : ""}{" "}
        in {travelClass}
      </p>

      <Button className="w-full md:w-auto">Search Flights</Button>
    </form>
  )
}

export default FlightSearchForm
