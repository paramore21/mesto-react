export default function Footer() {
  const hours = new Date().getFullYear()
  return (
    <footer className="footer">
      <p className="footer__author">&copy; {hours} Mesto Russia</p>
    </footer>
  )
}