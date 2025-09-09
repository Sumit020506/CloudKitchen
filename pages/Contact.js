import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card">
            <h2 className="text-center mb-4">Contact Us</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  className="form-control"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
          
          <div className="card mt-4">
            <h4 className="mb-3">Visit Us</h4>
            <p>
              <strong>Address:</strong> 123 Food Street, Culinary District, Cityville 10001
            </p>
            <p>
              <strong>Email:</strong> info@cloudkitchen.com
            </p>
            <p>
              <strong>Phone:</strong> (555) 123-4567
            </p>
            <p>
              <strong>Hours:</strong> Monday-Sunday, 10:00 AM - 10:00 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;