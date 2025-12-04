import { GlobeAltIcon } from '@heroicons/react/24/outline';

export function Header() {
  return (
    <header className="bg-teal-500 py-6 shadow-md">
      <div className="flex flex-col items-center">
        <GlobeAltIcon className="h-5 w-5 text-white mb-2" />
        <h1 className="text-center text-3xl font-bold text-white">
          Red Social de Post
        </h1>
        <p className="text-center text-gray-100 text-sm mt-2">
          Comparte tus ideas con el mundo
        </p>
      </div>
    </header>
  );
}