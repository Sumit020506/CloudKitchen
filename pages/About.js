import React from 'react';

const About = () => {
  return (
    <div className="container">
      <div className="card">
        <h2 className="text-center mb-4">About Cloud Kitchen</h2>
        
        <div className="row">
          <div className="col-md-6">
            <h3>Our Story</h3>
            <p>
              Cloud Kitchen was founded in 2020 with a simple mission: to deliver 
              delicious, high-quality food straight to your door. We work with 
              talented chefs to create diverse menus that cater to all tastes.
            </p>
            <p>
              Our cloud kitchen model allows us to focus on what matters most - 
              creating amazing food without the overhead of a traditional restaurant.
            </p>
          </div>
          
          <div className="col-md-6">
            <h3>Our Values</h3>
            <ul>
              <li>Quality ingredients sourced locally</li>
              <li>Sustainable packaging solutions</li>
              <li>Supporting local communities</li>
              <li>Innovative culinary experiences</li>
              <li>Exceptional customer service</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4">
          <h3>Our Team</h3>
          <p>
            Our team of experienced chefs and food enthusiasts are passionate about 
            creating memorable dining experiences. We continuously experiment with 
            new flavors and techniques to bring you the best possible meals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;