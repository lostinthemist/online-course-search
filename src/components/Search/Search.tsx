import React, { useState, useEffect } from 'react'
import { debounce } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import searchComponentStyles from './Search.module.scss'

const Search: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const debouncedSearch = debounce((q) => {
      onSearch(q)
    }, 300)

    debouncedSearch(query)

    return () => {
      debouncedSearch.cancel()
    }
  }, [query, onSearch])

  return (
    <div className={searchComponentStyles.searchArea} >
      <FontAwesomeIcon icon={faSearch} className={searchComponentStyles.searchIcon} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for courses"
        className={searchComponentStyles.searchInput}
      />
    </div>
  )
}

export default Search
