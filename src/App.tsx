import { useEffect, useState } from "react";
import axios from "axios";

interface Blog {
  id: string;
  title: string;
  description: string;
  url: string;
  social_image: string;
}

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "https://dev.to/api/articles?username=vuelancer"
      );
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="pt-2 flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-emerald-600">Vuelancer</h1>
        <nav className="flex space-x-4">
          <a href="/" className="text-blue-500 hover:underline">
            Home
          </a>
          <a
            href="https://dev.to/vuelancer"
            className="text-blue-500 hover:underline"
          >
            Dev.to
          </a>
        </nav>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {blogs.map((blog: Blog) => (
          <div key={blog.id} className="bg-purple-100 rounded-lg shadow-md p-4">
            <img
              src={blog.social_image}
              alt={blog.title}
              className="w-full h-48 object-contain rounded-lg mb-4"
            />
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-bold hover:text-emerald-600"
            >
              {blog.title}
            </a>
            <p className="text-gray-700">{blog.description}</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default BlogList;
