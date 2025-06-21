import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../core/store';
import { removeUser } from '../store/usersSlice';
import { Card, Button, Typography, Popconfirm, message, Space, Tag } from 'antd';
import { DeleteOutlined, ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import './User.css';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

/**
 * UserDetail.tsx
 * User detail view with edit and delete actions.
 */

/**
 * Main user detail component
 */
const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.users);
  const { t } = useTranslation();
  // Find user by id from route params
  const user = items.find((u) => u.id === id);

  if (!user) {
    return <Paragraph>{t('not_found', { item: t('users') })}</Paragraph>;
  }

  /**
   * Handle user delete
   */
  const handleDelete = () => {
    dispatch(removeUser(user.id));
    message.success(t('delete') + ' ' + t('users') + '!');
    navigate('/users');
  };

  return (
    <Card
      title={user.name}
      className="user-detail-container"
      actions={[
        <Space key="actions">
          <Button icon={<EditOutlined />} onClick={() => navigate(`/users/edit/${user.id}`)}>
            {t('edit')}
          </Button>
          <Popconfirm
            title={t('delete_confirm', { item: t('users') })}
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
      <Title level={4}>{user.name}</Title>
      <Paragraph>
        <b>{t('email')}:</b> {user.email}
      </Paragraph>
      <Paragraph>
        <b>{t('role')}:</b>{' '}
        <Tag color={user.role === 'admin' ? 'geekblue' : 'green'}>{user.role}</Tag>
      </Paragraph>
      <Paragraph>
        <b>{t('status')}:</b>{' '}
        <Tag color={user.status === 'active' ? 'green' : 'volcano'}>
          {user.status === 'active' ? t('active') : t('inactive')}
        </Tag>
      </Paragraph>
    </Card>
  );
};

export default UserDetail;
