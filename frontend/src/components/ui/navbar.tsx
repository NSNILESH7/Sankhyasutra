import {Link} from "react-router-dom"

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-800 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <h1 className="text-2xl font-bold text-white">Sankhyasutra</h1>
        </Link>
        <nav>
          <ul className="flex space-x-4 text-white gap-5">
            <li><Link to="/" className="hover:text-gray-200 transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-gray-200 transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-gray-200 transition-colors">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}