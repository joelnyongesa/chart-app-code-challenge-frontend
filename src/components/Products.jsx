import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { enqueueSnackbar } from 'notistack';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingProduct, setEditingProduct] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDetails, setEditDetails] = useState('');
  const [editCategory, setEditCategory] = useState('1');

  const [newProductName, setNewProductName] = useState('');
  const [newProductDetails, setNewProductDetails] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('1');

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products');
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError('Failed to fetch products.');
      console.error(`Error fetching products: ${error}`);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setEditName(product.name);
    setEditDetails(product.details);
    setEditCategory(product.category_id || '1');
  };

  const handleEditSubmit = async (id) => {
    try {
      await axios.patch(`/products/${id}`, {
        name: editName,
        details: editDetails,
        category_id: editCategory,
      });

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, name: editName, details: editDetails, category_id: editCategory } : product
        )
      );

      enqueueSnackbar('Product updated successfully', {variant: 'success'});

      setEditingProduct(null);
    } catch (error) {
      console.error(`Failed to update product: ${error}`);
      enqueueSnackbar('Failed to update product', {variant: 'error'});
      setError(`Failed to update product`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/products/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      enqueueSnackbar('Product deleted successfully!', {variant: 'success'});
    } catch (error) {
      enqueueSnackbar('Failed to delete product', {variant: 'error'})
      setError(`Failed to delete product`);
    }
  };

  // Adding a new product.
  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/products', {
        name: newProductName,
        details: newProductDetails,
        category_id: newProductCategory,
      });

      setProducts((previousProducts) => [...previousProducts, response.data]);
      enqueueSnackbar('Product Added Successfully!', {variant: 'success'})

      setNewProductName('');
      setNewProductDetails('');
      setNewProductCategory('1');
    } catch (e) {
        enqueueSnackbar('Failed to add product', {variant: 'error'});
      setError(`Failed to add product`);
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center mt-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-left text-gray-600 font-bold">Name</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-gray-600 font-bold">Details</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-gray-600 font-bold">Category</th>
              <th className="py-2 px-4 bg-gray-200 text-left text-gray-600 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="py-2 px-4">
                  {editingProduct === product.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="border border-gray-300 p-1"
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingProduct === product.id ? (
                    <input
                      type="text"
                      value={editDetails}
                      onChange={(e) => setEditDetails(e.target.value)}
                      className="border border-gray-300 p-1"
                    />
                  ) : (
                    product.details
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingProduct === product.id ? (
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="border border-gray-300 p-1"
                    >
                      <option value="1">Category 1</option>
                      <option value="2">Category 2</option>
                    </select>
                  ) : (
                    product.category_id === 1 ? 'Category 1' : 'Category 2'
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingProduct === product.id ? (
                    <button
                      onClick={() => handleEditSubmit(product.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                  ) : (
                    <FaEdit
                      onClick={() => handleEdit(product)}
                      className="text-blue-500 cursor-pointer mr-2"
                    />
                  )}
                  <FaTrash
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center my-5">
        <form onSubmit={handleAddProduct} className="mb-4">
          <h2 className="text-lg font-bold mb-2">Add a New Product</h2>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Product Name"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              className="border border-gray-300 p-1"
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Product Details"
              value={newProductDetails}
              onChange={(e) => setNewProductDetails(e.target.value)}
              className="border border-gray-300 p-1"
              required
            />
          </div>
          <div className="mb-2">
            <select
              value={newProductCategory}
              onChange={(e) => setNewProductCategory(e.target.value)}
              className="border border-gray-300 p-1"
            >
              <option value="1">Category 1</option>
              <option value="2">Category 2</option>
            </select>
          </div>
          <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default Products;
