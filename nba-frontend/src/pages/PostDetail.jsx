// src/pages/PostDetail.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/posts/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("게시글을 불러올 수 없습니다.");
        return res.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-6">로딩 중...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!post) return <div className="p-6">게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link to="/board" className="text-blue-600 hover:underline mb-4 inline-block">← 목록으로</Link>

      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-4">작성자: {post.author}</p>
      <p className="whitespace-pre-wrap">{post.content}</p>
    </div>
  );
}