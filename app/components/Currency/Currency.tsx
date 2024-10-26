import { formatPrice } from "@/app/utils/formatPrice";

interface Props {
  price: number;
}

export function Currency({ price }: Props) {
  const formattedPrice = formatPrice(price);

  return <span className="font-medium text-gray-700">{formattedPrice}</span>;
}

export default Currency;
