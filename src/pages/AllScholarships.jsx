import { useEffect, useState } from "react";
import ScholarshipCard from "../components/ScholarshipCard";
import { scholarshipsData } from "../data/scholarshipsData";

const AllScholarships = () => {
  const [data, setData] = useState(scholarshipsData);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [sortBy, setSortBy] = useState("");
  
  // Pagination setup
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  // Filter + Search + Sort Logic
  const applyFilters = () => {
    let filtered = [...scholarshipsData];

    if (search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.university.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterCategory) {
      filtered = filtered.filter((item) => item.category === filterCategory);
    }

    if (filterCountry) {
      filtered = filtered.filter((item) => item.country === filterCountry);
    }

    if (sortBy === "fees-asc") filtered.sort((a, b) => a.fees - b.fees);
    if (sortBy === "fees-desc") filtered.sort((a, b) => b.fees - a.fees);
    if (sortBy === "date-newest")
      filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));

    setData(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    applyFilters();
  }, [search, filterCategory, filterCountry, sortBy]);

  // Pagination Items
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const displayedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="my-10 space-y-10">

      {/* SEARCH BAR */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search scholarships..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* CATEGORY FILTER */}
        <select
          className="select select-bordered"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Category</option>
          <option value="Merit-Based">Merit-Based</option>
          <option value="Government">Government</option>
        </select>

        {/* COUNTRY FILTER */}
        <select
          className="select select-bordered"
          value={filterCountry}
          onChange={(e) => setFilterCountry(e.target.value)}
        >
          <option value="">Country</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Singapore">Singapore</option>
        </select>

        {/* SORT */}
        <select
          className="select select-bordered"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="fees-asc">Fees (Low to High)</option>
          <option value="fees-desc">Fees (High to Low)</option>
          <option value="date-newest">Newest First</option>
        </select>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedData.map((item) => (
          <ScholarshipCard key={item._id} item={item} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 mt-10">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            className={`btn btn-sm ${
              currentPage === idx + 1 ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllScholarships;
