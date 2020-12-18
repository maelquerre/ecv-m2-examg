import './CollectionItem.css'

export function CollectionItem({ picture }) {
  return (
    <div className="collection-item">
      <img
        alt=""
        src={picture.download_url}
      />
    </div>
  );
}
