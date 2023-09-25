/* eslint-disable no-unused-vars */
import './index.scss';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Button, Modal,
} from 'antd';
import { deleteProducts } from '../../../api/apiProducts';
import ModalDeleteSuccess from './ModalDeleteSuccess';

function ModalDelete({
  setIsModalVisible, isModalVisible, data,
}) {
  const [isModalDeleteSuccessVisible, setIsModalDeleteSuccessVisible] = useState(false);
  const handleOk = () => {
    const getApi = async () => {
      console.log(data);
      await deleteProducts(data._id);
    };
    getApi();
    setIsModalVisible(false);
    setIsModalDeleteSuccessVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Modal centered visible={isModalVisible} onCancel={handleCancel} footer={null} bodyStyle={{ padding: '50px' }}>
        <div
          style={{
            width: '100%', height: '100%',
          }}
        >
          {data ? (
            <div
              style={{
                display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',
              }}
            >
              <p>
                <img src="deleteIcon.png" alt="" style={{ width: '67.47px', height: '82.8px' }} />
              </p>
              <div style={{ paddingTop: '40px' }}>
                <span>Bạn có muốn xóa sản phẩm <span style={{ color: 'red' }}>{data.name}</span> ?</span>
              </div>
              <div>
                <span>Sản phẩm sẽ bị <span style={{ color: 'red' }}>xóa vĩnh viễn</span></span>
              </div>
            </div>
          ) : (
            <p />
          )}
        </div>
        <div
          style={{
            paddingTop: '50px', width: '100%', display: 'flex', justifyContent: 'space-around',
          }}
        >
          <Button
            onClick={handleCancel}
            style={{
              borderRadius: '16px', boxShadow: '0px 4px 8px rgba(136, 152, 170, 0.2)', width: '35%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >Không
          </Button>
          <Button
            onClick={handleOk}
            style={{
              borderRadius: '16px', boxShadow: '0px 4px 8px rgba(136, 152, 170, 0.2)', width: '35%', height: '100%', display: 'flex', alignItems: 'center', backgroundColor: "red", color: "#FFFFFF", justifyContent: 'center',
            }}
          >Xóa
          </Button>
        </div>
      </Modal>
      <ModalDeleteSuccess
        data={data}
        isModalDeleteSuccessVisible={isModalDeleteSuccessVisible}
        setIsModalDeleteSuccessVisible={setIsModalDeleteSuccessVisible}
      />
    </div>
  );
}

export default ModalDelete;
