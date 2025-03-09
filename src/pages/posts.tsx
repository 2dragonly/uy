import { Link, useLoaderData } from "react-router";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface LoaderData {
  posts: Post[];
}

const Posts = () => {
  const data = useLoaderData() as LoaderData;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data.posts.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function loader() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const posts: Post[] = await res.json();

    return { posts };
  } catch (err) {
    console.error(err);
    return { posts: [] };
  }
}

export default Posts;
