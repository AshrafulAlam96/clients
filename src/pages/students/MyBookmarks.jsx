import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import ScholarshipCard from "../../components/ScholarshipCard";

const MyBookmarks = () => {
  const { user } = useAuth() || {};
  const token = localStorage.getItem("token");
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user) return;
    axios.get("/bookmarks/my", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => setItems(r.data))
      .catch(console.error);
  }, [user]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">My Bookmarks</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {items.length === 0 && <p>No bookmarks yet.</p>}
        {items.map(b => (
          // fetch scholarship preview: you can either embed scholarship snapshot in bookmark doc
          // or call scholarship GET /scholarships/:id. Simple approach: call /scholarships/:id client-side
          <BookmarkCard key={b._id} scholarshipId={b.scholarshipId} />
        ))}
      </div>
    </div>
  );
};

export default MyBookmarks;
