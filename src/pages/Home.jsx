import { useState } from "react"
import Tab from "../components/ui/Tab"
import FlightSearchForm from "../components/forms/FightSearchForms"
import HotelSearchForm from "../components/forms/HotelSearchForm"

const Home = () => {
    const [activeTab, setActiveTab] = useState("flights")
  
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="flex justify-center space-x-4 mb-6">
            <Tab label='Flights' active={activeTab === 'flights'} onClick={() => setActiveTab('flights')} />
            <Tab label='Hotels' active={activeTab === 'Hotels'} onClick={() => setActiveTab('Hotels')} />
        </div>
        <div className="bg-white shadow-md rounded-b-md p-6 border">
            {activeTab === 'flights' && <FlightSearchForm />}
            {activeTab === 'Hotels' && <HotelSearchForm />} 
        </div>
    </div>
  )
}

export default Home
