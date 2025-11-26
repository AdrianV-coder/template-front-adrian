import { NavbarDefault } from '../components/NavbarDefault';

function HomePage() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-teal-400 py-5">
        <h1 className="text-center text-4xl font-black">Red social de Post</h1>
      </header>
      <main className="flex flex-col flex-1">
        <NavbarDefault />

        <div className="flex-1">
          
        </div>
      </main>
    </div>
  );
};

export default HomePage;
