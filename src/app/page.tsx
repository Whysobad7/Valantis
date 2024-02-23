"use client"
import React from 'react';
import ProductList from './components/ProductList';
import { Container } from '@mui/material';

const Home: React.FC = () => {

  return (
    <div>
		<Container>
		<ProductList />
		</Container>
    </div>
  );
};

export default Home;