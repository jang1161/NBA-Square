import React from "react";
import { useNavigate } from "react-router-dom";

export default function CommentList({ comments, onCommentDeleted }) {
  const currentUserId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const onDelete = async (id) => {
    const confirm = window.confirm("삭제하시겠습니까?");
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:8080/api/comments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("삭제 실패");

      alert("삭제되었습니다.");
      onCommentDeleted();
    } catch (err) {
      console.error("삭제 오류:", err);
      alert("삭제 중 문제가 발생했습니다.");
    }
  };

  if (!comments || comments.length === 0) {
    return <p className="text-gray-500">아직 댓글이 없습니다.</p>;
  }

  return (
    <div className="space-y-1">
      {comments.map(comment => {
        const isAuthor = currentUserId && currentUserId === String(comment.authorId);

        return (
          <div key={comment.id} className="border-t pt-2">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span className="font-semibold">{comment.authorName}</span>
              <span className="text-xs text-gray-400">
                {new Date(comment.createdAt).toLocaleString("ko-KR")}
              </span>
            </div>

            <p className="text-gray-800 whitespace-pre-wrap mt-1">{comment.content}</p>

            {isAuthor && (
              <button
                onClick={() => onDelete(comment.id)}
                className="mt-2 text-red-500 text-xs hover:underline"
              >
                삭제
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
