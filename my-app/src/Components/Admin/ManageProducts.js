import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class ManageProducts extends Component {
    state = {
        products: [],
        error: '',
        id: '',
        name: '',
        price: '',
        imageUrl: '',
        latest: false,
        category: '',
        featured: false,
        sizes: '',
        colors: '',
        quantity: ''
    };

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = async () => {
        try {
            const response = await axios.get('/products/all/x');
            console.log('Fetched products:', response.data);
            this.setState({ products: response.data });
        } catch (error) {
            console.error('Error fetching products:', error);
            this.setState({ error: 'Failed to fetch products' });
        }
    };

    handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        this.setState({ [name]: type === 'checkbox' ? checked : value });
    };

    handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`/products/${productId}`);
            this.fetchProducts(); // Refresh the product list after deletion
        } catch (error) {
            console.error('Error deleting product:', error);
            this.setState({ error: 'Failed to delete product' });
        }
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { id, name, price, imageUrl, latest, category, featured, sizes, colors, quantity } = this.state;

        try {
            await axios.post('/products', {
                id,
                name,
                price,
                imageUrl,
                latest,
                category,
                featured,
                sizes: sizes.split(','),
                colors: colors.split(','),
                quantity
            });
            alert('Product added successfully');
            this.setState({
                id: '',
                name: '',
                price: '',
                imageUrl: '',
                latest: false,
                category: '',
                featured: false,
                sizes: '',
                colors: '',
                quantity: ''
            });
            this.fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error);
            this.setState({ error: 'Failed to add product' });
        }
    };

    render() {
        const { products, error, id, name, price, imageUrl, latest, category, featured, sizes, colors, quantity } = this.state;

        if (error) {
            return <div>Error: {error}</div>;
        }

        return (
            <div className="home-container bg-black text-light pb-4">
                <section className="add-product-form">
                    <div className="container" style={{ paddingTop: '40px' }}>
                        <h2 className="text-left text-warning font-weight-bold">ADD NEW PRODUCT</h2>
                        <form onSubmit={this.handleSubmit} className="mt-3">
                            <div className="form-group">
                                <input type="text" className="form-control" name="id" value={id} onChange={this.handleChange} placeholder="Product ID" required />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange} placeholder="Product Name" required />
                            </div>
                            <div className="form-group">
                                <input type="number" className="form-control" name="price" value={price} onChange={this.handleChange} placeholder="Product Price" required />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="imageUrl" value={imageUrl} onChange={this.handleChange} placeholder="Image URL" required />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="category" value={category} onChange={this.handleChange} placeholder="Category" required />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="sizes" value={sizes} onChange={this.handleChange} placeholder="Sizes" required />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="colors" value={colors} onChange={this.handleChange} placeholder="Colors" required />
                            </div>
                            <div className="form-group">
                                <input type="number" className="form-control" name="quantity" value={quantity} onChange={this.handleChange} placeholder="Quantity" required />
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" name="latest" checked={latest} onChange={this.handleChange} />
                                <label className="form-check-label">Latest</label>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" name="featured" checked={featured} onChange={this.handleChange} />
                                <label className="form-check-label">Featured</label>
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">Add Product</button>
                        </form>
                    </div>
                </section>

                <section className="featured-products">
                    <div className="container" style={{ paddingTop: '40px' }}>
                        <div className="row">
                            {products.map(product => (
                                <div className="col-md-4 mb-4" key={product.id}>
                                    <div className="card">
                                        <img src={product.imageUrl} className="card-img-top" alt={product.name} />
                                        <div className="card-body" >
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">{product.price}</p>
                                            <Link to={`/adminproducts/${product.id}`} className="btn btn-secondary mr-2">View Details</Link>

                                            <button className="btn btn-danger ml-3" onClick={() => this.handleDeleteProduct(product.id)} style={{}}>
                                                <i className="fas fa-trash"></i> Delete
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default ManageProducts;
