const API_BASE_URL = '/api';

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || 'Request failed');
    err.status = res.status;
    throw err;
  }
  return data;
}

export const api = {
  async healthCheck() {
    const res = await fetch(`${API_BASE_URL}/health`);
    return res.json();
  },

  async signup({ username, password, email, name }) {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email, name }),
    });
    return handleResponse(res);
  },
};
