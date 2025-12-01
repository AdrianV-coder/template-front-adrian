import { useEffect, useState } from 'react';
import { NavbarDefault } from '../components/NavbarDefault';
import { getPosts } from '../services/apiService';
import type { Post } from '../types/post.type'

function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error al obtener los posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-teal-400 py-5">
        <h1 className="text-center text-4xl font-black">Red social de Post</h1>
      </header>
      <main className="flex flex-col flex-1">
        <NavbarDefault />

        <div className="flex-1">
          {posts.map((post) => (
            <div key={post.id} className="border-2 border-teal-400 w-full p-2">
              <h3 className="text-4xl font-black">{post.title}</h3>
              <p>{post.body}</p>

              <div className="flex gap-3 justify-center items-center">
                <button className="bg-teal-400 hover:bg-teal-600 px-4 py-2 rounded text-white mt-2">
                  Crear Comentario
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
