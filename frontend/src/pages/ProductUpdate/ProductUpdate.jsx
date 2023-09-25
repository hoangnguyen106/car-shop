/* eslint-disable no-const-assign */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import {
  Button, Col, Form, Input, message, Row, Select, Upload,
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import validate from '../../components/Layout/ValidateForm/formValidate';
import { getProductsDetail } from '../../api/apiProducts';
import './ProductUpdate.scss';
import ImageUpdate from '../../components/ImageUpdate/ImageUpdate';
import { getCategories, getManufacturerByCategory, getManufacturers } from '../../api/apiCategories';

function ProductUpdate() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [category, setCategory] = useState([]);
  const [imageReady, setImageReady] = React.useState();
  const [manufacturer, setManufacturer] = useState([]);
  const [updateProduct, setUpdateProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [listImage, setListImage] = React.useState({
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
  });
  const { id } = useParams();
  // const handleChange = (info) => {
  //   if (info.file.status === 'uploading') {
  //     console.log('info ========>', info);
  //     console.log('info file ========>', info.file);
  //     setLoading(true);
  //     const url = URL.createObjectURL(info.file.originFileObj);
  //     setUpdateProduct({
  //       ...updateProduct,
  //       avatar: url.toString(),
  //     });
  //   }
  // };
  // console.log('image ========>', listImage);
  React.useEffect(() => {
    setListImage({
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      image5: '',
    });
    const fetchData = async () => {
      await getProductsDetail(id).then(async (response) => {
        setImageReady(false);
        setUpdateProduct(response.data);
        console.log('avatar =>>>>>>>>>>>>>>>>', response.data.avatar);
        console.log('dataaaaaaaa =>>>>>>>>>>>>>>>>', response.data);
        const urlAvatar = `${response.data.avatar}`;
        console.log('urlAvatar =>>>>>>>>', urlAvatar);
        let res = await fetch(urlAvatar);
        let blob = await res.blob();
        let file = new File([blob], '', { type: blob.type });
        setListImage((prevState) => ({
          ...prevState,
          image1: file,
        }));
        response.data.pictures.map(async (item, position) => {
          console.log('item  =>>>>>>>>', item);
          console.log('item  =>>>>>>>>', item);
          res = await fetch(item.url);
          blob = await res.blob();
          file = new File([blob], '', { type: blob.type });
          let index = 0;
          index = Number(item?.position ?? 0) + 1;
          const key = 'image';
          setListImage((prevState) => ({
            ...prevState,
            [key + index]: file,
          }));
          console.log(response.data.pictures.length);
          if (position === response.data.pictures.length - 1) {
            setImageReady(true);
          }
        });
      });
      const response1 = await getCategories();
      const response2 = await getManufacturers();
      setCategory(response1.data);
      setManufacturer(response2.data);
      console.log(category, manufacturer);
    };
    fetchData();
  }, [id]);
  const getManufacturer = (e) => {
    const fetchData = async () => {
      const response = await getManufacturerByCategory(e);
      setManufacturer(response.data.manufacturer);
    };
    fetchData();
  };
  const onFinish = (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('category', values.category);
    formData.append('manufacturer', values.manufacture);
    formData.append('price', values.price);
    formData.append('description', values.description);
    // formData.append('avatar', values.avatar.file.name);
    const potision = [];
    Object.keys(listImage).forEach((key, index) => {
      if (listImage[key] !== '') {
        potision.push(index);
        formData.append(key, listImage[key]);
      }
    });

    potision.shift();
    formData.append('potision', JSON.stringify(potision));

    const fetchData = async () => {
      axios({
        method: 'put',
        url: `http://localhost:5000/products/${id}`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((response) => {
        setInterval(() => {
          console.log(response);
          // eslint-disable-next-line no-underscore-dangle
          const proId = response.data.data._id;
          window.location.assign(`/products/${proId}`);
        }, 2000);
      });
    };
    fetchData();
    console.log(formData);
  };

  return (
    <div className="product-update">
      <div className="product-updateContent">
        <div className="update-form">
          {updateProduct ? (
            <>
              <Form
                style={{
                  width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between',
                }}
                form={form}
                layout="vertical"
                initialValues={updateProduct && {
                  name: updateProduct.name,
                  category: updateProduct.category.name,
                  manufacturer: updateProduct.manufacturer.name,
                  price: updateProduct.price,
                  description: updateProduct.description,
                }}
                onFinish={onFinish}
              >
                <div className="left">
                  <span className="title-update">Thông tin sản phẩm</span>
                  <FormItem
                    label="Tên sản phẩm"
                    name="name"
                    rules={[
                      { required: true, message: 'Hãy điền tên sản phẩm' },
                      {
                        message: 'Không chứa các kí tự đặc biệt',
                        validator: validate.validateName,
                      },
                    ]}
                    validateTrigger="onBlur"
                  >
                    <Input placeholder="Nhập vào tên sản phẩm" />
                  </FormItem>
                  <FormItem label="Danh mục sản phẩm" name="category" rules={[{ required: true, message: 'Hãy chọn một danh mục sản phẩm' }]}>
                    <Select
                      style={{ width: '100%' }}
                      placeholder="Chọn danh mục sản phẩm"
                      onChange={getManufacturer}
                    >
                      {category?.map((item) => (
                        <Option key={item._id}>{item.name}</Option>
                      ))}
                    </Select>
                  </FormItem>
                  <FormItem label="Hãng sản xuất" name="manufacturer" rules={[{ required: true, message: 'Hãy chọn một hãng sản xuất' }]}>
                    <Select
                      style={{ width: '100%' }}
                      placeholder="Chọn hãng sản xuất"
                    >
                      {manufacturer.map((item) => (
                        <Option key={item._id}>{item.name}</Option>
                      ))}
                    </Select>
                  </FormItem>
                  <FormItem
                    label="Giá"
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: 'Hãy điền vào giá sản phẩm',
                      },
                      {
                        message: 'Tối thiểu 10000',
                        validator: validate.validatePriceMinimum,
                      },
                      {
                        message: 'Tối đa 1000000000',
                        validator: validate.validatePriceMaximum,
                      },
                      {
                        message: 'Không được phép nhập số âm',
                        validator: validate.validatePriceNegative,
                      },
                    ]}
                    validateTrigger="onBlur"
                  >
                    <Input value="number" type="number" placeholder="Nhập giá sản phẩm" />
                  </FormItem>
                  <FormItem
                    label="Mô tả"
                    name="description"
                    rules={[
                      {
                        message: 'Không quá 500 kí tự',
                        validator: validate.validateDesciption,
                      },
                    ]}
                  >
                    <Input style={{ width: '100%', height: '80px' }} placeholder="Nhập mô tả" />
                  </FormItem>
                  <Button htmlType="submit" className="btn-add">Cập nhật</Button>
                </div>
                <div className="right">
                  <div className="avatar-image" style={{ width: '100%', height: '54%' }}>

                    <ImageUpdate
                      style={{ width: '100%' }}
                      data={updateProduct}
                      index="1"
                      key="image1"
                      avatar="avatar"
                      listImage={listImage}
                      setListImage={setListImage}
                    />

                  </div>
                  <Row gutter={[32, 32]} style={{ marginLeft: 'none', marginRight: 'none' }}>
                    <Col span={12}>
                      <ImageUpdate
                        index="2"
                        key="image2"
                        listImage={listImage}
                        setListImage={setListImage}
                      />
                    </Col>
                    <Col span={12}>
                      <ImageUpdate
                        index="3"
                        key="image3"
                        listImage={listImage}
                        setListImage={setListImage}
                      />
                    </Col>
                    <Col span={12}>  <ImageUpdate
                      index="4"
                      key="image4"
                      listImage={listImage}
                      setListImage={setListImage}
                    />
                    </Col>
                    <Col span={12}>
                      <ImageUpdate
                        index="5"
                        key="image5"
                        listImage={listImage}
                        setListImage={setListImage}
                      />
                    </Col>
                  </Row>
                </div>
              </Form>,
            </>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}

export default ProductUpdate;
