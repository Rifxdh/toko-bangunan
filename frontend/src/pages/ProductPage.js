import React, { useState, useEffect } from 'react';
import './ProductPage.css';

function ProductPage({ onBack }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    kategori: 'Material',
    harga: '',
    stok: '',
    deskripsi: ''
  });

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/products');
      const result = await response.json();
      setProducts(result.data || []);
      setError(null);
    } catch (err) {
      setError('Gagal memuat produk: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          harga: parseInt(formData.harga),
          stok: parseInt(formData.stok)
        })
      });

      if (response.ok) {
        setFormData({ nama: '', kategori: 'Material', harga: '', stok: '', deskripsi: '' });
        setShowForm(false);
        fetchProducts();
        alert('Produk berhasil ditambahkan!');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Yakin ingin hapus produk ini?')) {
      try {
        await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
        fetchProducts();
        alert('Produk berhasil dihapus!');
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }
  };

  if (loading) return <div className="page-container"><p>Memuat produk...</p></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>← Kembali</button>
        <h1>📦 Kelola Produk</h1>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Tutup Form' : '+ Tambah Produk'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {showForm && (
        <form onSubmit={handleAddProduct} className="product-form">
          <input
            type="text"
            placeholder="Nama Produk"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            required
          />
          <select
            value={formData.kategori}
            onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
          >
            <option value="Material">Material</option>
            <option value="Finishing">Finishing</option>
            <option value="Peralatan">Peralatan</option>
            <option value="Lainnya">Lainnya</option>
          </select>
          <input
            type="number"
            placeholder="Harga"
            value={formData.harga}
            onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Stok"
            value={formData.stok}
            onChange={(e) => setFormData({ ...formData, stok: e.target.value })}
            required
          />
          <textarea
            placeholder="Deskripsi"
            value={formData.deskripsi}
            onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
          ></textarea>
          <button type="submit">Simpan Produk</button>
        </form>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Produk</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.nama}</td>
                  <td>{product.kategori}</td>
                  <td>Rp {parseInt(product.harga).toLocaleString('id-ID')}</td>
                  <td>{product.stok}</td>
                  <td>{product.deskripsi || '-'}</td>
                  <td>
                    <button className="btn-delete" onClick={() => handleDeleteProduct(product.id)}>Hapus</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" style={{ textAlign: 'center' }}>Tidak ada produk</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductPage;
