// api.js
// This file contains all functions that talk to your FastAPI backend
// Every component imports from here instead of writing API calls directly

import axios from 'axios';

// Your FastAPI backend URL
const API_BASE_URL = 'http://127.0.0.1:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function 1 — Send article to backend for prediction
// Called when user clicks "Check Article" button
export const predictArticle = async (text, title = '') => {
  const response = await api.post('/predict/', {
    text,
    title,
  });
  return response.data;
};

// Function 2 — Get all past predictions from database
// Called when History page loads
export const getHistory = async () => {
  const response = await api.get('/history/');
  return response.data;
};

// Function 3 — Delete one article by its ID
// Called when user clicks delete button in History
export const deleteArticle = async (id) => {
  const response = await api.delete(`/history/${id}`);
  return response.data;
};