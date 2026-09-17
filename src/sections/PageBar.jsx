/* The bar used on content pages. Same three-column grid and height as the
   landing nav so it does not resize between routes, but it carries the full
   navigation rather than only a home link, because these pages are now real
   destinations rather than overlays on the one-pager. */
import Nav from './Nav.jsx'

export default function PageBar({ title }) {
  return <Nav pageTitle={title} />
}
