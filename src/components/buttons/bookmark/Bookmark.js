import './Bookmark.css';

export function Bookmark({ onClick, isBookmarked }) {
  return (
    <button className="bookmark" onClick={onClick}>
      <i className={`${isBookmarked ? 'fas' : 'far'} fa-bookmark`} />
    </button>
  );
}
