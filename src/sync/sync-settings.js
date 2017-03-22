import {h, Component} from 'preact';


export default class SyncSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      status: null
    };

    this.createSyncProfile = this.createSyncProfile.bind(this);
    this.syncAnotherDevice = this.syncAnotherDevice.bind(this);
    this.attachToExisting = this.attachToExisting.bind(this);
  }

  componentDidMount() {
    this.load();
  }

  render(props, {token, status}) {
    let firstBtn = null;

    if(!token) {
      firstBtn = <button onClick={this.createSyncProfile}>Create Sync Profile</button>;
    } else {
      firstBtn = <button onClick={this.syncAnotherDevice}>Sync Another Device</button>
    }

    let uuid = 'N/A';
    if(token) {
      uuid = JSON.parse(atob(token.split('.')[1])).data;
    }

    return <div class="sync">
      <div>{uuid}</div>
      {firstBtn}
      <input class="code-in" placeholder="Access Code"/>
      <button onClick={e => this.attachToExisting(e.target.previousSibling.value)}>Attach to Existing Profile</button>
      <span class="status">{status}</span>
    </div>;
  }

  load() {
    try {
      const token = localStorage.getItem('authToken');
      this.setState({token});
    } catch(e) {}
  }

  save(token) {
    if(!token) token = this.state.token;

    if(token) {
      localStorage.setItem('authToken', token);
    }
  }

  createSyncProfile() {
    fetch('/sync/create', {method: 'POST'})
    .then(okResponse)
    .then(token => {
      if(token) {
        this.setState({token, status: 'Created new profile'});
        this.save(token);
      } else {
        this.setState({status: 'Unable to create profile'});
      }
    });
  }

  syncAnotherDevice() {
    fetch('/sync/authorize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    })
    .then(okResponse)
    .then(code => {
      if(code) {
        this.setState({status: 'Enter code on other device: ' + code});
      } else {
        this.setState({status: 'Unable to get access code'});
      }
    });
  }

  attachToExisting(code) {
    fetch('/sync/join', {
      method: 'POST',
      body: code
    })
    .then(okResponse)
    .then(token => {
      if(token) {
        this.setState({token, status: 'Successfully joined profile'});
        this.save(token);
      } else {
        this.setState({status: 'Unable to join profile'});
      }
    });
  }
}

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
