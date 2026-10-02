import { profile } from '../data'

function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer