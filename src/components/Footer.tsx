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
          <Link to="/info" className="text-blue-600 hover:text-blue-700 hover:underline">
            Note Legali
          </Link>
        </span>
        {!compact && (
          <div className="flex gap-4 flex-shrink-0">
            <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600">Termini e Condizioni</a>
          </div>
        )}
      </div>
    </footer>
  )
}
