import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../core/store';
import { getUsers } from '../store/usersSlice';
import type { User } from '../../../mock/types/user';
import { Table, Tag, Spin, Alert, Button, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import './User.css';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/es/table';
import type { Breakpoint } from 'antd/es/_util/responsiveObserver';

/**
 * UsersList.tsx
 * User listing component with table, navigation, and edit actions.
 */
/**
 * Main user listing component
 */
const UsersList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state: RootState) => state.users);
  const { t } = useTranslation();

  // Load users only if not already loaded
  useEffect(() => {
    if (items.length === 0) {
      dispatch(getUsers());
    }
  }, [dispatch, items.length]);

  // Show loading spinner
  if (loading) return <Spin tip="Loading..." />;
  // Show error alert
  if (error) return <Alert type="error" message={error} />;

  // Table columns definition
  const columns: ColumnsType<User> = [
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'] as Breakpoint[],
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
      responsive: ['sm', 'md', 'lg', 'xl'] as Breakpoint[],
    },
    {
      title: t('role'),
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => <Tag color={role === 'admin' ? 'geekblue' : 'green'}>{role}</Tag>,
      responsive: ['md', 'lg', 'xl'] as Breakpoint[],
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'volcano'}>
          {status === 'active' ? t('active') : t('inactive')}
        </Tag>
      ),
      responsive: ['md', 'lg', 'xl'] as Breakpoint[],
    },
    {
      title: t('actions'),
      key: 'action',
      render: (_: unknown, record: User) => (
        <Button
          type="link"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/users/edit/${record.id}`);
          }}
        >
          {t('edit')}
        </Button>
      ),
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'] as Breakpoint[],
    },
  ];

  // Show empty state if no users
  if (items.length === 0) {
    return <Empty description={t('no_users')} className="ant-empty" />;
  }

  return (
    <div className="users-table-scroll">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={items}
        pagination={false}
        scroll={{ x: 500 }}
        onRow={(record) => ({
          onClick: () => navigate(`/users/${record.id}`),
          style: { cursor: 'pointer' },
        })}
      />
    </div>
  );
};

export default UsersList;
