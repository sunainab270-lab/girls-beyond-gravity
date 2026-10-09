import type {MetadataRoute} from 'next';
import {apCourses,isUnitAvailable} from '@/lib/data';
export default function sitemap():MetadataRoute.Sitemap{
 const paths=['','/ap-physics','/opportunities','/about'];
 for(const course of apCourses){const base=`/ap-physics/${course.slug}`;paths.push(base);for(const unit of course.units){if(!isUnitAvailable(unit))continue;const root=`${base}/${unit.slug}`;paths.push(root,`${root}/review`,...unit.lessons.map(lesson=>`${root}/${lesson.slug}`));}}
 return paths.map(path=>({url:`https://girlsbeyondgravity.org${path}`}));
}
