import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight  } from '@fortawesome/free-solid-svg-icons'
import paginationStyles from './Pagination.module.scss'

const Pagination: React.FC<{
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void,
}> = ({ currentPage, totalPages, onPageChange }) => {
  const generatePageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 9 
    const halfRange = Math.floor(maxPagesToShow / 2)

    let startPage = Math.max(currentPage - halfRange, 1)
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages)

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  return (
    <div className={paginationStyles.paginationContainer}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${paginationStyles.paginationButton} ${paginationStyles.paginationButtonLeft} ${currentPage === 1 ? paginationStyles.disabled : ''}`}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      {generatePageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`${paginationStyles.paginationButton} ${currentPage === pageNumber ? paginationStyles.active : ''}`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${paginationStyles.paginationButton} ${paginationStyles.paginationButtonRight} ${currentPage === totalPages ? paginationStyles.disabled : ''}`}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  )
}

export default Pagination
