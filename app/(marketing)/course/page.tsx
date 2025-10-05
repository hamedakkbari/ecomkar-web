import { Metadata } from 'next';
import CoursePageClient from './CoursePageClient';
import { generateCourseMeta } from '../../../lib/seo/pageMeta';
import courseContent from '../../../lib/content/pages/course';

export const metadata: Metadata = generateCourseMeta(courseContent);

export default function CoursePage() {
  return <CoursePageClient />;
}