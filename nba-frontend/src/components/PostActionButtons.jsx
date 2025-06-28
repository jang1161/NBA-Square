import React from "react";
import { useNavigate } from "react-router-dom";

export default function PostActionButtons({ post }) {
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    const confirm = window.confirm("정말 삭제하시겠습니까?");
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:8080/api/posts/${post.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("삭제 실패");

      alert("삭제되었습니다.");
      navigate("/board");
    } catch (err) {
      console.error("삭제 오류:", err);
      alert("삭제 중 문제가 발생했습니다.");
    }
  };

  if (String(currentUserId) !== String(post.authorId)) return null;

  return (
    <div className="flex space-x-2 mt-4">
      <button className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600">
        수정
      </button>
      <button
        onClick={handleDelete}
        className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
      >
        삭제
      </button>
    </div>
  );
}
