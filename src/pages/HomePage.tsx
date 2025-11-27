import { useEffect, useState } from 'react';
import { NavbarDefault } from '../components/NavbarDefault';

interface Post {
  id: string;
  title: string;
  body: string;
}

function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    localStorage.setItem('access_token', 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ0c1RsdERmYWZCc1I1YkdpNHJmODM3WVlYRUxLS0NqVFBvdjZmNXRBRVZrIn0.eyJleHAiOjE4MTMxNDMzMTksImlhdCI6MTc2MTMwMzMxOSwiYXV0aF90aW1lIjoxNzYxMzAzMzE5LCJqdGkiOiIyODE0NjAxYS1lMjQyLTQxYmUtYjkxYS00M2QyOThmNWVlNDQiLCJpc3MiOiJodHRwczovL2F1dGgtZXUtdGVzdC5nby1haWd1YS5jb20vYXV0aC9yZWFsbXMvZGV2X3Byb2R1Y3QiLCJzdWIiOiIyZmJjNDU3ZS0yMzcxLTRhZWUtODMyMS0xMTg5ZTQ5NDM4ZjMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJnby1haWd1YS1zb2MiLCJzZXNzaW9uX3N0YXRlIjoiNDk1NzczYmUtZTk0MC00NGI4LWJjNGYtYjhjMWRjMmJhNWUwIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUgZ29haWd1YSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJ1c2VyX25hbWUiOiJhZHJpYW4udmVybmljaEBpZHJpY2EuY29tIiwibmFtZSI6IkFkcmlhbiBWZXJuaWNoIHwgSURSSUNBIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRyaWFuLnZlcm5pY2hAaWRyaWNhLmNvbSIsImdpdmVuX25hbWUiOiJBZHJpYW4gVmVybmljaCB8IiwiZmFtaWx5X25hbWUiOiJJRFJJQ0EiLCJlbWFpbCI6ImFkcmlhbi52ZXJuaWNoQGlkcmljYS5jb20ifQ.fAhNLwJZ9ZmaySb57vPActafJVcy-BZ42M2mJkj1umJVT90dOfzaSgogcGi_36WZibfa6sSaCOvcZQM1NbOYZPCJa1YZUO3gnWRpkHFkU3btCViKvFK_rlHlomzuhL89qB3na0Lu-LIMqkFkc3riZ-e3_rik1rucsXeqTYrUTC1otwaD61jmzyDRR3_ZsVCt853azWwO8j4wEzdQ8-T6aYdVz7PkDR9SLIHKOL5JPYKrEVrkjQJkLaYy26ZeABVQMktUEw7_BNk9oEdLk3DQxaGuMfWyg1k_U6x7eP5gZHGlzdEgJ9Ph7_SB2jPKFnt4V4gzweP_st1O-Bz5SKsX4w');
    const token = localStorage.getItem('access_token');

    fetch("http://localhost:20001/posts", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    })
      .then((response) => {
        if (!response.ok) {
          console.error(`Error ${response.status}: ${response.statusText}`);
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data && Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("La respuesta no es un array:", data);
        }
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleDelete = (id: string) => {
    const token = localStorage.getItem('access_token');

    fetch(`http://localhost:20001/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        } else {
          console.error(`Error al eliminar: ${response.status}`);
        }
      })
      .catch((error) => console.error("Error eliminando post:", error));
  };

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
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white mt-2"
                >
                  Eliminar Post
                </button>

                <button 
                  className="bg-teal-400 hover:bg-teal-600 px-4 py-2 rounded text-white mt-2"
                >
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
