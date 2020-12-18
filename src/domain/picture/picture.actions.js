import { getPictures, getPictureById, commentPicture, likePicture, unlikePicture } from './picture.service';

export const types = {
  PICTURE_STARTED: 'PICTURE_STARTED',
  PICTURE_COMMENTED: 'PICTURE_COMMENTED',
  PICTURE_DONE: 'PICTURE_DONE',
  PICTURE_LIKED: 'PICTURE_LIKED',
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

export function commentPictureById(dispatch, { pictureId, data }) {
  dispatch(_started());
  commentPicture(pictureId, data)
    .then(picture => dispatch(_onLiked(picture)))
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

function _onError(error) {
  return {
    type: types.PICTURE_FAILED,
    payload: error
  };
}
