import {h} from 'hyperapp';


// TODO: Create sync plugin for this
export default (state, actions) => {
  const {token, status} = state.sync;

  let firstBtn = null;

  if(!token) {
    firstBtn = <button onclick={actions.sync.createProfile}>Create Sync Profile</button>;
  } else {
    firstBtn = <button onclick={actions.sync.addDevice}>Add Another Device</button>
  }

  let uuid = 'N/A';
  if(token) {
    uuid = JSON.parse(atob(token.split('.')[1])).data;
  }

  return <div class="sync">
    <div>{uuid}</div>
    {firstBtn}
    <input class="code-in" placeholder="Access Code"/>
    <button onclick={e => actions.sync.connectDevice(e.target.previousSibling.value)}>Add to Existing Profile</button>
    <span class="status">{status}</span>
  </div>
};


// TODO
function storePlace(podcastName, blob) {
  const token = localStorage.getItem('authToken');

  if(token) {
    return fetch(`/sync/store/${podcastName}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: blob
    })
    .then(okResponse);
  }
}

function getPlace(podcastName) {
  const token = localStorage.getItem('authToken');

  if(token) {
    return fetch(`/sync/get/${podcastName}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(okResponse);
  }
}

function okResponse(res) {
  if(res.ok) return res.text();
  return null;
}
