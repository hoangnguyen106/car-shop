import ProductItem from '../ProductItem';

function ProductUser() {
  return (
    <div
      style={{
        position: 'absolute', display: 'flex', height: 'calc(100% - 83px)', width: '74%', left: '26%',
      }}
    >
      {/* <div className={cx('content-search')}>
        <div className={cx('content-box')}>
          <button type="button" className={cx('content-btnSearch')}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <input
            type="text"
            placeholder="Search..."
          />
        </div>
      </div> */}
      <ProductItem isProductUser />
    </div>
  );
}

export default ProductUser;
