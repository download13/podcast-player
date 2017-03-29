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

  return <div class="holder">
    <div style={showingStyle(showingPlayer)}>
      <Player />
    </div>
    <div style={showingStyle(showingBookmarks)}>
      <Bookmarks />
    </div>
    <div style={showingStyle(showingEpisodes)}>
      <Episodes />
    </div>
  </div>;
};

export default connect(
  state => state,
  dispatch => ({})
)(Holder);


function showingStyle(showing) {
  return {
    overflow: 'hidden',
    height: showing ? 'auto' : 0
  };
}
