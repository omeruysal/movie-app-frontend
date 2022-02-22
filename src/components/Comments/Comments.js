import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import './Comments.css';
import Pagination from '../Pagination/Pagination';

const Comments = ({ id }) => {
  const { user } = useContext(UserContext);

  const [isItMovie] = useState(window.location.href.includes('movie'));

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [comment, setComment] = useState([]);
  const [comments, setComments] = useState([]);
  const getComments = async (currentPage) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/comments/${isItMovie ? 'movie' : 'star'}/${id}?page=${currentPage}`,
        {
          withCredentials: true,
        }
      );
      setComments((pr) => [...pr, ...data.data.data]);
      setCurrentPage(data.data.meta.page);
      setLastPage(data.data.meta.last_page);
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/comments/${isItMovie ? 'movie' : 'star'}`,
        {
          description: comment,
          id,
        },
        {
          withCredentials: true,
        }
      );
      setComment('');
      let arr = comments;
      setComments([]);
      setComments([{ description: comment, user: { username: user.username } }, ...arr]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments(currentPage);
  }, [currentPage]);

  return (
    <div className="container">
      <div className="comment-frame">
        <div className="comment-body">
          <textarea
            maxLength={500}
            name="description"
            className="form-control comment-box"
            placeholder="Comment"
            type="text"
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button className="btn btn-primary comment-button" onClick={handleComment}>
            Send
          </button>
        </div>
      </div>
      <div className="comments">
        {comments && (
          <>
            {comments.map((comment) => (
              <div className="comment-card" key={comment.id}>
                <div className="comment-user">{comment.user.username}</div>
                <div className="comment-description">{comment.description}</div>
              </div>
            ))}
            <Pagination currentPage={currentPage} loadMore={setCurrentPage} lastPage={lastPage} />
          </>
        )}
      </div>
    </div>
  );
};

export default Comments;
