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
    () => state.user.pictures_collection && state.user.pictures_collection.find(({ picsum_id }) => picsum_id === picture.picsum_id),
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
    commentForm.comment.length > 0 && commentPictureById(dispatch, { pictureId, data: commentForm })
      .then(() => {
        setCommentForm(initialCommentForm);
      });
  };

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
            onClick={() => { onBookmark((picture.id));}}
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
            onClick={() => { postComment(picture.id); }}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
