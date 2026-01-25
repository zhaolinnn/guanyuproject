// API utility functions

const API_BASE_URL = '/api'; // Vite proxy will forward to backend

export const api = {
  // Health check
  async healthCheck() {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  },
  
  // Example: Add more API calls here
  // async getData() {
  //   const response = await fetch(`${API_BASE_URL}/data`);
  //   return response.json();
  // },
};
