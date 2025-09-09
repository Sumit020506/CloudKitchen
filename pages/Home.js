import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>Delicious Food Delivered</h1>
          <p>Experience the best cloud kitchen service in town</p>
          <Link to="/menu" className="btn btn-primary btn-lg">
            Order Now
          </Link>
        </div>
      </section>
      
      <section className="container mt-5">
        <div className="text-center mb-5">
          <h2>Why Choose Us?</h2>
          <p>We provide the best food delivery experience</p>
        </div>
        
        <div className="row">
          <div className="col-md-4 text-center">
            <h3>Fresh Ingredients</h3>
            <p>We use only the freshest ingredients in all our dishes</p>
          </div>
          <div className="col-md-4 text-center">
            <h3>Fast Delivery</h3>
            <p>Get your food delivered hot and fresh within 30 minutes</p>
          </div>
          <div className="col-md-4 text-center">
            <h3>Variety of Choices</h3>
            <p>From appetizers to desserts, we have something for everyone</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;