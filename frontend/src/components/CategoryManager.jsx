import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CATEGORY_API = 'https://product-api-7ric.onrender.com/categories';

function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_API, getAuthHeader());
      setCategories(res.data);
    } catch (err) {
      toast.error('Failed to load categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    if (!newName.trim()) return toast.error('Category name required');
    try {
      await axios.post(CATEGORY_API, { name: newName }, getAuthHeader());
      setNewName('');
      fetchCategories();
      toast.success('Category added');
    } catch {
      toast.error('Failed to add category');
    }
  };

  const handleUpdate = async (id) => {
    if (!editingName.trim()) return toast.error('Name is required');
    try {
      await axios.put(`${CATEGORY_API}/${id}`, { name: editingName }, getAuthHeader());
      setEditingId(null);
      setEditingName('');
      fetchCategories();
      toast.success('Category updated');
    } catch {
      toast.error('Failed to update');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await axios.delete(`${CATEGORY_API}/${id}`, getAuthHeader());
      fetchCategories();
      toast.success('Deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="card p-4">
      <h4 className="mb-3">📁 Category Manager</h4>

      <div className="d-flex mb-3">
        <input
          className="form-control me-2"
          placeholder="New category name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleCreate}>Add</button>
      </div>

      <ul className="list-group">
        {categories.map((cat) => (
          <li key={cat._id} className="list-group-item d-flex justify-content-between align-items-center">
            {editingId === cat._id ? (
              <>
                <input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="form-control me-2"
                />
                <button className="btn btn-success btn-sm me-2" onClick={() => handleUpdate(cat._id)}>Save</button>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{cat.name}</span>
                <div>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => { setEditingId(cat._id); setEditingName(cat.name); }}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(cat._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryManager;
