import createHistory from 'history/createBrowserHistory';

let instanceHistory;

const createInstanceHistory = () => {
  if (!instanceHistory) {
    instanceHistory = createHistory();
  }
  return instanceHistory;
};

const history = createInstanceHistory();
export default history;
