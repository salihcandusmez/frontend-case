/**
 * ProductsPage Component
 * Displays the products header and the ProductsList component.
 */
import React from 'react';
import { Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ProductsList from './ProductsList';
import './Product.css';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

/**
 * Main products page component
 */
const ProductsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div>
      <div className="products-header">
        <Title level={2} className="product-title">
          {t('products')}
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/products/add')}>
          {t('add_product')}
        </Button>
      </div>
      <ProductsList />
    </div>
  );
};

export default ProductsPage;
