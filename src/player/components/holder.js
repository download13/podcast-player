import {h} from 'preact';
import {connect} from 'preact-redux';
import Player from './player';
import Bookmarks from './bookmarks';
import Episodes from './episodes';


const Holder = ({
  showingBookmarks,
  showingEpisodes
}) => {
  const showingPlayer = !showingBookmarks && !showingEpisodes;

  const bookmarks = showingBookmarks ? <Bookmarks/> : undefined;
  const episodes = showingEpisodes ? <Episodes/> : undefined;

  return <div class="holder">
    <div style={showingStyle(showingPlayer)}>
      <Player />
    </div>
    {bookmarks}
    {episodes}
  </div>;
};

export default connect(
  state => state,
  dispatch => ({})
)(Holder);


function showingStyle(showing) {
  return {
    display: showing ? 'block' : 'none'
  };
}
