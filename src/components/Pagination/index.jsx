import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './styles.module.scss';

const Pagination = ({ onChangePage }) => {
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
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={5}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
