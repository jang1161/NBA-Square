import React, { useState } from "react";

export default function CommentForm({ postId, onCommentSubmitted }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("댓글 내용을 입력해주세요.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const authorId = localStorage.getItem("user_id");
      const authorName = localStorage.getItem("user_name");

      const response = await fetch("http://localhost:8080/api/comments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          authorId,
          authorName,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error("댓글 등록에 실패했습니다.");
      }

      setContent("");
      onCommentSubmitted(); // 부모 컴포넌트에서 댓글 목록 다시 불러오도록
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-1 mb-2">
      <textarea
        className="w-full border px-3 py-1 rounded"
        rows={3}
        placeholder="댓글을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={200}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex items-center  space-x-3">
        <button
          type="submit"
          disabled={submitting}
          className="px-2 text-sm border border-gray-200 rounded disabled:opacity-50"
        >
          {submitting ? "등록 중..." : "댓글 등록"}
        </button>
        <span className="text-xs text-gray-400">
          {content.length} / 200자
        </span>
      </div>
    </form>

  );
}
