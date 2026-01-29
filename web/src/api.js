const API_BASE_URL = '/api';

const defaultFetchOpts = { credentials: 'include' };

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
      ...defaultFetchOpts,
    });
    return handleResponse(res);
  },

  async login(username, password) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      ...defaultFetchOpts,
    });
    return handleResponse(res);
  },

  async getMe() {
    const res = await fetch(`${API_BASE_URL}/auth/me`, defaultFetchOpts);
    if (res.status === 401) return null;
    const data = await handleResponse(res);
    return data.user ?? null;
  },

  async logout() {
    const res = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      ...defaultFetchOpts,
    });
    return handleResponse(res);
  },

  async getCourses() {
    const res = await fetch(`${API_BASE_URL}/courses`);
    return handleResponse(res);
  },

  async getCourseBySlug(slug) {
    const res = await fetch(`${API_BASE_URL}/courses/${encodeURIComponent(slug)}`);
    return handleResponse(res);
  },

  async getCompletions() {
    const res = await fetch(`${API_BASE_URL}/courses/completions`, defaultFetchOpts);
    if (res.status === 401) return { completions: [] };
    return handleResponse(res);
  },
};
