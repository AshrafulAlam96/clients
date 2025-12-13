import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

const MyBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${API_BASE_URL}/bookmarks/my`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setBookmarks(res.data));
  }, []);

  if (bookmarks.length === 0) {
    return <p>No bookmarks yet</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Bookmarks</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {bookmarks.map(b => (
          <div key={b._id} className="card bg-white shadow border">
            <figure>
              <img src={b.scholarship.image} className="h-40 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h2>{b.scholarship.name}</h2>
              <p>{b.scholarship.university}</p>
              <button
                className="btn btn-sm btn-error"
                onClick={() =>
                  axios.delete(
                    `${API_BASE_URL}/bookmarks/${b.scholarship._id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                  ).then(() =>
                    setBookmarks(bookmarks.filter(x => x._id !== b._id))
                  )
                }
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookmarks;
