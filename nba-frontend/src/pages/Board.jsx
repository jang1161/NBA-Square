import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Board() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/posts")
      .then(res => {
        if (!res.ok) throw new Error("게시글을 불러오지 못했습니다.");
        return res.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6">로딩 중...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">

      {/* 글쓰기 버튼 */}
      <div className="mb-6">
        <Link
          to="/board/create"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          글쓰기
        </Link>
      </div>

      {/* 게시글 목록 */}
      <ul className="space-y-4">
        {posts.length === 0 && <li>게시글이 없습니다.</li>}
        {posts.map(post => (
            <li key={post.id} className="border-b pb-2">
                <Link to={`/board/${post.id}`} className="font-semibold text-lg text-blue-600 hover:underline">
                    {post.title}
                </Link>
                <p className="text-sm text-gray-600">
                    작성자: {post.author} 작성일: {new Date(post.createdAt).toLocaleString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                })}</p>
            </li>
        ))}

      </ul>
    </div>
  );
}
