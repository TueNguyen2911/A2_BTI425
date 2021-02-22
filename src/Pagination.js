import React from 'react';
import classNames from 'classnames';
const Pagination = ({ rowsPerPage, totalData, paginate, currentPage}) => {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalData / rowsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className={classNames({'page-item': true, 'active': number == currentPage})}>
                        <a onClick={() => paginate(number)} href="#" className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default Pagination;