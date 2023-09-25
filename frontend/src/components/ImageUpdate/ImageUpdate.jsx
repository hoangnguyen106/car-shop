/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-undef */
import React from "react";
import { Button } from "react-bootstrap";
import AddButton from "../../AddButton/addIcon.png";
import './ImageUpdate.scss';

function ImageUpdate({
  index, listImage, setListImage, avatar, data,
}) {
  const [chosefile, setchoseFile] = React.useState();
  const [img, setImg] = React.useState();
  React.useEffect(() => {
    if (listImage[`image${index}`] instanceof File) {
      const file = listImage[`image${index}`];
      setImg(URL.createObjectURL(file));
      setchoseFile('chose');
    }
  }, []);
  const handleDeleteImage = () => {
    setchoseFile('');
    setListImage({ ...listImage, [`image${[index]}`]: '' });
  };
  const handleChangeFile = (e) => {
    setListImage({ ...listImage, [`image${[index]}`]: e.target.files[0] });
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
    setchoseFile('chose');
  };
  return (
    <>
      {chosefile === 'chose' ? (
        <div className="image">
          <img src={img} className="img-update" />
          <div className="button-event">
            <label htmlFor={index}>Cập nhập</label>
            {avatar ? <></> : (
              <button className="delete-button" onClick={handleDeleteImage}>
                Xóa
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}
          >
            {' '}
            <label htmlFor={index}>
              {data ? <img src={data.avatar} style={{ width: '100%', height: '100%' }} /> : <img src={AddButton} style={{ width: '100%', height: '100%' }} /> }
              {/* <img src={AddButton} style={{ width: '100%', height: '100%' }} /> */}
            </label>
          </div>
        </>
      )}
      {/* <Form.Item name={`image${index}`}> */}
      <input id={index} type="file" onChange={handleChangeFile} hidden />
      {/* </Form.Item> */}
    </>
  );
}

export default React.memo(ImageUpdate);
