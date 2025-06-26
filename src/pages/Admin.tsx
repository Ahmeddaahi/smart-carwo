import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { Database } from '../integrations/supabase/types';
import type { TablesInsert } from '../integrations/supabase/types';

type Category = Database['public']['Tables']['categories']['Row'];
type Product = Database['public']['Tables']['products']['Row'];

const Admin = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Product form state
  const [productForm, setProductForm] = useState<Partial<Product>>({});
  // Category form state
  const [categoryForm, setCategoryForm] = useState<Partial<Category>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUploadProgress, setImageUploadProgress] = useState<number | null>(null);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [imageUploadSuccess, setImageUploadSuccess] = useState<boolean>(false);

  // Fetch categories and products
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Auth protection
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!data?.session) {
        navigate('/admin/login', { replace: true });
      }
    };
    checkSession();
    // Optionally, listen for auth changes and redirect if logged out
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/admin/login', { replace: true });
      }
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [navigate]);

  async function fetchCategories() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from('categories').select('*');
    if (error) {
      setError(error.message);
    } else {
      setCategories(data || []);
    }
    setLoading(false);
  }

  async function fetchProducts() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      setError(error.message);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  }

  // Handlers for add/edit/delete
  function handleEditProduct(product: Product) {
    setEditingProduct(product);
    setProductForm(product);
    setShowProductForm(true);
    setImageFile(null);
  }
  function handleEditCategory(category: Category) {
    setEditingCategory(category);
    setCategoryForm(category);
    setShowCategoryForm(true);
  }
  function handleAddProduct() {
    setEditingProduct(null);
    setProductForm({});
    setShowProductForm(true);
    setImageFile(null);
    // Debug log
    console.log('Add Product clicked, showProductForm:', true);
  }
  function handleAddCategory() {
    setEditingCategory(null);
    setCategoryForm({});
    setShowCategoryForm(true);
  }
  async function handleDeleteProduct(id: string) {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) setError(error.message);
      else fetchProducts();
    }
  }
  async function handleDeleteCategory(id: string) {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) setError(error.message);
      else fetchCategories();
    }
  }

  // New: handle image upload immediately on file select
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageUploadError(null);
    setImageUploadSuccess(false);
    setImageUploadProgress(null);
    if (!file) return;
    setImageFile(file);
    // Check auth session
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      setImageUploadError('You must be logged in to upload images.');
      return;
    }
    // Upload to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `products/${fileName}`;
    setImageUploadProgress(0);
    // Supabase JS SDK does not support progress natively, so we show loading
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, { upsert: true });
    if (uploadError) {
      setImageUploadError(uploadError.message);
      setImageUploadProgress(null);
      return;
    }
    // Get public URL
    const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(filePath);
    if (urlData?.publicUrl) {
      setProductForm(f => ({ ...f, image: urlData.publicUrl }));
      setImageUploadSuccess(true);
      setImageUploadProgress(100);
    } else {
      setImageUploadError('Failed to get image URL.');
      setImageUploadProgress(null);
    }
  };

  async function handleProductFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    let imageUrl = productForm.image || editingProduct?.image || '';

    // No need to call uploadImage here; image is already uploaded and URL is set

    // Ensure category is null if not selected
    const categoryValue = productForm.category === '' ? null : productForm.category;

    // Use Insert type for product
    const productData: TablesInsert<'products'> = {
      ...productForm,
      image: imageUrl,
      category: categoryValue,
    } as TablesInsert<'products'>;

    if (editingProduct) {
      // Update
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingProduct.id);
      if (error) {
        setError(error.message);
        console.error('Product update error:', error);
        setLoading(false);
        return;
      }
    } else {
      // Insert
      if (!productData.name || !productData.nameen || !productData.nameso || !productData.price) {
        setError("Missing required product fields");
        setLoading(false);
        return;
      }
      const { error } = await supabase.from('products').insert(productData);
      if (error) {
        setError(error.message);
        console.error('Product insert error:', error);
        setLoading(false);
        return;
      }
    }
    setShowProductForm(false);
    fetchProducts();
    setLoading(false);
  }

  async function handleCategoryFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingCategory) {
      // Update
      const { error } = await supabase
        .from('categories')
        .update(categoryForm)
        .eq('id', editingCategory.id);
      if (error) setError(error.message);
    } else {
      // Insert
      if (!categoryForm.nameen || !categoryForm.nameso) {
        setError("Missing required category fields");
        return;
      }
      const { error } = await supabase.from('categories').insert(categoryForm as Category);
      if (error) setError(error.message);
    }
    setShowCategoryForm(false);
    fetchCategories();
  }

  // Add this handler for logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-red-500 text-white font-bold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
        <h1 className="text-4xl font-bold mb-6 text-carwo-gold">Admin Panel</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Categories */}
          <div className="flex-1 bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Categories</h2>
              <button onClick={handleAddCategory} className="bg-carwo-gold text-carwo-black px-4 py-2 rounded font-bold hover:scale-105 transition">+ Add Category</button>
            </div>
            {loading && !categories.length ? <p>Loading...</p> : 
            <ul>
              {categories.map((cat) => (
                <li key={cat.id} className="flex justify-between items-center py-2 border-b">
                  <span>{cat.nameen} / {cat.nameso}</span>
                  <div>
                    <button onClick={() => handleEditCategory(cat)} className="text-blue-600 mr-2">Edit</button>
                    <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-600">Delete</button>
                  </div>
                </li>
              ))}
            </ul>}
          </div>
          {/* Products */}
          <div className="flex-1 bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Products</h2>
              <button onClick={handleAddProduct} className="bg-carwo-gold text-carwo-black px-4 py-2 rounded font-bold hover:scale-105 transition">+ Add Product</button>
            </div>
            {loading && !products.length ? <p>Loading...</p> : 
            <ul>
              {products.map((prod) => (
                <li key={prod.id} className="flex justify-between items-center py-2 border-b">
                  <div className="flex items-center gap-4">
                    <img src={prod.image || 'https://via.placeholder.com/50'} alt={prod.nameen || ''} className="w-12 h-12 object-cover rounded"/>
                    <span>{prod.nameen} / {prod.nameso}</span>
                  </div>
                  <div>
                    <button onClick={() => handleEditProduct(prod)} className="text-blue-600 mr-2">Edit</button>
                    <button onClick={() => handleDeleteProduct(prod.id)} className="text-red-600">Delete</button>
                  </div>
                </li>
              ))}
            </ul>}
          </div>
        </div>
        {/* Product Form Modal */}
        {showProductForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <form onSubmit={handleProductFormSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg overflow-y-auto max-h-[90vh]">
              <h3 className="text-xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
              {/* Form fields for product */}
              <input type="text" placeholder="Name" value={productForm.name || ''} onChange={e => setProductForm(f => ({ ...f, name: e.target.value }))} className="mb-2 w-full border p-2 rounded" required />
              <input type="text" placeholder="Name (EN)" value={productForm.nameen || ''} onChange={e => setProductForm(f => ({ ...f, nameen: e.target.value }))} className="mb-2 w-full border p-2 rounded" required />
              <input type="text" placeholder="Name (SO)" value={productForm.nameso || ''} onChange={e => setProductForm(f => ({ ...f, nameso: e.target.value }))} className="mb-2 w-full border p-2 rounded" required />
              <select value={productForm.category || ''} onChange={e => setProductForm(f => ({ ...f, category: e.target.value }))} className="mb-2 w-full border p-2 rounded" required>
                <option value="" disabled>Select Category</option>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.nameen}</option>)}
              </select>
              <input type="number" placeholder="Price" value={productForm.price || ''} onChange={e => setProductForm(f => ({ ...f, price: Number(e.target.value) }))} className="mb-2 w-full border p-2 rounded" required />
              <label className="block mb-2 text-sm font-medium">Product Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2 w-full border p-2 rounded" />
              {/* Preview and upload status */}
              {productForm.image && (
                <img src={productForm.image} alt="Preview" className="w-24 h-24 object-cover my-2 rounded" />
              )}
              {imageUploadProgress !== null && (
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-carwo-gold h-2 rounded-full" style={{ width: `${imageUploadProgress}%` }}></div>
                </div>
              )}
              {imageUploadSuccess && <div className="text-green-600 mb-2 text-sm">Image uploaded!</div>}
              {imageUploadError && <div className="text-red-600 mb-2 text-sm">{imageUploadError}</div>}
              <textarea placeholder="Description" value={productForm.description || ''} onChange={e => setProductForm(f => ({ ...f, description: e.target.value }))} className="mb-2 w-full border p-2 rounded" />
              <textarea placeholder="Description (EN)" value={productForm.descriptionen || ''} onChange={e => setProductForm(f => ({ ...f, descriptionen: e.target.value }))} className="mb-2 w-full border p-2 rounded" required />
              <textarea placeholder="Description (SO)" value={productForm.descriptionso || ''} onChange={e => setProductForm(f => ({ ...f, descriptionso: e.target.value }))} className="mb-2 w-full border p-2 rounded" required />
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setShowProductForm(false)} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-carwo-gold text-carwo-black font-bold">Save</button>
              </div>
            </form>
          </div>
        )}
        {/* Category Form Modal */}
        {showCategoryForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <form onSubmit={handleCategoryFormSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">{editingCategory ? 'Edit Category' : 'Add Category'}</h3>
              <input type="text" placeholder="Name (EN)" value={categoryForm.nameen || ''} onChange={e => setCategoryForm(f => ({ ...f, nameen: e.target.value }))} className="mb-2 w-full border p-2 rounded" required />
              <input type="text" placeholder="Name (SO)" value={categoryForm.nameso || ''} onChange={e => setCategoryForm(f => ({ ...f, nameso: e.target.value }))} className="mb-2 w-full border p-2 rounded" required />
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setShowCategoryForm(false)} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-carwo-gold text-carwo-black font-bold">Save</button>
              </div>
            </form>
          </div>
        )}
        {/* Error/Loading */}
        {error && <div className="text-red-600 mt-4">{error}</div>}
        {loading && <div className="text-gray-600 mt-4">Loading...</div>}
      </div>
    </div>
  );
};

export default Admin; 