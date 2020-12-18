import { useContext, useMemo, useState } from 'react';
import { ApplicationContext } from '../../domain/application.store';

import {
  addPictureByIdToCollection,
  postCommentPictureById,
  likePictureById,
  removePictureByIdFromCollection,
  unlikePictureById,
  updateCommentPictureById
} from '../../domain/picture/picture.actions';

import { LikeButton, BookmarkButton } from '../buttons';

import './Card.css';

const initialCommentForm = { comment: '' };

export function Card({ picture }) {
  const { state, dispatch } = useContext(ApplicationContext);

  const [commentForm, setCommentForm] = useState(initialCommentForm);

  // Computed values

  const isLiked = useMemo(
    () => picture.likedBy?.find(({ _id }) => _id === state.user._id),
    [picture]
  );

  const isBookmarked = useMemo(
    () => state.user?.pictures_collection.find(({ picsum_id }) => picsum_id === picture.picsum_id),
    [state.user]
  );

  const userComment = useMemo(
    () => picture.comments?.find(({ by }) => by._id === state.user._id),
    [picture]
  );

  // Methods

  const onChange = (e) => {
    setCommentForm({
      comment: e.target.value
    });
  };

  const onLike = (pictureId) => {
    isLiked ? unlikePictureById(dispatch, pictureId) : likePictureById(dispatch, pictureId);
  };

  const onBookmark = (pictureId) => {
    isBookmarked ? removePictureByIdFromCollection(dispatch, pictureId) : addPictureByIdToCollection(dispatch, pictureId);
  };

  const postOrUpdateComment = (dispatch, data) => {
    return userComment ? updateCommentPictureById(dispatch, data) : postCommentPictureById(dispatch, data);
  };

  const onComment = (pictureId) => {
    commentForm.comment.length > 0 &&
    postOrUpdateComment(dispatch, { pictureId, data: commentForm })
      .then(() => {
        setCommentForm(initialCommentForm);
      });
  };

  // View

  if (!state.user) return null;
  return (
    <div className="card">
      <div className="card-header">{picture.author}</div>

      <div className="card-img">
        <img alt="" src={picture.download_url} />
      </div>

      <div className="card-body">
        <div className="card-buttons">
          <LikeButton
            isLiked={isLiked}
            onClick={() => { onLike(picture.id); }}
          />
          <BookmarkButton
            isBookmarked={isBookmarked}
            onClick={() => { onBookmark((picture.id)); }}
          />
        </div>

        <div className="card-likes">
          {picture.likedBy?.length > 0 && `${picture.likedBy.length} ${picture.likedBy.length > 1 ? 'likes' : 'like'}`}
        </div>

        {picture.comments.length > 0 && (
          <div className="card-comments">
            <ul>
              {picture.comments.map(({ by: user, comment }, index) => (
                <li
                  key={index}
                  className="card-comment"
                >
                  <span className="card-comment__username">{user.name}</span>&nbsp;{comment}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="comment-input">
          <input
            name="comment"
            placeholder="Add a comment..."
            type="text"
            value={commentForm.comment}
            onChange={onChange}
          />

          <button
            onClick={() => { onComment(picture.id); }}
          >
            {userComment ? 'Update comment' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  );
}
