import React from 'react'
import { Course } from '../../interfaces/course'
import courseCardStyles from './CourseCard.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faChalkboardTeacher, faClock } from '@fortawesome/free-solid-svg-icons'

const CourseCard: React.FC<Course> = ({ title, enroll_type, short_description, is_free, image_file_url, price_usd, logo_file_url }) => {

    const renderImage = () => {
        if (image_file_url) {
            return <img src={image_file_url} alt={title} />
        }
        return <img src="https://placehold.co/580x290" alt={title} />
    }

    const renderLabel = () => {
        if (enroll_type === 0 && is_free) {
            return <span className={courseCardStyles.label}>무료</span>
        } else if (enroll_type === 0 && !is_free) {
            return <span className={courseCardStyles.label}>유료</span>
        } else if (enroll_type === 4) {
            return <span className={courseCardStyles.label}>구독</span>
        }
        return null
    }

    const renderPrice = () => {
        if (is_free) {
            return <span className={courseCardStyles.freeCourse}>Free</span>
        }
        return <span>{`Price: ${price_usd}$`}</span>
    }

    const renderLogo = () => {
        if (logo_file_url) {
            return (
                <div className={courseCardStyles.logoContainer}>
                    <img src={logo_file_url} alt={`${title} logo`} />
                </div>
            )
        }
        return null
    }

    return (
        <div className={courseCardStyles.courseCard}>
            {renderImage()}
            <div className={courseCardStyles.textContainer}>
                {renderLabel()}
                <h3>{title}</h3>
                { short_description && <p>{short_description}</p>}
                <div className={courseCardStyles.priceContainer}>
                    {renderPrice()}
                </div>
                <div className={courseCardStyles.iconTextContainer}>
                    <div className={courseCardStyles.iconText}>
                        <FontAwesomeIcon icon={faTrophy} />
                        <span>Difficulty: Not set</span>
                    </div>
                    <div className={courseCardStyles.iconText}>
                        <FontAwesomeIcon icon={faChalkboardTeacher} />
                        <span>Class: Online</span>
                    </div>
                    <div className={courseCardStyles.iconText}>
                        <FontAwesomeIcon icon={faClock} />
                        <span>Duration: Unlimited</span>
                    </div>
                    {renderLogo()}
                </div>
                
            </div>
        </div>
    )
}

export default CourseCard
