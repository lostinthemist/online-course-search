import type { NextApiRequest, NextApiResponse } from 'next'
import { OrgCourseListResponses } from '../../interfaces/course'
import applyCors from '../../utils/cors'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await applyCors(req, res, async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const { offset = '0', count = '20', filter_conditions } = req.query

            const response = await fetch(`https://api-rest.elice.io/org/academy/course/list/?offset=${offset}&count=${count}&filter_conditions=${encodeURIComponent(filter_conditions as string)}`)
            const data: OrgCourseListResponses = await response.json()

            console.log('Raw data fetched:', data.course_count)

            if (!data?.courses) {
                throw new Error('Invalid API response: "courses" field is missing')
            }

            res.status(200).json({ courses: data.courses, totalCourses: data.course_count })
        } catch (error) {
            console.error('Error fetching courses:', error)
            res.status(500).json({ message: 'Failed to fetch courses' })
        }
    })
}
