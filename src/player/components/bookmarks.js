import {h} from 'preact';
import {connect} from 'preact-redux';
import {formatTime} from '../../common';
import {seekToPosition} from '../store/actions';


const Bookmark = ({
  index,
  episode,
  position,
  gotoBookmark,
  deleteBookmark
}) => {
  return <div class="bookmark">
    <div class="bookmark-title">{episode + 1} - {formatTime(position)}</div>
    <button onClick={gotoBookmark} class="lean-right">
      <span class="icon-play"></span>
    </button>
    <button onClick={deleteBookmark}>
      <span class="icon-trash-empty"></span>
    </button>
  </div>;
};

const Bookmarks = ({
  bookmarks,

  hideBookmarks,
  createBookmark,
  deleteBookmark,
  gotoBookmark
}) => {
  return <div>
    <div class="titlebar">
      <button class="back" title="Back to Player" onClick={hideBookmarks}>
        <span class="icon-play"></span>
      </button>
      <button onClick={createBookmark} class="lean-right">
        <span class="icon-plus-squared"></span>
      </button>
    </div>
    <div class="bookmarks">
      {bookmarks.map((bookmark, i) =>
        <Bookmark
          {...bookmark}
          key={i}
          index={i}
          gotoBookmark={() => gotoBookmark(bookmark)}
          deleteBookmark={() => deleteBookmark(bookmark)}
        />
      )}
    </div>
  </div>;
};

export default connect(
  state => state,
  dispatch => ({
    hideBookmarks() {
      dispatch({type: 'HIDE_BOOKMARKS'});
    },
    createBookmark() {
      dispatch({type: 'CREATE_CURRENT_BOOKMARK'});
    },
    deleteBookmark(bookmark) {
      dispatch({type: 'DELETE_BOOKMARK', payload: bookmark.index});
    },
    gotoBookmark(bookmark) {
      dispatch({type: 'SELECT_EPISODE', payload: bookmark.episode});
      dispatch({type: 'FLUSH_SELECTED_EPISODE'});
      dispatch(seekToPosition(bookmark.position));
      dispatch({type: 'CHANGE_PLAYING', payload: true});
      dispatch({type: 'HIDE_BOOKMARKS'});
    }
  })
)(Bookmarks);
