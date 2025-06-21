/**
 * ProductsList.tsx
 * Product listing component with search, filter, favorite, and navigation features.
 */
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../core/store';
import { fetchProducts, toggleFavorite } from '../store/productsSlice';
import { Card, Button, Spin, Alert, Row, Col, Input, Select, Space, Empty } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Product.css';
import { useTranslation } from 'react-i18next';

const { Search } = Input;
const { Option } = Select;

const ProductsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items, loading, error, favorites } = useSelector((state: RootState) => state.products);
  const { t } = useTranslation();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  // Kategorileri dinamik olarak çıkar
  const categories = useMemo(() => {
    const cats = Array.from(new Set(items.map((item) => item.category)));
    return cats;
  }, [items]);

  // Filtrelenmiş ürünler
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category ? item.category === category : true;
      return matchesSearch && matchesCategory;
    });
  }, [items, search, category]);

  const renderContent = () => {
    if (loading) {
      return <Spin tip="Yükleniyor..." />;
    }
    if (error) {
      return <Alert type="error" message={error} />;
    }
    if (items.length === 0) {
      return <Empty description={t('no_products')} className="ant-empty" />;
    }
    if (filteredItems.length === 0) {
      return <Empty description={t('no_filtered_products')} className="ant-empty" />;
    }
    return (
      <Row gutter={[16, 16]}>
        {filteredItems.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              title={product.name}
              className="product-card clickable"
              extra={
                <Button
                  type="text"
                  icon={
                    favorites.includes(product.id) ? (
                      <HeartFilled className="product-heart-red" />
                    ) : (
                      <HeartOutlined />
                    )
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleFavorite(product.id));
                  }}
                  aria-label={favorites.includes(product.id) ? t('remove_favorite') : t('favorite')}
                />
              }
              onClick={() => navigate(`/products/${product.id}`)}
              hoverable
            >
              <p>{product.description}</p>
              <p>
                <b>{t('price')}:</b> {product.price} TL
              </p>
              <p>
                <b>{t('category')}:</b> {t(`category_${product.category}`)}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <>
      <Space className="product-space-mb" wrap>
        <Search
          placeholder={t('search_product')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
          className="product-search"
        />
        <Select
          placeholder={t('select_category')}
          value={category}
          onChange={setCategory}
          allowClear
          className="product-select"
        >
          <Option value="">{t('all_categories')}</Option>
          {categories.map((cat) => (
            <Option key={cat} value={cat}>
              {t(`category_${cat}`)}
            </Option>
          ))}
        </Select>
      </Space>
      {renderContent()}
    </>
  );
};

export default ProductsList;
