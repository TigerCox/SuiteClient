import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';

const HomePage = () => {
  return (
    <Jumbotron>
      <h1>Vin React Starter Kit</h1>
      <h2>Get started</h2>
      <ol>
        <li>Review component examples</li>
        <li>Review example apps</li>
        <li>Remove this demo app: npm run remove-demo</li>
      </ol>
    </Jumbotron>
  );
};

export default HomePage;
