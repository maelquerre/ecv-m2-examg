import { useContext, useMemo, useState } from 'react';
import { ApplicationContext } from '../../domain/application.store';

import {
  addPictureByIdToCollection,
  commentPictureById,
  likePictureById,
  removePictureByIdFromCollection,
  unlikePictureById
} from '../../domain/picture/picture.actions';

import { LikeButton, BookmarkButton } from '../buttons';

import './Card.css';

const initialCommentForm = { comment: '' };

export function Card({ picture }) {
  const { state, dispatch } = useContext(ApplicationContext);

  const [commentForm, setCommentForm] = useState(initialCommentForm);

  const isLiked = useMemo(
    () => picture.likedBy && picture.likedBy.find(({ _id }) => _id === state.user._id),
    [picture]
  );

  // TODO: Update this to return the accurate value
  const isBookmarked = useMemo(
    () => false,
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

  const onBookmark = (pictureId) => {
    isLiked ? removePictureByIdFromCollection(dispatch, pictureId) : addPictureByIdToCollection(dispatch, pictureId);
  };

  const postComment = (pictureId) => {
    commentPictureById(dispatch, { pictureId, data: commentForm }).then(() => {
      setCommentForm(initialCommentForm);
    });
  };

  if (!state.user) return null;
  return (
    <div className="card">
      <div className="card-img">
        <img alt="" src={picture.download_url} />
        <LikeButton
          isLiked={isLiked}
          onClick={() => { onLike(picture.id); }}
        />
        <span className="likes">Likes : {picture.likedBy ? picture.likedBy.length : 0}</span>
        <BookmarkButton
          onClick={() => { onBookmark((picture.id));}}
        />
      </div>
      <div className="card-body">
        <h3>
          Author : {picture.author}
        </h3>
        <div className="card-comments">
          {picture.comments.length > 0 && (
            <ul>
              {picture.comments.map(({ comment }, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          )}

          <div>
            <input
              name="comment"
              placeholder="Add a comment..."
              type="text"
              value={commentForm.comment}
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
