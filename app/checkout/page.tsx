// app/checkout/page.tsx
import CartItemFeed from "../components/sections/CartItemFeed/CartItemFeed";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function CheckOutPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/checkout");
  }

  return  <CartItemFeed userEmail={session.user?.email} />;
}

export default CheckOutPage;
