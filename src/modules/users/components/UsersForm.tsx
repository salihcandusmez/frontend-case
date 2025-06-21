import React, { useEffect } from 'react';
import { Form, Input, Button, Select, Typography, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import type { RootState, AppDispatch } from '../../../core/store';
import { addUser, updateUser } from '../store/usersSlice';
import type { User } from '../../../mock/types/user';
import './User.css';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;
const { Option } = Select;

/**
 * UsersForm.tsx
 * User add/edit form component with validation and Redux integration.
 */

/**
 * UsersForm Component
 * Handles both adding and editing users. Uses Ant Design Form and Redux Toolkit for state management.
 * On submit, dispatches addUser or updateUser depending on mode.
 */
const UsersForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { items } = useSelector((state: RootState) => state.users);
  const { t } = useTranslation();

  const [form] = Form.useForm<User>();

  const editing = Boolean(id);
  const user = editing ? items.find((u) => u.id === id) : undefined;

  useEffect(() => {
    if (editing && user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
  }, [editing, user, form]);

  const onFinish = (values: User) => {
    if (editing && user) {
      dispatch(updateUser({ ...user, ...values }));
      message.success(t('update') + ' ' + t('users') + '!');
    } else {
      const newUser: User = {
        ...values,
        id: Date.now().toString(),
      };
      dispatch(addUser(newUser));
      message.success(t('add_user') + ' ' + t('users') + '!');
    }
    navigate('/users');
  };

  return (
    <div className="user-form-container">
      <Title level={3}>{editing ? t('edit') : t('add_user')}</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label={t('user_name')}
          rules={[
            { required: true, message: t('user_name') + ' ' + t('required') },
            { min: 2, message: t('min', { count: 2 }) },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label={t('email')}
          rules={[
            { required: true, message: t('email') + ' ' + t('required') },
            { type: 'email', message: t('email_format') },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="role"
          label={t('role')}
          rules={[{ required: true, message: t('role') + ' ' + t('required') }]}
        >
          <Select placeholder={t('role')} allowClear>
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="status"
          label={t('status')}
          rules={[{ required: true, message: t('status') + ' ' + t('required') }]}
        >
          <Select placeholder={t('status')} allowClear>
            <Option value="active">{t('active')}</Option>
            <Option value="inactive">{t('inactive')}</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" aria-label={editing ? t('update') : t('save')}>
            {editing ? t('update') : t('save')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UsersForm;
