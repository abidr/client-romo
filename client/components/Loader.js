import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  }}
  >
    <Spinner animation="border" role="status" size="lg" />
  </div>
);

export default Loader;
