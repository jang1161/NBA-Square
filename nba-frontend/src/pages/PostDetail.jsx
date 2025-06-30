import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PostActionButtons from "../components/PostActionButtons";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUserId = localStorage.getItem("user_id");
  console.log("Current User Id: " + currentUserId);

   const fetchPost = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/posts/${id}`);
      if (!res.ok) throw new Error("게시글을 불러올 수 없습니다.");
      const data = await res.json();
      setPost(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/comments/${id}`);
      if (!res.ok) throw new Error("댓글을 불러올 수 없습니다.");
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  if (loading) return <div className="p-6">로딩 중...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!post) return <div className="p-6">게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link to="/board" className="text-gray-800 hover:underline mb-4 inline-block">목록으로</Link>

      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <div className="text-sm text-gray-600 mb-4 flex space-x-4">
        <span>작성자 {post.authorName}</span>
        <span>작성일 {new Date(post.createdAt).toLocaleString("ko-KR")}</span>
      </div>
      <p className="whitespace-pre-wrap">{post.content}</p>

      <PostActionButtons post={post} />

      <hr className="my-6" />
      <div className="text-sm mb-2">댓글</div>
      <CommentForm postId={post.id} onCommentSubmitted={fetchComments} />
      <CommentList comments={comments} />
    </div>
  );
}