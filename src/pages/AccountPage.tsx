
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface Post {
  id: string;
  title: string;
  body: string;
}

function AccountPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (user) {
        localStorage.setItem('access_token', 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ0c1RsdERmYWZCc1I1YkdpNHJmODM3WVlYRUxLS0NqVFBvdjZmNXRBRVZrIn0.eyJleHAiOjE4MTMxNDMzMTksImlhdCI6MTc2MTMwMzMxOSwiYXV0aF90aW1lIjoxNzYxMzAzMzE5LCJqdGkiOiIyODE0NjAxYS1lMjQyLTQxYmUtYjkxYS00M2QyOThmNWVlNDQiLCJpc3MiOiJodHRwczovL2F1dGgtZXUtdGVzdC5nby1haWd1YS5jb20vYXV0aC9yZWFsbXMvZGV2X3Byb2R1Y3QiLCJzdWIiOiIyZmJjNDU3ZS0yMzcxLTRhZWUtODMyMS0xMTg5ZTQ5NDM4ZjMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJnby1haWd1YS1zb2MiLCJzZXNzaW9uX3N0YXRlIjoiNDk1NzczYmUtZTk0MC00NGI4LWJjNGYtYjhjMWRjMmJhNWUwIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUgZ29haWd1YSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJ1c2VyX25hbWUiOiJhZHJpYW4udmVybmljaEBpZHJpY2EuY29tIiwibmFtZSI6IkFkcmlhbiBWZXJuaWNoIHwgSURSSUNBIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRyaWFuLnZlcm5pY2hAaWRyaWNhLmNvbSIsImdpdmVuX25hbWUiOiJBZHJpYW4gVmVybmljaCB8IiwiZmFtaWx5X25hbWUiOiJJRFJJQ0EiLCJlbWFpbCI6ImFkcmlhbi52ZXJuaWNoQGlkcmljYS5jb20ifQ.fAhNLwJZ9ZmaySb57vPActafJVcy-BZ42M2mJkj1umJVT90dOfzaSgogcGi_36WZibfa6sSaCOvcZQM1NbOYZPCJa1YZUO3gnWRpkHFkU3btCViKvFK_rlHlomzuhL89qB3na0Lu-LIMqkFkc3riZ-e3_rik1rucsXeqTYrUTC1otwaD61jmzyDRR3_ZsVCt853azWwO8j4wEzdQ8-T6aYdVz7PkDR9SLIHKOL5JPYKrEVrkjQJkLaYy26ZeABVQMktUEw7_BNk9oEdLk3DQxaGuMfWyg1k_U6x7eP5gZHGlzdEgJ9Ph7_SB2jPKFnt4V4gzweP_st1O-Bz5SKsX4w');
        const token = localStorage.getItem('access_token');

        fetch(`http://localhost:20001/posts/by-username?username=${user}`, {
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }})

        .then((res) => {
          if (!res.ok) throw new Error('Error al cargar posts');
          return res.json();
        })
        .then((data) => setPosts(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  if (!user) return <p>No estás logueado</p>;

  return (
    <div className="flex flex-col h-screen">
        <header className="bg-teal-400 py-5">
            <h1 className="text-center text-4xl font-black">Red social de Post</h1>
        </header>
        <div className="p-6">
            <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">Posts de {user}</h2>

                <div className="flex gap-3 justify-center items-center">
                    <button className="bg-teal-400 hover:bg-teal-600 px-4 py-2 rounded">
                        Crear Post
                    </button>
                </div>
            </nav>

            {posts.length === 0 ? (
                <p>No tienes posts todavía.</p>
            ) : (
                <ul className="space-y-4">
                    {posts.map((post) => (
                        <li key={post.id} className="border p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">{post.title}</h3>
                            <p>{post.body}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
  );
}

export default AccountPage;
