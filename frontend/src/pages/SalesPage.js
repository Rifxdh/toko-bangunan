import React, { useState, useEffect } from 'react';
import './SalesPage.css';

function SalesPage({ onBack }) {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customerId: '',
    productId: '',
    jumlah: '',
    keterangan: ''
  });

  // Fetch data
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [salesRes, productsRes, customersRes] = await Promise.all([
        fetch('http://localhost:5000/api/sales'),
        fetch('http://localhost:5000/api/products'),
        fetch('http://localhost:5000/api/customers')
      ]);

      setSales(await salesRes.json().then(r => r.data || []));
      setProducts(await productsRes.json().then(r => r.data || []));
      setCustomers(await customersRes.json().then(r => r.data || []));
      setError(null);
    } catch (err) {
      setError('Gagal memuat data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSales = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          customerId: parseInt(formData.customerId),
          productId: parseInt(formData.productId),
          jumlah: parseInt(formData.jumlah)
        })
      });

      if (response.ok) {
        setFormData({ customerId: '', productId: '', jumlah: '', keterangan: '' });
        setShowForm(false);
        fetchAllData();
        alert('Penjualan berhasil dicatat!');
      } else {
        const error = await response.json();
        alert('Error: ' + error.message);
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleDeleteSales = async (id) => {
    if (window.confirm('Yakin ingin hapus penjualan ini?')) {
      try {
        await fetch(`http://localhost:5000/api/sales/${id}`, { method: 'DELETE' });
        fetchAllData();
        alert('Penjualan berhasil dihapus!');
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }
  };

  if (loading) return <div className="page-container"><p>Memuat penjualan...</p></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>← Kembali</button>
        <h1>💰 Catat Penjualan</h1>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Tutup Form' : '+ Catat Penjualan'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {showForm && (
        <form onSubmit={handleAddSales} className="sales-form">
          <select
            value={formData.customerId}
            onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
            required
          >
            <option value="">-- Pilih Pelanggan --</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>{c.nama}</option>
            ))}
          </select>

          <select
            value={formData.productId}
            onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
            required
          >
            <option value="">-- Pilih Produk --</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.nama} (Rp {parseInt(p.harga).toLocaleString('id-ID')})</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Jumlah"
            value={formData.jumlah}
            onChange={(e) => setFormData({ ...formData, jumlah: e.target.value })}
            required
          />

          <textarea
            placeholder="Keterangan (opsional)"
            value={formData.keterangan}
            onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
          ></textarea>

          <button type="submit">Simpan Penjualan</button>
        </form>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Pelanggan</th>
              <th>Produk</th>
              <th>Jumlah</th>
              <th>Harga Satuan</th>
              <th>Total</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sales.length > 0 ? (
              sales.map((s, index) => (
                <tr key={s.id}>
                  <td>{index + 1}</td>
                  <td>{new Date(s.tanggal).toLocaleDateString('id-ID')}</td>
                  <td>{s.Customer?.nama || '-'}</td>
                  <td>{s.Product?.nama || '-'}</td>
                  <td>{s.jumlah}</td>
                  <td>Rp {parseInt(s.hargaSatuan).toLocaleString('id-ID')}</td>
                  <td><strong>Rp {parseInt(s.total).toLocaleString('id-ID')}</strong></td>
                  <td>
                    <button className="btn-delete" onClick={() => handleDeleteSales(s.id)}>Hapus</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="8" style={{ textAlign: 'center' }}>Tidak ada penjualan</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesPage;
