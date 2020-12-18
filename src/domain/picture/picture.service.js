export function getPictures() {
  return fetch('/api/pictures')
    .then(async res => {
      if (res.status !== 200 && res.status !== 201) {
        const { message } = await res.json();
        throw new Error(message);
      }
      return res;
    })
    .then(res => res.json());
}

export function getPictureById(pictureId) {
  return fetch(`/api/pictures/${pictureId}`)
    .then(async res => {
      if (res.status !== 200 && res.status !== 201) {
        const { message } = await res.json();
        throw new Error(message);
      }
      return res;
    })
    .then(res => res.json());
}

export function addPictureToCollection(pictureId) {
  return fetch(`/api/collection/${pictureId}`, {
    method: 'POST'
  })
    .then(async res => {
      if (res.status !== 200 && res.status !== 201) {
        const { message } = await res.json();
        throw new Error(message);
      }
      return res;
    })
}

export function removePictureFromCollection(pictureId) {
  return fetch(`/api/collection/${pictureId}`, {
    method: 'DELETE'
  })
    .then(async res => {
      if (res.status !== 200 && res.status !== 201) {
        const { message } = await res.json();
        throw new Error(message);
      }
      return res;
    })
}

export function likePicture(pictureId) {
  return fetch(`/api/pictures/${pictureId}/like`, {
    method: 'PUT'
  })
    .then(async res => {
      if (res.status !== 200 && res.status !== 201) {
        const { message } = await res.json();
        throw new Error(message);
      }
      return res;
    })
    .then(res => res.json());
}

export function unlikePicture(pictureId) {
  return fetch(`/api/pictures/${pictureId}/unlike`, {
    method: 'PUT'
  })
    .then(async res => {
      if (res.status !== 200 && res.status !== 201) {
        const { message } = await res.json();
        throw new Error(message);
      }
      return res;
    })
    .then(res => res.json());
}

export function commentPicture(pictureId, data) {
  return fetch(`/api/pictures/comment/${pictureId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(async res => {
      if (res.status !== 200 && res.status !== 201) {
        const { message } = await res.json();
        throw new Error(message);
      }
      return res;
    })
    .then(res => res.json());
}
