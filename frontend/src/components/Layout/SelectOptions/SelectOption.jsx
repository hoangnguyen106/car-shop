/* eslint-disable no-unused-vars */
import { useHistory, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getCategories, getManufacturerByCategory, getManufacturers } from '../../../api/apiCategories';
import SideBar from '../Sidebar/Sidebar';
import { OverLayContext } from '../../../context/OverlayContext/OverlayProvider';

function SelectOption() {
  const history = useHistory();
  const [apiCategory, setApiCategory] = useState();
  const [apiManufacturer, setApiManufacturer] = useState();
  const [value, setValue] = React.useState([]);
  const { disableOption } = React.useContext(OverLayContext);
  const onClickCategory = (e) => {
    setValue([]);
    const currentLocation = new URL(window.location.href);
    const params = new URLSearchParams(currentLocation.search);
    const fetchData = async () => {
      const resManuByCate = await getManufacturerByCategory(e.key);
      setApiManufacturer(resManuByCate.data.manufacturer);
    };
    fetchData();
    params.delete('manufacturer');
    params.delete('page');
    params.delete('category');
    params.append('category', e.key);
    const category = params.get('category') || '';
    const manufacturer = params.get('manufacturer') || '';
    setValue((prevArray) => [...prevArray, category, manufacturer]);
    history.push({
      pathname: currentLocation.pathname,
      search: `?${params.toString()}`,
    });
  };
  const onClickManufacture = (e) => {
    console.log('=======>', e);
    setValue([]);
    const currentLocation = new URL(window.location.href);
    // console.log(currentLocation);
    const params = new URLSearchParams(currentLocation.search);
    params.delete('page');
    params.delete('manufacturer');
    params.append('manufacturer', e.key);
    const category = params.get('category') || '';
    const manufacturer = params.get('manufacturer') || '';
    setValue((prevArray) => [...prevArray, category, manufacturer]);
    history.push({
      pathname: currentLocation.pathname,
      search: `?${params.toString()}`,
    });
  };
  useEffect(() => {
    const currentLocation = new URL(window.location.href);
    const params = new URLSearchParams(currentLocation.search);
    const category = params.get('category') || '';
    const manufacturer = params.get('manufacturer') || '';
    setValue((prevArray) => [...prevArray, category, manufacturer]);
    const getApi = async () => {
      const resCategory = await getCategories();
      // const resManufacturer = await getManufacturers();
      setApiCategory(resCategory.data);
      // setApiManufacturer(resManufacturer.data);
      console.log(resCategory.data);
      // console.log(resManufacturer.data);
    };
    getApi();
  }, [disableOption]);
  return (
    apiCategory ? (
      <div
        style={{
          width: '21%', height: '91.5%', position: 'absolute', backgroundColor: '#FFFFFF',
        }}
      >
        <SideBar data={apiCategory} onClick={onClickCategory} keyNote="DANH MỤC" defaultValue={value} disabled={disableOption} />
        <SideBar data={apiManufacturer} onClick={onClickManufacture} keyNote="HÃNG SẢN XUẨT" defaultValue={value} disabled={disableOption} />
      </div>
    ) : (
      <div />
    )
  );
}

export default SelectOption;
