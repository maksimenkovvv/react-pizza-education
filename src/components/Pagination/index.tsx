import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, currentPageSelector } from '../../redux/slices/filterSlice';
import ReactPaginate from 'react-paginate';
import styles from './styles.module.scss';

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(currentPageSelector);
  return (
    <ReactPaginate
      className={styles.pagination}
      pageClassName={styles.pagination__page}
      previousClassName={styles['pagination__page--previous']}
      nextClassName={styles['pagination__page--next']}
      disabledClassName={styles['pagination__page--disabled']}
      activeClassName={styles['pagination__page--active']}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={5}
      forcePage={currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
