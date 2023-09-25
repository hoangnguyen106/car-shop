/* eslint-disable no-unused-vars */
import { MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getCategories, getManufacturerByCategory, getManufacturers } from '../../../api/apiCategories';

function getItem(label, key, children, type) {
  return {
    key,
    label,
    children,
    type,
  };
}
function SideBar({
  data, onClick, keyNote, defaultValue, disable,
}) {
  console.log('this is data:', data);
  console.log('this is data name:');
  console.log('this is onClick:', onClick);
  const convertArrayToObject = (array) => {
    console.log(array);
    // eslint-disable-next-line no-underscore-dangle
    const a = array.map((item) => {
      console.log("Item =>>>>>>>", item);
      return getItem(item.name, item._id);
    });
    return a;
  };
  let items;
  if (data) {
    items = [
      getItem(keyNote, 'sub1',
        convertArrayToObject(data)),
    ];
  }
  return (
    <>
      {defaultValue.length > 0 && data ? (
        <div>
          <Menu
            disabled={disable}
            defaultSelectedKeys={defaultValue}
            onClick={onClick}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
            style={{
              width: '100%',
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '16px',
              lineHeight: '88.69%',
              background: 'white',
            }}
          />
        </div>
      ) : (
        <div />
      )}
    </>
  );
}
export default SideBar;
