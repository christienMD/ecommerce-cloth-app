import { formatPrice } from "@/app/utils/formatPrice";

interface Props {
  price: number;
}

export function Currency({ price }: Props) {
  // Ensure price is a valid number
  const validPrice = isNaN(price) ? 0 : price;
  const formattedPrice = formatPrice(validPrice);

  return <span className="font-bold text-gray-800">{formattedPrice}</span>;
}

export default Currency;
