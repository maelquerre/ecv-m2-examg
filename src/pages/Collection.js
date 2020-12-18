import { useContext, useEffect, useMemo, useState } from 'react';
import { ApplicationContext } from '../domain/application.store';
import { getPictureById } from '../domain/picture/picture.service';
import { CollectionItem } from '../components/collection-item/CollectionItem';

import './Collection.css';
import { fetchPictures } from '../domain/picture/picture.actions';

export default function Collection() {
  const { state, dispatch } = useContext(ApplicationContext);

  useEffect(() => {
    fetchPictures(dispatch);
  }, [dispatch]);

  const picturesCollection = useMemo(() => {
    return state.pictures.length > 0 && state.user?.pictures_collection.map(({ picsum_id }) => {
      return state.pictures.find(({ picsum_id: pcsm_id }) => pcsm_id === picsum_id);
    });
  }, [state.user, state.pictures]);

  return (
    <>
      <h1 className="title">My Collection</h1>

      {picturesCollection && (
        picturesCollection.length === 0
          ? 'No pictures :('
          : <div className="collection">{picturesCollection.map((picture) => (
            <CollectionItem
              key={picture.picsum_id}
              picture={picture}
            />
          ))}</div>
      )}
    </>
  );
}
