import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BoardWrite() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const authorName = localStorage.getItem("user_name");
      const authorId = localStorage.getItem("user_id");
      const response = await fetch("http://localhost:8080/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, authorName, authorId }),
      });

      if (!response.ok) {
        throw new Error("글 작성에 실패했습니다.");
      }

      navigate("/board");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">글쓰기</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">제목</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="제목을 입력하세요"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">내용</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={6}
            placeholder="내용을 입력하세요"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "등록 중..." : "등록"}
        </button>
      </form>
    </div>
  );
}
