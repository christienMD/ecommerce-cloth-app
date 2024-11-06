"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ProductFeedErrorProps {
  error: Error;
  reset: () => void;
}

const ProductFeedError = ({ error, reset }: ProductFeedErrorProps) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] px-4">
      <div className="max-w-md w-full">
        <Alert variant="destructive" className="border-red-500/50 mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="ml-2">Error Loading Products</AlertTitle>
          <AlertDescription className="ml-6 mt-2">
            {error.message ||
              "There was an error loading the products. Please try again."}
          </AlertDescription>
        </Alert>

        <div className="flex justify-center">
          <Button
            onClick={() => reset()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductFeedError;
