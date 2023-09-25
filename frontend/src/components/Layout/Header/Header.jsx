// import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
  // const element1 = document.getElementsByClassName(".header-product");
  // const element2 = document.getElementsByClassName(".header-product-manager");
  // function clickInnertext() {
  // }
  return (
    <div className={cx('header-container')} style={{ zIndex: '10' }}>
      <div className={cx('header-logo')}>
        <img src="logo.png" alt="" />
        <span className={cx('header-text')}>NCC</span>
      </div>
      <div className={cx('header-listItem')}>
        <ul className={cx('header-item')}>
          <li className={cx('header-product')} style={{ display: 'flex', alignItems: 'center' }}>
            <Link style={{ textDecoration: 'none', color: '#FFFFFF' }} to="/danh-sach-sp">SẢN PHẨM</Link>
          </li>
          <li className={cx('header-product-manager')} style={{ display: 'flex', alignItems: 'center' }}>
            <Link className={cx('header-active')} style={{ textDecoration: 'none', color: '#FFFFFF' }} to="/quan-ly-sp">QUẢN LÝ SẢN PHẨM</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
