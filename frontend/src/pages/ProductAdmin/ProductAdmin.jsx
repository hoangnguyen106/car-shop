import classNames from 'classnames/bind';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
} from 'antd';
import React, { useState } from 'react';
import styles from './ProductAdmin.module.scss';
import FormAdd from '../../components/Layout/FormAdd';
import ProductItem from '../ProductItem';

const cx = classNames.bind(styles);
function ProductAdmin() {
  const isProductManage = true;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  return (
    <div
      className={cx('content-container')}
      style={{
        position: 'absolute', display: 'flex', height: 'calc(100% - 83px)', width: '74%', left: '26%',
      }}
    >
      <div className={cx('content-search')}>
        <Button
          onClick={showModal}
          style={{
            height: '48px', width: '16%', padding: '4px 4px', background: 'transparent', color: '#00CCFF', border: '1px solid #00CCFF', borderRadius: '6px', fontSize: '1.4rem', textAlign: 'center', fontWeight: '400', fontFamily: 'Inter', cursor: 'pointer',
          }}
        >
          Thêm sản phẩm
        </Button>
        {/* <div className={cx('content-box')}>
          <button type="button" className={cx('content-btnSearch')}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <input
            type="text"
            placeholder="Search..."
          />
        </div> */}
      </div>
      <FormAdd
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      />
      <ProductItem isProductManage={isProductManage} showModal={showModal} />
    </div>
  );
}

export default ProductAdmin;
