import { Pagination } from 'antd';

function PaginationItems({
  pagination, onChange,
}) {
  return (
    <div>
      <Pagination
        defaultCurrent={pagination.currentPage}
        total={(pagination.totalPages) * 10}
        onChange={onChange}
      />
    </div>
  );
}

export default PaginationItems;
