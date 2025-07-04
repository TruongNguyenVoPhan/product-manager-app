import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function UserProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const token = localStorage.getItem('token');

  // 🟢 Gọi API để lấy thông tin user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('https://product-api-7ric.onrender.com/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setName(res.data.name || '');
        setEmail(res.data.email || '');
      } catch (err) {
        toast.error('Failed to fetch user info');
      }
    };
    fetchUser();
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        'https://product-api-7ric.onrender.com/auth/update',
        { name, email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Profile updated successfully!');
      setPassword(''); // clear password field
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="card p-4">
      <h5>👤 Edit Profile</h5>
      <input
        className="form-control mb-2"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="form-control mb-3"
        type="password"
        placeholder="New Password (optional)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
}

export default UserProfile;
