import { Link } from "react-router";

export const Home = () => {
  return (
    <main>
      <h1 className="text-3xl font-bold underline font-mono">Hello world!</h1>
      <Link to="/posts">posts</Link>
      <Link to="/lorem">lorem</Link>
    </main>
  );
};

export default Home;
