import { formatPrice } from "@/app/utils/formatPrice";

interface Props {
  price: number;
}

export function Currency({ price }: Props) {
  // Ensure price is a valid number
  const validPrice = isNaN(price) ? 0 : price;
  const formattedPrice = formatPrice(validPrice);

  return <span className="font-medium text-gray-700">{formattedPrice}</span>;
}

export default Currency;
