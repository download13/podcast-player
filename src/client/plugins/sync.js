export default app => {
  return {
    state: {
      sync: {
        token: null,
        status: ''
      }
    },
    actions: {
      sync: {
        setToken(state, actions, data) {
          return {sync: {token: data}};
        },
        setStatus(state, actions, data) {
          return {sync: {status: data}};
        },
        async createProfile(state, {setToken, setStatus}, data) {
          const res = await fetch('/sync/create', {method: 'POST'});

          if(res.ok) {
            const token = await res.text();

            setToken(token);
            setStatus('Created new profile');
          } else {
            setStatus('Unable to create profile');
          }
        },
        async addDevice(state, {setStatus}) {
          const res = await fetch('/sync/authorize', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${state.sync.token}`
            }
          });

          if(res.ok) {
            const code = await res.text();

            setStatus('Enter code on other device: ' + code);
          } else {
            setStatus('Unable to get access code');
          }
        },
        async connectDevice(state, {setToken, setStatus}, data) {
          const res = fetch('/sync/join', {
            method: 'POST',
            body: code
          });

          if(res.ok) {
            const token = await res.text();

            setToken(token);
            setStatus('Successfully joined profile');
          } else {
            setStatus('Unable to join profile');
          }
        }
      }
    },
    events: {
      loaded(state, actions) {
        try {
          const token = localStorage.getItem('authToken');
          if(token) {
            actions.sync.setToken(token);
          }
        } catch(e) {}
      },
      update(state, actions, data, emit) {
        if(data.sync && data.sync.token) {
          localStorage.setItem('authToken', data.sync.token);
        }
      }
    }
  };
};
