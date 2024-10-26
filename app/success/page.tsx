"use client";

import { CheckCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thank You, Your order has been confirmed
            </h1>
          </div>
          <p className="">
            Thank you for shopping with us. We will send you a confirmation once
            your item has shipped, if you would like to check the status of
            order(s) please press the link below
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="button mt-8"
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
};

export default SuccessPage;
