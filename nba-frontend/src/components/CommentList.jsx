import React from "react";

export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p className="text-gray-500">아직 댓글이 없습니다.</p>;
  }

  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <div key={comment.id} className="border-t pt-2">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span className="font-semibold">{comment.authorName}</span>
            <span className="text-xs text-gray-400">
              {new Date(comment.createdAt).toLocaleString("ko-KR")}
            </span>
          </div>

          <p className="text-gray-800 whitespace-pre-wrap mt-1">{comment.content}</p>
        </div>
      ))}
    </div>

  );
}
