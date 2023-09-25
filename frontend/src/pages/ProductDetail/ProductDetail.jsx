/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import './ProductDetail.scss';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useParams } from 'react-router-dom';
import { getProductsDetail, getProductsSuggested } from '../../api/apiProducts';
import CardItem from '../../components/Layout/CardItem/CardItem';
import useLoading from '../../hooks/useLoading';
import CarouselSlide from '../../components/Layout/Carousel/CarouselSlide';
import { OverLayContext } from '../../context/OverlayContext';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
function ProductDetail() {
  const history = useHistory();
  const [productId, setProductId] = useState();
  const [showLoading, hideLoading] = useLoading();
  const [suggestProductId, setSuggestProductId] = useState([]);
  const { id } = useParams();
  const { setDisableOption } = React.useContext(OverLayContext);

  const fetchData = async () => {
    showLoading();
    const getProDetail = await getProductsDetail(id);
    const getProSuggest = await getProductsSuggested(id);
    console.log('dâdadadadadada=======>', getProDetail.data);
    setSuggestProductId(getProSuggest.data);
    setProductId(getProDetail.data);
    hideLoading();
  };
  React.useEffect(() => {
    setDisableOption(true);
    fetchData();
  }, [id]);

  return (
    <>
      {productId ? (
        <div
          className="product-detail"
          style={{
            width: '69%', height: '87%', position: 'absolute', left: '26%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div
            style={{
              height: '95%', width: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#FFFFFF', borderRadius: '20px',
            }}
          >
            <div style={{ width: '90%', height: '90%' }}>
              <div
                style={{
                  width: '100%',
                  color: '#00ADE8',
                  paddingBottom: '16px',
                }}
              >
                <button
                  className="product-return"
                  onClick={() => history.goBack()}
                >
                  <FontAwesomeIcon icon={faArrowLeftLong} />
                  <span className="product-returnText">
                    Quay lại
                  </span>
                </button>
              </div>
              <div
                className="content"
                style={{
                  display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: '45%',
                }}
              >
                <div
                  className="content-title"
                  style={{
                    width: '43%', marginBottom: '0', display: 'flex', flexDirection: 'column',
                  }}
                >
                  <p className="detail-name">{productId.name}</p>
                  <p className="detail-category">Danh mục: {productId.category.name}</p>
                  <p className="detail-manufacturer">Hãng sản xuất: {productId.manufacturer.name}</p>
                  <p className="detail-description">Mô tả sản phẩm: <br />{productId.description}</p>
                </div>
                <div className="slide-image" style={{ width: '55%' }}>
                  <CarouselSlide data={productId} />
                </div>
              </div>
              <p className="suggest-title" style={{ width: '100%', marginBottom: '0' }}>Gợi ý cho bạn</p>
              <div
                className="suggest-card"
                style={{
                  height: '45%', width: '100%', display: 'flex',
                }}
              >
                {suggestProductId && suggestProductId?.map((suggest) => (<div style={{ height: '100%', width: '40%' }}><CardItem data={suggest} /></div>))}
              </div>
            </div>
          </div>
        </div>
      ) : (<div />)}
    </>
  );
}

export default ProductDetail;
