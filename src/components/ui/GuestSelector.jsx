import { useState, useEffect } from "react"

const GuestSelector = ({ onChange }) => {
  const [open, setOpen] = useState(false)

  // Main state stored here and passed to parent on submit
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  })

  // Temporary state for modal editing
  const [tempGuests, setTempGuests] = useState({ ...guests })

  // Whenever guests or open changes, reinitialize temporary state
  useEffect(() => {
    setTempGuests({ ...guests })
  }, [guests, open])

  const updateTempGuest = (type, delta) => {
    setTempGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }))
  }

  const handleSubmit = () => {
    setGuests(tempGuests)
    onChange(tempGuests)
    setOpen(false)
  }

  const summary = `${guests.adults} Adult${guests.adults > 1 ? "s" : ""}${
    guests.children > 0 ? `, ${guests.children} Child${guests.children > 1 ? "ren" : ""}` : ""
  }${guests.infants > 0 ? `, ${guests.infants} Infant${guests.infants > 1 ? "s" : ""}` : ""}`

  // Use proper keys and corresponding display labels
  const guestTypes = [
    { key: "adults", label: "Adults (12yrs+)" },
    { key: "children", label: "Children (2–12yrs)" },
    { key: "infants", label: "Infants (Below 2yrs)" },
  ]

  return (
    <div className="relative w-full">
      <div
        onClick={() => setOpen(!open)}
        className="border border-gray-300 rounded px-3 py-2 bg-white cursor-pointer"
      >
        {summary}
      </div>

      {open && (
        <div className="absolute z-30 bg-white border shadow-md mt-2 w-full rounded p-4 space-y-4">
          {guestTypes.map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <span>{label}</span>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => updateTempGuest(key, -1)}
                  className="bg-gray-200 w-7 h-7 rounded flex items-center justify-center"
                >
                  -
                </button>
                <span>{tempGuests[key]}</span>
                <button
                  type="button"
                  onClick={() => updateTempGuest(key, 1)}
                  className="bg-gray-200 w-7 h-7 rounded flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              className="px-3 py-1 text-sm text-gray-500 hover:underline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-1 bg-[#264180] text-white text-sm rounded hover:bg-[#1d335c]"
              onClick={handleSubmit}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default GuestSelector
