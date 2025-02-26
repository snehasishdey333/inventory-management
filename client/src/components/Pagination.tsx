"use client"

import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, baseUrl }) => {
  if(isNaN(currentPage)){
     currentPage=1
  }
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
  const router=useRouter()

  const renderPageNumbers = () => {
    const displayedPages = []
    const maxDisplayedPages = 5

    if (totalPages <= maxDisplayedPages) {
      return pageNumbers.map((number) => renderPageButton(number))
    }

    displayedPages.push(renderPageButton(1))

    if (currentPage > 3) {
      displayedPages.push(
        <span key="ellipsis-start" className="px-2">
          ...
        </span>,
      )
    }

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      displayedPages.push(renderPageButton(i))
    }

    if (currentPage < totalPages - 2) {
      displayedPages.push(
        <span key="ellipsis-end" className="px-2">
          ...
        </span>,
      )
    }

    displayedPages.push(renderPageButton(totalPages))
    return displayedPages
  }

  const renderPageButton = (pageNumber: number) => (
    <Link
      href={`${baseUrl}?page=${pageNumber}`}
      key={pageNumber}
      className={`px-3 py-1 rounded-sm ${
        pageNumber === currentPage ? "bg-gray-300 text-black" : "bg-gray-50 hover:bg-gray-100"
      }`}
    >
      {pageNumber}
    </Link>
  )

  

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        onClick={() => router.push(`${baseUrl}?page=${currentPage - 1}`)}
        className={`bg-gray-500 text-white py-2 px-4 rounded-md text-xs font-semibold ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
        }`}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">{renderPageNumbers()}</div>
      <button
        onClick={() => router.push(`${baseUrl}?page=${currentPage + 1}`)}
        className={`bg-gray-500 text-white py-2 px-4 rounded-md text-xs font-semibold ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
        }` }
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination

