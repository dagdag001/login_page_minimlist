import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ThumbsUp, MessageCircle, AlertCircle, User } from "lucide-react";

function getRandomAvatar() {
  // Return a User icon component instead of emoji
  return <User className="w-8 h-8 text-gray-400" />;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  return date.toLocaleDateString();
}

export function UserReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newReview, setNewReview] = useState({
    destination: "",
    rating: 5,
    reviewText: ""
  });

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/reviews");
      const data = await response.json();
      
      if (data.ok) {
        setReviews(data.reviews.map(r => ({
          ...r,
          avatar: getRandomAvatar()
        })));
      } else {
        setError("Failed to load reviews");
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to submit a review");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newReview)
      });

      const data = await response.json();

      if (data.ok) {
        // Add the new review to the list with avatar
        const reviewWithAvatar = {
          ...data.review,
          avatar: getRandomAvatar()
        };
        setReviews([reviewWithAvatar, ...reviews]);
        setNewReview({ destination: "", rating: 5, reviewText: "" });
        setShowForm(false);
      } else {
        if (response.status === 401) {
          setError("Please log in to submit a review");
        } else if (data.errors) {
          setError(data.errors.map(e => e.message).join(", "));
        } else {
          setError(data.error || "Failed to submit review");
        }
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleHelpful = async (id) => {
    try {
      const response = await fetch(`/api/reviews/${id}/helpful`, {
        method: "POST"
      });

      const data = await response.json();

      if (data.ok) {
        setReviews(reviews.map(review => 
          review.id === id ? { ...review, helpful: data.helpfulCount } : review
        ));
      }
    } catch (err) {
      console.error("Error updating helpful count:", err);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-cream-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Traveler Reviews
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            See what our travelers are saying about their experiences
          </p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 max-w-3xl mx-auto"
          >
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-800">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Review Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-12"
          >
            <form onSubmit={handleSubmitReview} className="bg-white rounded-3xl p-8 shadow-lg max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Share Your Experience</h3>
              
              <div className="mb-4">
                <label htmlFor="review-destination" className="block text-sm font-semibold text-gray-700 mb-2">
                  Destination
                </label>
                <input
                  id="review-destination"
                  type="text"
                  value={newReview.destination}
                  onChange={(e) => setNewReview({ ...newReview, destination: e.target.value })}
                  required
                  disabled={submitting}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none disabled:bg-gray-100"
                  placeholder="Santorini, Greece"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      disabled={submitting}
                      className="focus:outline-none disabled:opacity-50"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= newReview.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="review-text" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Review (10-2000 characters)
                </label>
                <textarea
                  id="review-text"
                  value={newReview.reviewText}
                  onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
                  required
                  disabled={submitting}
                  minLength={10}
                  maxLength={2000}
                  rows={4}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none resize-none disabled:bg-gray-100"
                  placeholder="Share your experience... (minimum 10 characters)"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {newReview.reviewText.length} / 2000 characters
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading reviews...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && reviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No reviews yet. Be the first to share your experience!</p>
          </div>
        )}

        {/* Reviews Grid */}
        {!loading && reviews.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{review.name}</div>
                    <div className="text-sm text-gray-500">{formatDate(review.date)}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              {/* Destination */}
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                  {review.destination}
                </span>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-4 leading-relaxed">{review.text}</p>

              {/* Actions */}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleHelpful(review.id)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Helpful ({review.helpful})</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Reply</span>
                </button>
              </div>
            </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
