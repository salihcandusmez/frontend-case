/**
 * App.tsx
 * Main application layout with Ant Design Header and Content (top navigation bar).
 */
import 'normalize.css';
import './core/i18n';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import ProductsPage from './modules/products/components/ProductsPage';
import ProductDetail from './modules/products/components/ProductDetail';
import ProductsForm from './modules/products/components/ProductsForm';
import UsersPage from './modules/users/components/UsersPage';
import UsersForm from './modules/users/components/UsersForm';
import UserDetail from './modules/users/components/UserDetail';
import { Layout, Menu, Typography, Select } from 'antd';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import './App.css';
import { useTranslation } from 'react-i18next';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const PAGE_TITLES: Record<string, string> = {
  products: 'products',
  users: 'users',
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedKey = location.pathname.startsWith('/users') ? 'users' : 'products';
  const { t, i18n } = useTranslation();
  const pageTitle = t(PAGE_TITLES[selectedKey]);

  return (
    <Layout className="app-layout">
      <Header className="custom-header custom-header-flex">
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => navigate(key === 'products' ? '/products' : '/users')}
          className="custom-menu custom-menu-flex"
        >
          <Menu.Item key="products" icon={<AppstoreOutlined />}>
            {t('products')}
          </Menu.Item>
          <Menu.Item key="users" icon={<UserOutlined />}>
            {t('users')}
          </Menu.Item>
        </Menu>
        <Select
          value={i18n.language}
          onChange={(lng) => i18n.changeLanguage(lng)}
          className="custom-lang-select"
          aria-label="Language Switcher"
        >
          <Option value="en">English</Option>
          <Option value="tr">Türkçe</Option>
        </Select>
      </Header>
      <Content className="app-content">
        <Title level={3} className="app-title">
          {pageTitle}
        </Title>
        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/add" element={<ProductsForm />} />
          <Route path="/products/edit/:id" element={<ProductsForm />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/add" element={<UsersForm />} />
          <Route path="/users/edit/:id" element={<UsersForm />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
