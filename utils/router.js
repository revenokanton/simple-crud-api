const getRoute = ({ url, method }) => {
  const isMatch = url?.match(/\/person\/\w+/);

  if (url === '/person' && method === 'GET') {
    return 'GET_ALL';
  }

  if (isMatch && method === 'GET') {
    return 'GET_BY_ID';
  }

  if (url === '/person' && method === 'POST') {
    return 'CREATE';
  }

  if (isMatch && method === 'PUT') {
    return 'UPDATE';
  }

  if (isMatch && method === 'DELETE') {
    return 'DELETE';
  }
};

const getId = (url) => {
  return url?.split('/')?.[2];
};

module.exports = {
  getRoute,
  getId,
};
