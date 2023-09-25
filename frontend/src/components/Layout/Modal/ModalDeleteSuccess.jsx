import { Modal } from 'antd';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function ModalDeleteSuccess({ isModalDeleteSuccessVisible, data }) {
  console.log(data);
  const history = useHistory();
  const location = useLocation();
  const handleCancel = () => {
    history.push(location);
  };
  return (
    <>
      <Modal
        centered
        visible={isModalDeleteSuccessVisible}
        onCancel={handleCancel}
        footer={null}
        bodyStyle={{ padding: '50px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '120px', height: '120px' }}>
            <img src="deleteIcon.png" alt="" />
          </div>
          <div>
            <span>Xóa sản phẩm thành công</span>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ModalDeleteSuccess;
