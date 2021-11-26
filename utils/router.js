const getRoute = ({ url, method }) => {
  const isMatch = url?.match(/\/api\/person\/\w+/);

  if (url === '/api/person' && method === 'GET') {
    return 'GET_ALL';
  }

  if (isMatch && method === 'GET') {
    return 'GET_BY_ID';
  }

  if (url === '/api/person' && method === 'POST') {
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
  return url?.split('/')?.[3];
};

module.exports = {
  getRoute,
  getId,
};
