import React from "react";
import { useSearchParams } from "react-router-dom";

function SortOptions() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = event.target.value;

    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };

  return (
    <div className="mb-4 mr-4 flex items-center justify-end">
      <select
        name="sort"
        id="sort"
        className="border p-2 rounded-md focus:outline-none"
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
}

export default SortOptions;
