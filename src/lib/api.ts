const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const sendContactForm = async (data: ContactFormData) => {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to send message');
  }
  
  return response.json();
};