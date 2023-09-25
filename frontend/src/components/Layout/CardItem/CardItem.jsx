/* eslint-disable no-unused-vars */
import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import ModalDelete from '../Modal/ModalDelete';
// import Button from '../../Button/Button';
import './CardItem.scss';

function CardItem({ data, isProductManage }) {
  console.log(data._id);
  const linkDetaiProduct = `/products/${data._id}`;
  const linkProductUpdate = `/update/${data._id}`;
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  return (
    <div
      className="card"
      style={{ height: '100%', width: '90%' }}
    >
      <Link to={linkDetaiProduct} style={{ height: '65%', width: '100%' }}>
        <div className="card-image" style={{ height: '65%', width: '100%' }}>
          <img src={data.avatar} alt="" style={{ width: '100%', height: '100%' }} />
        </div>
      </Link>
      <div className="container" style={{ height: '30%', width: '100%' }}>
        {isProductManage ? (
          <>
            <span key={data._id} className="cart-name">{data.name}</span>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
              <div style={{ width: '45%', height: '78%' }}>
                <Link to={linkProductUpdate}>
                  <Button
                    type="update"
                    danger
                    style={{
                      backgroundColor: '#6ECB63', border: 'none', color: 'white', borderRadius: '5px', cursor: 'pointer', height: '100%', width: '100%',
                    }}
                  >Cập nhật
                  </Button>
                </Link>
              </div>
              <div style={{ width: '45%', height: '80%' }}>
                <Button
                  type="primary"
                  danger
                  onClick={showModal}
                  style={{
                    backgroundColor: '#FF4D4D', border: 'none', color: 'white', borderRadius: '5px', cursor: 'pointer', height: '100%', width: '100%',
                  }}
                >Xóa
                </Button>
              </div>
            </div>
            <ModalDelete
              setIsModalVisible={setIsModalVisible}
              isModalVisible={isModalVisible}
              data={data}
            />
          </>
        ) : (
          <>
            <h4>
              <span
                style={{
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  fontSize: '16px',
                  lineHeight: '150%',
                  letterSpacing: '0.35px',
                  color: '#171B2F',
                }}
              >
                {data.name}
              </span>
            </h4>
            <h4>
              <b
                style={{
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '16px',
                  lineHeight: '170%',
                  display: 'flex',
                  alignItems: 'center',
                  letterSpacing: '0.35px',
                  color: '#62677A',
                }}
              >
                $ {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </b>
            </h4>
          </>
        )}
      </div>
    </div>
  );
}

export default CardItem;
