import type {MetadataRoute} from 'next';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:'/',disallow:['/account','/api/','/sign-in','/sign-up']},sitemap:'https://girlsbeyondgravity.org/sitemap.xml'};}
