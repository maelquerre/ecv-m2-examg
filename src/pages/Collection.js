import { useContext, useEffect, useState } from 'react';
import { ApplicationContext } from '../domain/application.store';
import { getPictureById } from '../domain/picture/picture.service';
import { CollectionItem } from '../components/collection-item/CollectionItem';

import './Collection.css';

export default function Collection() {
  const { state, dispatch } = useContext(ApplicationContext);

  const [picturesCollection, setPicturesCollection] = useState([]);

  useEffect(() => {
    state.user?.pictures_collection.forEach(({ picsum_id }) => {
      getPictureById(picsum_id).then((picture) => {
        setPicturesCollection(picturesCollection => ([...picturesCollection, picture]));
      });
    });
  }, [state.user]);

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
