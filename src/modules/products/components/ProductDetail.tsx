import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../core/store';
import { toggleFavorite, removeProduct } from '../store/productsSlice';
import { Card, Button, Typography, Popconfirm, message, Space } from 'antd';
import {
  HeartOutlined,
  HeartFilled,
  DeleteOutlined,
  ArrowLeftOutlined,
  EditOutlined,
} from '@ant-design/icons';
import './Product.css';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

/**
 * ProductDetail.tsx
 * Product detail view with edit, delete, and favorite actions.
 */
/**
 * Main product detail component
 */
const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items, favorites } = useSelector((state: RootState) => state.products);
  const { t } = useTranslation();
  // Find product by id from route params
  const product = items.find((p) => p.id === id);

  if (!product) {
    return <Paragraph>{t('not_found', { item: t('products') })}</Paragraph>;
  }

  /**
   * Handle product delete
   */
  const handleDelete = () => {
    dispatch(removeProduct(product.id));
    message.success(t('delete') + ' ' + t('products') + '!');
    navigate('/products');
  };

  return (
    <Card
      title={product.name}
      className="product-detail-container"
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
          onClick={() => dispatch(toggleFavorite(product.id))}
          aria-label={favorites.includes(product.id) ? t('remove_favorite') : t('favorite')}
        />
      }
      actions={[
        <Space key="actions">
          <Button icon={<EditOutlined />} onClick={() => navigate(`/products/edit/${product.id}`)}>
            {t('edit')}
          </Button>
          <Popconfirm
            title={t('delete_confirm', { item: t('products') })}
            onConfirm={handleDelete}
            okText={t('yes')}
            cancelText={t('no')}
          >
            <Button danger icon={<DeleteOutlined />}>
              {t('delete')}
            </Button>
          </Popconfirm>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
            {t('back')}
          </Button>
        </Space>,
      ]}
    >
      <Title level={4}>{product.name}</Title>
      <Paragraph>{product.description}</Paragraph>
      <Paragraph>
        <b>{t('price')}:</b> {product.price} TL
      </Paragraph>
      <Paragraph>
        <b>{t('category')}:</b> {product.category}
      </Paragraph>
    </Card>
  );
};

export default ProductDetail;
