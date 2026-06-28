import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-primary p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Coiny</h1>
        {/* <nav className="space-x-4">
          <Link href="/" className="text-white hover:underline">
            Home
          </Link>
          <Link href="/add" className="text-white hover:underline">
            Add
          </Link>
        </nav> */}
      </div>
    </header>
  );
}
