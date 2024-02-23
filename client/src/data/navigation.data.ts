export interface NavigationProps {
  path: string
  name: string
}

export const navigationData: NavigationProps[] = [
  { path: '/', name: 'Home' },
  { path: '/categories', name: 'Categories' },
  { path: '/catalog', name: 'My catalog' }
]

export const socialMediaLinks: NavigationProps[] = [
  { path: 'https://github.com/sozureke', name: 'GitHub' },
  { path: 'https://www.linkedin.com/in/sozureke/', name: 'LinkedIn' },
  { path: 'https://www.behance.net/mykhailmarshan', name: 'Behance' }
]

export const projectLinks: NavigationProps[] = [
  {
    path: 'https://www.figma.com/file/E1vP8hEmbBsyfY6kRHz4ej/book_catalogue_design?type=design&node-id=19%3A18&mode=design&t=J2qW1X8P9FRAk6lm-1',
    name: 'Design'
  },
  { path: '/', name: 'Schema' },
  { path: '/', name: 'Information' }
]
