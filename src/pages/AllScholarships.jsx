import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 6; // items per page

  // Fetch from server
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/scholarships`);
        setScholarships(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Failed to load scholarships:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Apply Filters
  useEffect(() => {
    let data = [...scholarships];

    if (search) {
      data = data.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      data = data.filter((s) => s.category === category);
    }

    if (country) {
      data = data.filter((s) => s.country === country);
    }

    setFiltered(data);
    setPage(1); // reset pagination on filter change
  }, [search, category, country, scholarships]);

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / limit);
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  if (loading) {
    return (
      <div className="p-10 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="my-10 max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-semibold mb-6">All Scholarships</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Merit-Based">Merit-Based</option>
          <option value="Research">Research</option>
          <option value="Government">Government</option>
          <option value="Fully-Funded">Fully-Funded</option>
        </select>

        <select
          className="select select-bordered w-full"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">All Countries</option>
          {[...new Set(scholarships.map((s) => s.country))].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* NO DATA */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No scholarships found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {paginated.map((item) => (
            <Link
              key={item._id}
              to={`/scholarships/${item._id}`}
              className="card bg-white shadow-md hover:shadow-xl border"
            >
              <figure>
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-40 w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm">{item.university}</p>
                <p className="text-sm">Country: {item.country}</p>

                <p className="font-bold mt-2">${item.fees} Fees</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`btn btn-sm ${page === i + 1 ? "btn-primary" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllScholarships;
