import ClassModulesSection from '@/components/courses/courseDetails/ClassModulesSection'
import CourseDetailsSection from '@/components/courses/courseDetails/CourseDetailsSection'
import CourseReview from '@/components/courses/courseDetails/CourseReview'
import SkillLevelSection from '@/components/courses/courseDetails/SkillLevelSection'
import WhatYouLearnSection from '@/components/courses/courseDetails/WhatYouLearnSection'
import BannerSectionTwo from '@/components/shared/BannerSectionTwo'
import React from 'react'

export default function CourseDetailsPage() {
  return (
    <div>
        <BannerSectionTwo title='Course Details' subtitle='' />
        <CourseDetailsSection />
        <SkillLevelSection />
        <WhatYouLearnSection />
        <ClassModulesSection />
        <CourseReview />
    </div>
  )
}
