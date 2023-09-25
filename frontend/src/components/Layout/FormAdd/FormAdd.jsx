/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form, Select, Modal, Upload, Button, Input, InputNumber,
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { createProduct, getProducts } from '../../../api/apiProducts';
import { getCategories, getManufacturerByCategory, getManufacturers } from '../../../api/apiCategories';
import validate from '../ValidateForm/formValidate';
import './FormAdd.scss';
import ModalFormAdd from '../Modal/ModalFormAdd';

const { Option } = Select;
const getBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => resolve(reader.result);

  reader.onerror = (error) => reject(error);
});
const FormAdd = ({ setIsModalVisible, isModalVisible }) => {
  const [isModalAddSuccessVisible, setIsModalAddSuccessVisible] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const [category, setCategory] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getCategories();
      const response2 = await getManufacturers();
      const shiftTest = response.data;
      shiftTest.shift();
      setCategory(shiftTest);
      const shifTest2 = response2.data;
      shifTest2.shift();
      setManufacturer(shifTest2);
      console.log(category, manufacturer);
    };
    fetchData();
  }, []);
  const getManufacturer = (e) => {
    const fetchData = async () => {
      const response = await getManufacturerByCategory(e);
      const shiftTest = response.data.manufacturer;
      shiftTest.shift();
      setManufacturer(shiftTest);
    };
    fetchData();
  };
  const onFinish = (values) => {
    console.log(values);
    const formField = new FormData();
    formField.append('name', values.name);
    formField.append('category', values.category);
    formField.append('manufacturer', values.manufacturer);
    formField.append('price', values.price);
    formField.append('description', values.description);
    formField.append('avatar', values.avatar.file);
    const fetchData = async () => {
      axios({
        method: 'post',
        url: 'http://localhost:5000/products',
        data: formField,
      }).then((response) => {
        setIsModalVisible(false);
        setIsModalAddSuccessVisible(true);
        setInterval(() => {
          const proId = response.data._id;
          window.location.assign(`/${proId}`);
        }, 2000);
      });
    };
    fetchData();
    setIsModalVisible(false);
  };
  const handleCancelForm = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  const handleCancelAddSuccess = () => {
    setIsModalAddSuccessVisible(false);
  };
  return (
    <>
      <Modal title="THÊM SẢN PHẨM" footer="" visible={isModalVisible} onCancel={handleCancelForm} bodyStyle={{ height: '618px', overflowY: 'scroll', padding: '16px' }}>
        <div className="form" style={{ width: '100%', height: '60%' }}>
          <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
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
                {category.map((item) => (
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
              onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
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
              <Input value="number" type="number" placeholder="Nhập giá sản phẩm" style={{ width: '100%' }} />
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
            <Form.Item
              name="avatar"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn 1 bức ảnh',
                },
              ]}
            >
              <Upload
                beforeUpload={() => false}
                maxCount={1}
              >Thêm ảnh minh họa
              </Upload>
            </Form.Item>
            <div className="btn-all">
              <Button type="button" className="btn-cancel" onClick={handleCancelForm}>Hủy</Button>
              <Button htmlType="submit" className="btn-add"><span style={{ }}>Thêm</span></Button>
            </div>
          </Form>
        </div>
      </Modal>
      <Modal visible={isModalAddSuccessVisible} onCancel={handleCancelAddSuccess} footer={null} centered>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '120px', height: '120px' }}>
            <img src="deleteIcon.png" alt="" />
          </div>
          <div>
            <span>Thêm sản phẩm thành công</span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FormAdd;
