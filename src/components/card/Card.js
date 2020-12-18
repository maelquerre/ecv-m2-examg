import { useContext, useMemo } from 'react';
import { ApplicationContext } from '../../domain/application.store';
import { likePictureById, unlikePictureById } from '../../domain/picture/picture.actions';
import { LikeButton, BookmarkButton } from '../buttons';
import './Card.css';


export function Card({ picture }) {
  const { state, dispatch } = useContext(ApplicationContext);

  const isLiked = useMemo(
    () => picture.likedBy && picture.likedBy.find(like => like === state.user._id),
    [picture.likedBy]
  );

  const onLike = (pictureId) => {
    isLiked ? unlikePictureById(dispatch, pictureId) : likePictureById(dispatch, pictureId);
  };

  console.log(state.user._id);
  console.log('picture.likedBy:', Boolean(picture.likedBy && picture.likedBy.find(like => like === state.user._id)));

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
        </div>
      </div>
    </div>
  );

}
