import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-4xl font-bold">Home Page</h1>
      <Link href="/login" className="mt-4 text-blue-500">Go to Login</Link>
    </div>
  );
}