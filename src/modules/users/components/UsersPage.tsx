/**
 * UsersPage Component
 * Displays the users header and the UsersList component.
 */
import React from 'react';
import { Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import UsersList from './UsersList';
import './User.css';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

/**
 * Main users page component
 */
const UsersPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div>
      <div className="users-header">
        <Title level={2} className="user-title">
          {t('users')}
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/users/add')}>
          {t('add_user')}
        </Button>
      </div>
      <UsersList />
    </div>
  );
};

export default UsersPage;
