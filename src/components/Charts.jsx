import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import HighCharts from 'highcharts';
import Navbar from './Navbar';
import axios from 'axios';

function Charts() {
  const [products, setProducts] = useState([]);

  // Fetching the products.
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products');
      setProducts(response.data);
    } catch (e) {
      console.error('Error fetching products:', e);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Counting the number of products in each category
  const categoryCounts = countProductsByCategory(products);

  const options = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Product Count by Category',
    },
    xAxis: {
      categories: getCategoryNames(categoryCounts),
      title: {
        text: 'Category',
      },
    },
    yAxis: {
      min: 0,
      max: 20,
      tickInterval: 1,
      allowDecimals: false,
      title: {
        text: 'Number of Products',
      },
    },
    series: [
      {
        name: 'Products',
        data: getCategoryCounts(categoryCounts),
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <HighchartsReact 
        highcharts={HighCharts} 
        options={options} 
        accessibility={{enabled: true}}
        />
    </div>
  );
}

// ----HELPER FUNCTIONS----

// Counting products by category
const countProductsByCategory = (products) => {
  return products.reduce((acc, product) => {
    const categoryId = product.category_id;
    if (acc[categoryId]) {
      acc[categoryId] += 1;
    } else {
      acc[categoryId] = 1;
    }
    return acc;
  }, {});
};

// Getting the category names
const getCategoryNames = (categoriesCount) => {
  return Object.keys(categoriesCount);
};

// Getting the category counts
const getCategoryCounts = (categoriesCount) => {
  return Object.values(categoriesCount);
};

export default Charts;
