export interface Course {
  id: number
  course_type: number
  taglist: string[]
  title: string
  short_description: string
  classType: number
  enroll_type: number
  logo_file_url: null | string
  image_file_url: null | string
  enrolled_role_period: null | string
  enroll_begin_datetime: number | null
  enroll_end_datetime: number | null
  begin_datetime: number
  end_datetime: null | number
  is_discounted: boolean
  discounted_price: string
  discounted_price_usd: string
  discount_rate: null | number
  price: string
  price_usd: string
  is_free: boolean
}

export interface OrgCourseListResponses {
  courseCode: number
  courses: Course[]
  course_count: number
}