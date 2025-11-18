import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axiosInstance from "../../Utils/axiosInstance";
import FeedbackGrid from "../../Componente/FeedbackGrid/FeedbackGrid";
import FeedbackNav from "../../Componente/FeedbackNav/FeedbackNav";
import { fadeIn } from "../../Utils/motion";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('/feedback');
      // Check if the response has feedbacks directly or nested in data
      const feedbacksData = response.data.feedbacks || response.data.data || response.data;
      setFeedbacks(feedbacksData);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch feedbacks");
      toast.error(err.response?.data?.message || "Failed to fetch feedbacks");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  // Apply filtering whenever feedbacks or statusFilter changes
  useEffect(() => {
    if (!statusFilter) {
      setFilteredFeedbacks(feedbacks);
    } else {
      const filtered = feedbacks.filter(feedback => {
        // Handle null/undefined status by defaulting to "PENDING" (same as display logic)
        const feedbackStatus = feedback.status || "PENDING";
        return feedbackStatus.toLowerCase() === statusFilter.toLowerCase();
      });
      setFilteredFeedbacks(filtered);
    }
  }, [feedbacks, statusFilter]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <FeedbackNav 
        onStatusFilterChange={handleStatusFilterChange} 
        activeFilters={statusFilter ? 1 : 0}
      />
      <motion.div
        variants={fadeIn("right", "spring", 0.5, 1)}
        initial="hidden"
        animate="show"
        style={{ width: '100%' }}
        className="flex flex-col flex-grow pt-4 md:pt-6 lg:pt-8"
      >
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <FeedbackGrid
            feedbacks={filteredFeedbacks}
            loading={loading}
            error={error}
          />
        </div>
      </motion.div>
    </div>
  );
} 