import React, { useState, useEffect } from 'react';
import './CustomerPage.css';

function CustomerPage({ onBack }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    alamat: ''
  });

  // Fetch customers
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/customers');
      const result = await response.json();
      setCustomers(result.data || []);
      setError(null);
    } catch (err) {
      setError('Gagal memuat pelanggan: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({ nama: '', email: '', telepon: '', alamat: '' });
        setShowForm(false);
        fetchCustomers();
        alert('Pelanggan berhasil ditambahkan!');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleDeleteCustomer = async (id) => {
    if (window.confirm('Yakin ingin hapus pelanggan ini?')) {
      try {
        await fetch(`http://localhost:5000/api/customers/${id}`, { method: 'DELETE' });
        fetchCustomers();
        alert('Pelanggan berhasil dihapus!');
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }
  };

  if (loading) return <div className="page-container"><p>Memuat pelanggan...</p></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>← Kembali</button>
        <h1>👥 Kelola Pelanggan</h1>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Tutup Form' : '+ Tambah Pelanggan'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {showForm && (
        <form onSubmit={handleAddCustomer} className="customer-form">
          <input
            type="text"
            placeholder="Nama Pelanggan"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Telepon"
            value={formData.telepon}
            onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
            required
          />
          <textarea
            placeholder="Alamat"
            value={formData.alamat}
            onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
          ></textarea>
          <button type="submit">Simpan Pelanggan</button>
        </form>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Telepon</th>
              <th>Alamat</th>
              <th>Total Pembelian</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer, index) => (
                <tr key={customer.id}>
                  <td>{index + 1}</td>
                  <td>{customer.nama}</td>
                  <td>{customer.email || '-'}</td>
                  <td>{customer.telepon}</td>
                  <td>{customer.alamat || '-'}</td>
                  <td>Rp {parseInt(customer.totalPembelian || 0).toLocaleString('id-ID')}</td>
                  <td>
                    <button className="btn-delete" onClick={() => handleDeleteCustomer(customer.id)}>Hapus</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" style={{ textAlign: 'center' }}>Tidak ada pelanggan</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerPage;
