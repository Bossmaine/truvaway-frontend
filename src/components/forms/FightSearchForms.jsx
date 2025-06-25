import Input from "../ui/Input";
import Button from "../ui/Button";

const FlightSearchForm = () => {
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <Input placeholder="From (e.g. Lagos)" />
      <Input placeholder="To (e.g. London)" />
      <Input type="date" />
      <Input type="number" placeholder="Passengers" />
      <Button className="col-span-1 md:col-span-2">Search Flights</Button>
    </form>
  );
};

export default FlightSearchForm;
