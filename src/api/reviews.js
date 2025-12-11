import axios from "axios";

export const getReviews = async (id) => {
  const res = await axios.get(`/reviews/${id}`);
  return res.data;
};

export const getAverageRating = async (id) => {
  const res = await axios.get(`/reviews/average/${id}`);
  return res.data.averageRating;
};

export const addOrUpdateReview = async (data, token) => {
  const res = await axios.post("/reviews", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteReview = async (id, token) => {
  const res = await axios.delete(`/reviews/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
