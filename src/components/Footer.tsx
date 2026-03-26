import { Link } from 'react-router-dom'

interface FooterProps {
  /** Layout compatto per pagine centrate (es. Login) */
  compact?: boolean
}

export default function Footer({ compact = false }: FooterProps) {
  return (
    <footer className={`border-t border-gray-100 ${compact ? 'px-4 py-4' : 'px-6 py-6'}`}>
      <div className={`mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 ${compact ? 'max-w-md' : 'max-w-2xl'}`}>
        <span className="text-center sm:text-left">
          Progetto indipendente a fini didattici. Quesiti tratti dal Database ufficiale IVASS.
          {' '}
          <Link to="/note-legali" className="text-blue-600 hover:text-blue-700 hover:underline">
            Note Legali
          </Link>
        </span>
        <a href="/privacy-policy">Privacy Policy</a>
<a href="/cookie-policy">Cookie Policy</a>
             </div>
    </footer>
  )
}
