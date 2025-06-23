import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../Components/footer.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            error: null
        };
    }

    changecarouselborder = () => {

    }
    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = async () => {
        try {
            const response = await axios.get('/products/featured');
            console.log('Fetched products:', response.data);
            this.setState({ products: response.data });
        } catch (error) {
            console.error('Error fetching products:', error);
            this.setState({ error: 'Failed to fetch products' });
        }
    };

    render() {
        const { products, error } = this.state;

        if (error) {
            return <div>Error: {error}</div>;
        }

        return (
            <div className="home-container" style={{ backgroundColor: "black" }}>
                <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="false" style={{ padding: "30px 40px 0px 33px" }}>
                    <div className="carousel-inner" style={{ height: "100%", border: "5px solid yellow" }}>
                        <div className="carousel-item active">
                            <img src="https://outfitters.com.pk/cdn/shop/files/DV_1920x900_M_693f0a66-2a82-46e3-92c3-39a219df3b2e.jpg?v=1719394304" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://outfitters.com.pk/cdn/shop/files/DV_1920x900_M-1_7f8a02f5-8e4f-421f-b9eb-bfdf4558b656.jpg?v=1719394590" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://outfitters.com.pk/cdn/shop/files/DV_1920x900_W-1_292f38bc-04fb-4192-9339-7eb2fed5164e.jpg?v=1719394026" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://outfitters.com.pk/cdn/shop/files/DV_1920x900_W_14b74d30-98bd-4be5-b8c2-2cb438c2ab96.jpg?v=1719393865" className="d-block w-100" alt="..." />
                        </div>
                    </div>
                </div>
                <br />
                <section className="featured-products">
                    <div className="container-fluid" style={{ paddingTop: "40px", width: "80%" }}>
                        <h2 style={{ color: "yellow" }}>FEATURED PRODUCTS</h2>
                        <div className="product-list" style={{ width: "100%" }}>
                            {products.map(product => (
                                <div className="product-card" key={product.id}>
                                    <img src={`http://localhost:5000${product.imageUrl}`} alt={product.name} />
                                    <div className="product-details">
                                        <h3>{product.name}</h3>
                                        <p>{product.price}</p>
                                        <Link to={`/products/${product.id}`} className="btn btn-secondary" style={{ backgroundColor: "black" }}>View Details</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="home-container" style={{ width: "100%", paddingTop: "60px" }}>
                    <section className="banner" style={{ backgroundColor: "black", height: "300px", width: "100%", paddingTop: "40px" }}>
                        <div className="container">
                            <p style={{ fontFamily: "Roboto Condensed, sans-serif", color: "yellow", fontSize: "40px" }}>GET THE LATEST TRENDS FIRST</p>
                            <br />
                            <input className='no-border-input' type='email' placeholder='Enter your email' style={{ color: "white", fontSize: "30px", textAlign: "center", width: "300px", height: "40px", border: "none", outline: "none", backgroundColor: "black", borderBottom: "1px solid yellow" }}></input>
                            <i className="fa-solid fa-arrow-right" style={{ color: "yellow" }}></i>
                            <hr style={{ width: "10px" }}></hr>
                        </div>
                    </section>
                </div>
                <div style={{ paddingLeft: "600px" }}>
                    <ul >
                        <a href='https://www.facebook.com' target='blank'><i className="fa-brands fa-facebook" style={{ fontSize: "40px", color: "white", paddingLeft: "90px" }} ></i></a>
                        <a href='https://www.instagram.com' target='blank'><i className="fa-brands fa-instagram" style={{ fontSize: "40px", color: "white", paddingLeft: "90px" }}></i></a>
                        <i className="fa-brands fa-twitter" style={{ fontSize: "40px", color: "white", paddingLeft: "90px" }}></i>
                        <i className="fa-brands fa-youtube" style={{ fontSize: "40px", color: "white", paddingLeft: "90px" }}></i>
                        <i className="fa-brands fa-tiktok" style={{ fontSize: "40px", color: "white", paddingLeft: "90px" }}></i>
                    </ul>
                </div>
                <br />
                <br />
                <br />
                <Footer />
            </div>
        );
    }
}

export default Home;
