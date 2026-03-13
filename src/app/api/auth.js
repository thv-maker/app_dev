// Use global.API_BASE_URL if set (e.g., from App.js) so the app can point to different backends.
// Default assumes Android emulator talking to localhost on port 8000.
const BASE_URL = 'http://192.168.55.124:8000/api';
const options = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export async function authLogin({ email, password }) {
  const url = BASE_URL + '/login';
  console.log('[authLogin] POST', url, { email });

  const response = await fetch(url, {
    method: 'POST',
    ...options,
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  console.log('[authLogin] response', response.status, data);

  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || 'Login failed');
  }
}

export async function authRegister({ email, password }) {
  const response = await fetch(BASE_URL + '/register', {
    method: 'POST',
    ...options,
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || 'Register failed');
  }
}