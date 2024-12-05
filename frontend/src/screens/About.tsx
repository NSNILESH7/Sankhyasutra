import Header from '../components/ui/navbar'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">About Sankyasutra</h1>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <p className="text-lg text-gray-700 mb-4">
              Sankyasutra is an innovative platform that combines the power of mathematics with cutting-edge technology. Our mission is to make equation solving accessible and intuitive for everyone, from students to professionals.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Using advanced image recognition and mathematical algorithms, Sankyasutra can interpret hand-drawn equations and provide instant solutions. This technology bridges the gap between traditional problem-solving methods and modern digital tools.
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Features</h2>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
              <li>Real-time equation recognition</li>
              <li>Step-by-step solution breakdowns</li>
              <li>Support for a wide range of mathematical notations</li>
              <li>User-friendly interface for easy equation input</li>
              <li>Continuous learning and improvement of our algorithms</li>
            </ul>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2024 Sankyasutra. All rights reserved.</p>
      </footer>
    </div>
  )
}

