import React, { useContext, useEffect, useState } from "react";
import Comment from "./Comment";
import UserContext from "../context/UserContext";
import { getTimeDifference } from "../Util/getTimeDifference";
import { useLocalState } from "../Util/useLocalStorage";
import fetchService from "../Services/fetchService";
import { Modal } from "react-bootstrap";

function CommentSection({ PostId, showModal, setShowModal }) {
  const [comments, setComments] = useState([]);
  const [jwt, setJwt] = useLocalState("", "token");

  const [formComment, setformComment] = useState("");
  const [showError, setShowError] = useState(false);
  const { user, userImage } = useContext(UserContext);

  const addComment = () => {
    if (formComment === "") {
      setShowError(true);
    } else {
      fetchService("http://localhost:8080/api/v1/addComment", jwt, "POST", {
        IdCommentedPost: PostId,
        comment: formComment,
      })
        .then((data) => {
          console.log(data);
          const newComment = {
            commentImg: user.ImageURL,
            commentUsername: user.username,
            commentDate: new Date(),
            commentText: formComment,
          };
          setComments((prevComments) => [...prevComments, newComment]);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [showError]);

  useEffect(() => {
    fetchService(
      `http://localhost:8080/api/v1/getPostComments/${PostId}`,
      jwt,
      "GET"
    )
      .then((data) => {
        console.log(data);
        setComments(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <>
      {showModal && (
        <section className=" mt-3 bg-gray-900 dark:bg-gray-900 py-8 lg:py-16 antialiased ">
          <div className="max-w-2xl ml-8 px-4">
            {showError && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert">
                <span className="font-semibold">Danger alert!</span> comment
                description cant be empty
              </div>
            )}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-white">
                Discussion ({comments.length})
              </h2>
            </div>
            <form className="mb-6">
              <div className="p-3 mb-4 bg-gray-800 rounded-lg rounded-t-lg border border-gray-700 ">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  id="comment"
                  rows="6"
                  className="px-0 w-full text-sm text-white placeholder-gray-400   bg-gray-800 focus:ring-0 focus:outline-none "
                  placeholder="Write a comment..."
                  required
                  value={formComment}
                  onChange={(e) => setformComment(e.target.value)}></textarea>
              </div>
              <button
                type="button"
                class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-emerald-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                onClick={addComment}>
                Post comment
              </button>
            </form>

            {/* Article 1 */}
            {comments.map((comment, index) => (
              <Comment
                key={index}
                commentImg={comment.commentImg}
                commentDate={comment.commentDate}
                commentText={comment.commentText}
                commentUsername={comment.commentUsername}
                commentId={comment.commentId}
                userId={comment.userId}></Comment>
            ))}
            {/* End Article 1 */}

            {/* Repeat the above structure for other articles */}
          </div>
        </section>
      )}
    </>
  );
}

export default CommentSection;
