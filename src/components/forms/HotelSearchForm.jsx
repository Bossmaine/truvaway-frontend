import Input from "../ui/Input";
import Button from "../ui/Button";

const HotelSearchForm = () => {
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <Input placeholder="City or Hotel Name" />
      <Input type="date" placeholder="Check-in Date" />
      <Input type="date" placeholder="Check-out Date" />
      <Input type="number" placeholder="Guests" />
      <Button className="col-span-1 md:col-span-2">Search Hotels</Button>
    </form>
  );
};

export default HotelSearchForm;
