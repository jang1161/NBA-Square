import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Board() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access_token");

  useEffect(() => {
    fetch("http://localhost:8080/api/posts")
      .then(res => {
        if (!res.ok) throw new Error("게시글을 불러오지 못했습니다.");
        return res.json();
      })
      .then(data => {
        // 최신순 정렬
        const sorted = [...data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sorted);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleWriteClick = () => {
    if (isLoggedIn) {
      navigate("/board/create");
    } else {
      alert("로그인 후 이용해주세요.");
    }
  };

  if (loading) return <div className="p-6">로딩 중...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* 게시글 목록 */}
      <ul className="space-y-2">
        {posts.length === 0 && <li>게시글이 없습니다.</li>}
        {posts.map((post) => (
          <li key={post.id} className="border-b pb-1">
            <Link
              to={`/board/${post.id}`}
              className="font-semibold text-lg text-gray-800 hover:text-gray-600 transition"
            >
              {post.title}
            </Link>
            <p className="text-sm text-gray-600">
              작성자: {post.author} 작성일:{" "}
              {new Date(post.createdAt).toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </li>
        ))}
      </ul>

      {/* 글쓰기 버튼 */}
      <div className="mb-6">
        <button
          onClick={handleWriteClick}
          className="px-2 py-1 mt-2 bg-gray-800 text-white rounded hover:bg-gray-600 transition"
        >
          글쓰기
        </button>
      </div>
    </div>
  );
}