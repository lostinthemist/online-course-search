import React, { useEffect } from 'react'
import Chip from '@mui/material/Chip'
import { useRouter } from 'next/router'
import filterStyles from './Filter.module.scss'

const Filter: React.FC<{ onFilterChange: (filters: string[]) => void }> = ({ onFilterChange }) => {
  const router = useRouter()
  const { query } = router

  let filters: string[] = [];
  if (query.is_free) {
    filters = Array.isArray(query.is_free) ? query.is_free : [query.is_free];
  }
  const initialFilters = filters;

  const [selectedFilters, setSelectedFilters] = React.useState<string[]>(initialFilters)

  useEffect(() => {
    if (JSON.stringify(initialFilters) !== JSON.stringify(selectedFilters)) {
      const queryParam = selectedFilters.length > 0 ? { is_free: selectedFilters } : {}
      router.push({ pathname: router.pathname, query: queryParam }, undefined, { shallow: true })
      onFilterChange(selectedFilters)
    }
  }, [selectedFilters])

  useEffect(() => {
    setSelectedFilters(initialFilters)
  }, [query.is_free])

  const handleFilterChange = (filter: string) => {
    const newFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter(f => f !== filter)
      : [...selectedFilters, filter]

    setSelectedFilters(newFilters)
  }

  return (
    <div className={filterStyles.filtersContainer}>
      <Chip
        label="Free"
        onClick={() => handleFilterChange('true')}
        color={selectedFilters.includes('true') ? 'primary' : 'default'}
      />
      <Chip
        label="Paid"
        onClick={() => handleFilterChange('false')}
        color={selectedFilters.includes('false') ? 'primary' : 'default'}
      />
    </div>
  )
}

export default Filter
