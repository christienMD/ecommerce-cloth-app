import { CheckIcon } from "lucide-react";

const HasPrime = () => {
  return (
    <div className="flex items-center space-x-2 my-1 mb-2">
      <div className="flex tracking-tighter">
        <CheckIcon className="h-7 font-extrabold text-yellow-500" />
        <span className="text-blue-600 -ms-1 text-sm">Prime</span>
      </div>
      <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
    </div>
  );
};

export default HasPrime;
