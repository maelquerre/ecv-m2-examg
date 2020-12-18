import { useContext, useMemo, useState } from 'react';
import { ApplicationContext } from '../../domain/application.store';
import { commentPictureById, likePictureById, unlikePictureById } from '../../domain/picture/picture.actions';
import { LikeButton, BookmarkButton } from '../buttons';
import './Card.css';
import { authRegister } from '../../domain/authentication/authentication.actions';


export function Card({ picture }) {
  const { state, dispatch } = useContext(ApplicationContext);
  const [commentForm, setCommentForm] = useState({
    comment: '',
  });

  const isLiked = useMemo(
    () => picture.likedBy && picture.likedBy.find(like => like === state.user._id),
    [picture]
  );

  const onChange = (e) => {
    setCommentForm({
      comment: e.target.value
    });
  };

  const onLike = (pictureId) => {
    isLiked ? unlikePictureById(dispatch, pictureId) : likePictureById(dispatch, pictureId);
  };

  const postComment = (pictureId) => {
    commentPictureById(dispatch, { pictureId, data: commentForm });
  };

  if (!state.user) return null;
  return (
    <div className="card">
      <div className="card-img">
        <img alt="" src={picture.download_url} />
        <LikeButton
          isLiked={picture.likedBy && picture.likedBy.find(like => like === state.user._id)}
          onClick={() => { onLike(picture.id); }}
        />
        <span className="likes">Likes : {picture.likedBy ? picture.likedBy.length : 0}</span>
        <BookmarkButton onClick={() => {}} />
      </div>
      <div className="card-body">
        <h3>
          Author : {picture.author}
        </h3>
        <div className="card-comments">
          Comments
          <ul>
            <li>
              Sample comment
            </li>
          </ul>

          <div>
            <input
              name="comment"
              placeholder="Add a comment..."
              type="text"
              onChange={onChange}
            />
            <button
              onClick={() => { postComment(picture.id); }}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}
