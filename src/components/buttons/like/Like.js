import './Like.css';

export function Like({ onClick, isLiked }) {
  return (
    <button className="like" onClick={onClick}>
      <i className={`${isLiked ? 'fas' : 'far'} fa-heart`} />
    </button>
  );
}
