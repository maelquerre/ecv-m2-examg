import { useContext, useEffect } from 'react';
import { ApplicationContext } from '../domain/application.store';
import { fetchPictureById } from '../domain/picture/picture.actions';
import { CollectionItem } from '../components/collection-item/CollectionItem';

import './Collection.css'

export default function Collection() {
  const { state, dispatch } = useContext(ApplicationContext);

  useEffect(() => {
    state.user?.pictures_collection.forEach(({ picsum_id }) => {
      fetchPictureById(dispatch, picsum_id);
    });
  }, [state.user]);

  return (
    <>
      <h1 className="title">My Collection</h1>

      {state.pictures && (
        state.pictures.length === 0
          ? 'No pictures :('
          : <div className="collection">{state.pictures.map((picture) => (
            <CollectionItem
              key={picture.picsum_id}
              picture={picture}
            />
          ))}</div>
      )}
    </>
  );
}
