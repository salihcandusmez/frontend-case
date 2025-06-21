/**
 * ProductsForm.tsx
 * Product add/edit form component with React Hook Form, Yup validation, and i18n support.
 * Handles both adding and editing products. Uses Redux Toolkit for state management.
 */
import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Select, Typography, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import type { RootState, AppDispatch } from '../../../core/store';
import { addProduct, updateProduct } from '../store/productsSlice';
import type { Product } from '../../../mock/types/product';
import './Product.css';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productValidationSchema } from '../validation/productValidationSchema';

const { Title } = Typography;
const { Option } = Select;

/**
 * ProductFormValues
 * Form value type for product add/edit form (excluding id).
 */
type ProductFormValues = Omit<Product, 'id'>;

/**
 * Main ProductsForm component
 * Handles both add and edit logic, validation, and Redux integration.
 */
const ProductsForm: React.FC = () => {
  // Redux and router hooks
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { items } = useSelector((state: RootState) => state.products);
  const { t } = useTranslation();

  // Determine if editing or adding
  const editing = Boolean(id);
  const product = editing ? items.find((p) => p.id === id) : undefined;

  /**
   * React Hook Form setup with Yup validation and i18n error messages
   */
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>({
    resolver: yupResolver(productValidationSchema(t)), // Use i18n-aware Yup schema
    defaultValues: {
      name: '',
      price: undefined,
      description: '',
      category: undefined,
    },
  });

  /**
   * If editing, set form fields to product values
   */
  useEffect(() => {
    if (editing && product) {
      reset({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
      });
    }
  }, [editing, product, reset]);

  /**
   * Handle form submit
   * Dispatches add or update action depending on mode
   * @param values Product form values
   */
  const onSubmit = (values: ProductFormValues) => {
    const fixedValues = { ...values, price: Number(values.price) };
    if (editing && product) {
      dispatch(updateProduct({ ...product, ...fixedValues }));
      message.success(t('update') + ' ' + t('products') + '!');
    } else {
      const newProduct: Product = {
        ...fixedValues,
        id: Date.now().toString(),
      };
      dispatch(addProduct(newProduct));
      message.success(t('add_product') + ' ' + t('products') + '!');
    }
    navigate('/products');
  };

  // Extract unique categories for select options
  const categories = Array.from(new Set(items.map((item) => item.category)));

  return (
    <div className="product-form-container">
      {/* Form title changes based on add/edit mode */}
      <Title level={3}>{editing ? t('edit') : t('add_product')}</Title>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {/* Product Name Field (required) */}
        <Form.Item
          label={t('product_name')}
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.message}
        >
          <Controller name="name" control={control} render={({ field }) => <Input {...field} />} />
        </Form.Item>
        {/* Price Field (required, positive number) */}
        <Form.Item
          label={t('price')}
          validateStatus={errors.price ? 'error' : ''}
          help={errors.price?.message}
        >
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <InputNumber {...field} min={0} className="product-input-number" />
            )}
          />
        </Form.Item>
        {/* Description Field (required) */}
        <Form.Item
          label={t('description')}
          validateStatus={errors.description ? 'error' : ''}
          help={errors.description?.message}
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => <Input.TextArea rows={3} {...field} />}
          />
        </Form.Item>
        {/* Category Field (required, select) */}
        <Form.Item
          label={t('category')}
          validateStatus={errors.category ? 'error' : ''}
          help={errors.category?.message}
        >
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                allowClear
                placeholder={t('select_category')}
                onChange={(value) => field.onChange(value)}
              >
                {categories.map((cat) => (
                  <Option key={cat} value={cat}>
                    {cat}
                  </Option>
                ))}
              </Select>
            )}
          />
        </Form.Item>
        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" aria-label={editing ? t('update') : t('save')}>
            {editing ? t('update') : t('save')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductsForm;
