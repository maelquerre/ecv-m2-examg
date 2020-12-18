import {
  addPictureToCollection,
  postCommentPicture,
  getPictures,
  getPictureById,
  likePicture,
  removePictureFromCollection,
  unlikePicture,
  updateCommentPicture
} from './picture.service';

export const types = {
  PICTURE_STARTED: 'PICTURE_STARTED',
  PICTURE_DONE: 'PICTURE_DONE',
  PICTURE_LIKED: 'PICTURE_LIKED',
  PICTURE_BOOKMARKED: 'PICTURE_BOOKMARKED',
  PICTURE_FAILED: 'PICTURE_FAILED'
};

export function fetchPictures(dispatch) {
  dispatch(_started());
  getPictures()
    .then(pictures => dispatch(_onSuccess(pictures)))
    .catch(error => dispatch(_onError(error)));
}

export function fetchPictureById(dispatch, pictureId) {
  dispatch(_started());
  getPictureById(pictureId)
    .then(picture => dispatch(_onSuccess([picture])))
    .catch(error => dispatch(_onError(error)));
}

export function likePictureById(dispatch, pictureId) {
  dispatch(_started());
  likePicture(pictureId)
    .then(picture => dispatch(_onLiked(picture)))
    .catch(error => dispatch(_onError(error)));
}

export function unlikePictureById(dispatch, pictureId) {
  dispatch(_started());
  unlikePicture(pictureId)
    .then(picture => dispatch(_onLiked(picture)))
    .catch(error => dispatch(_onError(error)));
}

export function postCommentPictureById(dispatch, { pictureId, data }) {
  dispatch(_started());
  return postCommentPicture(pictureId, data)
    .then(picture => dispatch(_onLiked(picture)))
    .catch(error => dispatch(_onError(error)));
}

export function updateCommentPictureById(dispatch, { pictureId, data }) {
  dispatch(_started());
  return updateCommentPicture(pictureId, data)
    .then(picture => dispatch(_onLiked(picture)))
    .catch(error => dispatch(_onError(error)));
}

export function addPictureByIdToCollection(dispatch, pictureId) {
  dispatch(_started());
  addPictureToCollection(pictureId)
    .then(user => dispatch(_onBookmarked(user)))
    .catch(error => dispatch(_onError(error)));
}

export function removePictureByIdFromCollection(dispatch, pictureId) {
  dispatch(_started());
  removePictureFromCollection(pictureId)
    .then(user => dispatch(_onBookmarked(user)))
    .catch(error => dispatch(_onError(error)));
}

function _started() {
  return {
    type: types.PICTURE_STARTED
  };
}

function _onSuccess(pictures) {
  return {
    type: types.PICTURE_DONE,
    payload: pictures
  };
}

function _onLiked(picture) {
  return {
    type: types.PICTURE_LIKED,
    payload: picture
  };
}

function _onBookmarked(user) {
  return {
    type: types.PICTURE_BOOKMARKED,
    payload: user
  };
}

function _onError(error) {
  return {
    type: types.PICTURE_FAILED,
    payload: error
  };
}
