import { useEffect, useContext } from 'react';
import { ApplicationContext } from '../domain/application.store';
import { fetchPictures } from '../domain/picture/picture.actions';
import { Card } from '../components/card/Card';

export default function Home() {
  const { state, dispatch } = useContext(ApplicationContext);

  useEffect(() => {
    fetchPictures(dispatch);
  }, [dispatch]);

  return (
    <>
      {state.pictures.map(picture =>
        <Card key={picture.id} picture={picture} />
      )}
    </>
  );
}
