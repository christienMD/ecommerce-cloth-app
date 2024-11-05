import { SearchIcon } from 'lucide-react';
import React from 'react'

const Search = () => {
  return (
    <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-dress_realm-yellow hover:bg-yellow-500">
      <input
        className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
        type="text"
        placeholder="build by md christien"
      />
      <SearchIcon className="h-12 w-12 p-4" />
    </div>
  );
}

export default Search