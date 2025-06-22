import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
    return (
        <>
            <hr style={{ color: "white" }}></hr>
            <footer className="footer mt-3 py-3 text-center text-white" style={{ backgroundColor: "black", textAlign: "center" }}>
                <div className="container" style={{ backgroundColor: "black", textAlign: "center" }}>
                    <div className="row">
                        <div className="col-md-3 col-sm-6 " style={{ backgroundColor: "black", textAlign: "center" }} >
                            <h4>CAN WE HELP YOU?</h4>
                            <p>SEND EMAIL</p>
                            <p>CONTACTUS@WARDROBRIX.COM.PK</p>
                            <p>UAN: 042 111-11-6387</p>
                            <p>MON-FRI 9:00 TO 5:30 PST</p>
                        </div>
                        <div className="col-md-3 col-sm-6" style={{ backgroundColor: "black", textAlign: "center" }}>
                            <h4>HELP</h4>
                            <p>FAQ'S</p>
                            <p>LOG IN/SIGN UP</p>
                            <p>HOW TO BUY</p>
                            <p>PAYMENT</p>
                            <p>SHIPPING & DELIVERIES</p>
                            <p>EXCHANGE & RETURNS</p>
                        </div>
                        <div className="col-md-3 col-sm-6" style={{ backgroundColor: "black", textAlign: "center" }}>
                            <h4>ABOUT WARDROBRIX</h4>
                            <p>ABOUT US</p>
                            <p>RETAIL STORES</p>
                            <p>CONTACT US</p>
                            <p>WORK WITH US</p>
                        </div>
                        <div className="col-md-3 col-sm-6" style={{ backgroundColor: "black", textAlign: "center" }}>
                            <h4>DOWNLOAD APP</h4>
                            <div style={{ paddingTop: "10px" }}>
                                <img style={{ paddingRight: "20px" }} src="https://outfitters.com.pk/cdn/shop/files/googleplay_1.png?v=1665742718" alt="Google Play" className="img-fluid " />
                                <img src="https://outfitters.com.pk/cdn/shop/files/appstore_1.png?v=1665742718" alt="App Store" className="img-fluid" />
                            </div>
                            <h4 style={{ paddingTop: "20px" }}>PAYMENT METHODS</h4>
                            <div >
                                <img src="https://outfitters.com.pk/cdn/shop/files/Visa_663bd1fe-20b8-4575-8087-4273971957b4.png?v=1665745898" alt="Visa" className="img-fluid" />
                                <img src="https://outfitters.com.pk/cdn/shop/files/Mastercard.png?v=1665745898" alt="MasterCard" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <hr style={{ color: "white" }}></hr>
            <div className="text-center bg-black py-2">
                <p className="m-0 text-white">
                    <i className="fa fa-regular fa-copyright"></i> 2024 , WARDROBRIX / TERMS AND CONDITIONS / PRIVACY POLICY
                </p>
            </div>
        </>
    );
}

export default Footer;
