/* eslint-disable no-unused-vars */
import React, {
  useEffect, useRef, useState,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Col } from 'antd';
import { getProducts, searchProductName } from '../../api/apiProducts';
import CardItem from '../../components/Layout/CardItem/CardItem';
import PaginationItems from '../../components/Layout/Pagination/PaginationItems';
import styles from './ProductItem.module.scss';
import ProductDetail from '../ProductDetail/ProductDetail';
import useLoading from '../../hooks/useLoading';
import useDebounce from '../../hooks/useDebounce';
import SearchByName from '../../components/Layout/SearchByName/SearchByName';

const cx = classNames.bind(styles);

function ProductItem({ isProductManage }) {
  const history = useHistory();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const [productItems, setProductItems] = useState();
  const [pagination, setPanigation] = useState([]);
  const [loading, setLoading] = useLoading(false);
  const debounced = useDebounce(searchValue, 1000);
  const inputRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const respone = await searchProductName(encodeURIComponent(debounced));
      setProductItems(respone.data.data);
      setPanigation(respone.data);
    };
    fetchData();
  }, [debounced]);

  function handleOnChange(e) {
    const currentLocation = window.location.href;
    const params = new URLSearchParams(currentLocation.search);
    params.delete('name');
    params.append('name', e.target.value);
    history.push({
      pathname: currentLocation.pathname,
      search: `?${params}`,
    });
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    console.log(loading);
    setLoading(true);
    const apiProductsItem = async () => {
      const currentLocation = window.location;
      const params = new URLSearchParams(currentLocation.search) || '';
      const page = (params.get('page'));
      const category = (params.get('category') || '');
      const manufacturer = (params.get('manufacturer') || '');
      const response = await getProducts(category, manufacturer, Number(page));
      setProductItems(response.data.data);
      console.log('productsItem', response.data.data);
      setPanigation(response.data);
      console.log('page', response.data);
    };
    apiProductsItem();
  }, [location]);
  const handlePageChange = (newPage) => {
    const currentLocation = window.location;
    const params = new URLSearchParams(currentLocation.search);
    params.delete('page');
    params.append('page', newPage);
    history.push({
      pathname: currentLocation.pathname,
      search: `?${params}`,
    });
  };
  return (
    <>
      <SearchByName value={searchValue} ref={inputRef} onChange={handleOnChange} />
      <div className={cx('content-list')}>
        <div
          style={{
            width: '90%', height: '85%', display: 'flex', flexWrap: 'wrap',
          }}
        >
          {productItems && productItems.map((item) => (
            <Col span={8} style={{ height: '45%' }}>
              <CardItem
                data={item}
                key={item._id}
                isProductManage={isProductManage}
              />
            </Col>
          ))}
        </div>
        <div style={{ height: '5%' }}>
          <PaginationItems
            pagination={pagination}
            onChange={handlePageChange}
          />
        </div>
      </div>
      <ProductDetail />
    </>
  );
}

export default ProductItem;
