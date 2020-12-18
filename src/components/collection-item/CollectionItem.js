import './CollectionItem.css'
import { removePictureByIdFromCollection } from '../../domain/picture/picture.actions';
import { useContext } from 'react';
import { ApplicationContext } from '../../domain/application.store';

export function CollectionItem({ picture }) {
  const { state, dispatch } = useContext(ApplicationContext);

  const onRemove = (pictureId) => {
    removePictureByIdFromCollection(dispatch, pictureId)
  }

  return (
    <div className="collection-item">
      <img
        alt=""
        src={picture.download_url}
      />
      <button
        onClick={() => { onRemove((picture.id)); }}
      >
        Remove
      </button>
    </div>
  );
}
