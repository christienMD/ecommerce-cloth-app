"use client";

import { SearchIcon } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { FormEvent } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const term = (e.currentTarget[0] as HTMLInputElement).value;
    handleSearch(term);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center h-9 sm:h-10 rounded-md flex-grow cursor-pointer bg-dress_realm-yellow hover:bg-yellow-500"
    >
      <input
        className="p-2 h-full w-full flex-grow flex-shrink rounded-l-md focus:outline-none px-4 text-xs sm:text-sm placeholder:text-xs sm:placeholder:text-sm placeholder:text-gray-600"
        placeholder="Search for cloths..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("search")?.toString()}
      />
      <button
        type="submit"
        className="h-9 w-9 sm:h-12 sm:w-12 flex items-center justify-center"
        aria-label="Search"
      >
        <SearchIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    </form>
  );
}
