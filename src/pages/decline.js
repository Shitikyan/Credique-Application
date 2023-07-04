import React from 'react';
import './pages.css'

const Decline = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ color: 'red' }}>Form Submission Failed</h2>
      <p>Sorry, there was an error saving your form submission.</p>
    </div>
  );
};

export default Decline;
