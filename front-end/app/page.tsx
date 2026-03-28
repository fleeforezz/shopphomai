import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-vh-100 p-24 bg-white text-black font-sans">
      <div className="text-6xl mb-8">👗</div>
      <h1 className="text-4xl font-bold mb-4 text-[#b07d3a]">ShopPhomai</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md text-center">
        Welcome to our Careers portal. We are looking for passionate individuals to join our team.
      </p>
      <Link 
        href="/job-application" 
        className="bg-[#b07d3a] text-white px-8 py-4 rounded-lg font-bold hover:opacity-90 transition-opacity"
      >
        View Job Opening: Fashion Retail Associate →
      </Link>
    </div>
  );
}
