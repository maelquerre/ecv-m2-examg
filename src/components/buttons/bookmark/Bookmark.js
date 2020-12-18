import './Bookmark.css';

export function Bookmark({ onClick, isBookmarked }) {
  return (
    <button className="remove" onClick={onClick}>
      <i className={`${isBookmarked ? 'fas' : 'far'} fa-bookmark`} />
    </button>
  );
}
