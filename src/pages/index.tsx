import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Search from '../components/Search/Search'
import Filter from '../components/Filter/Filter'
import CourseCard from '../components/CourseCard/CourseCard'
import Pagination from '../components/Pagination/Pagination'
import { Course } from '../interfaces/course'
import layoutStyles from './HomePage.module.scss'

const HomePage = () => {
    const router = useRouter()
    const { query } = router

    const initializeFilters = (queryParam: any): string[] => {
        if (!queryParam.is_free) {
            return []
        }
        return Array.isArray(queryParam.is_free) ? queryParam.is_free : [queryParam.is_free]
    }
    
    const [courses, setCourses] = useState<Course[]>([])
    const [filters, setFilters] = useState<string[]>(initializeFilters(query))
    const [searchQuery, setSearchQuery] = useState(query.keyword || '')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCourses, setTotalCourses] = useState(0)

    const coursesPerPage = 20
    const totalPages = Math.ceil(totalCourses / coursesPerPage)

    const buildFilterConditions = () => {
        const filterConditions: any = {
            $and: []
        }

        if (filters.includes('true')) {
            filterConditions.$and.push({ is_free: true })
        }

        if (filters.includes('false')) {
            filterConditions.$and.push({ is_free: false })
        }

        if (searchQuery) {
            filterConditions.$and.push({ title: `%${searchQuery}%` })
        }

        return filterConditions
    }

    const fetchCourses = async (page: number = 1) => {
        try {
            const offset = (page - 1) * coursesPerPage
            const filterConditions = buildFilterConditions()
            const query = {
                offset,
                count: coursesPerPage,
                filter_conditions: JSON.stringify(filterConditions),
            }
            const queryString = new URLSearchParams(query as any).toString()
            const res = await fetch(`/api/courses?${queryString}`)
            const data = await res.json()
            setCourses(data.courses || [])
            setTotalCourses(data.totalCourses || 0)
            console.log('Total Courses in index.tsx:', data.totalCourses)
        } catch (error) {
            console.error('Failed to fetch courses:', error)
            setCourses([])
            setTotalCourses(0)
        }
    }

    useEffect(() => {
        fetchCourses(currentPage)
    }, [currentPage, filters, searchQuery])

    useEffect(() => {
        setFilters(initializeFilters(query))
        setSearchQuery(query.keyword || '')
    }, [query.is_free, query.keyword])

    return (
        <div className={layoutStyles.wrapper}>
            <div className={layoutStyles.container}>
                <h1>Course Search</h1>
                <Search onSearch={setSearchQuery} />
                <Filter onFilterChange={setFilters} />
                <p>{totalCourses} total</p>
                <div className={layoutStyles.course_grid}>
                    {courses.map(course => (
                        <CourseCard key={course.id} {...course} />
                    ))}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default HomePage
