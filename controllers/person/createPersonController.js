const { getPersonData } = require('../../utils/db_worker');
const Person = require('../../models/personModel');
const { errorHandler } = require('./errorController');
const { resHeaders } = require('../../utils/config');

const createPerson = async (req, res) => {
  try {
    const body = await getPersonData(req);

    const parsedParams = JSON.parse(body);

    const person = {
      name: parsedParams?.name,
      age: parsedParams?.age,
      hobbies: parsedParams?.hobbies,
    };

    const missedParams = [];
    Object.keys(person).forEach((key) => {
      if (
        !person[key] ||
        (key === 'hobbies' && !Array.isArray(parsedParams?.hobbies))
      ) {
        missedParams.push(key);
      }
    });

    errorHandler(
      res,
      400,
      `The following required parameters are missing: ${missedParams.join(
        ',',
      )}`,
    );

    const newPerson = await Person._create(person);

    res.writeHead(201, resHeaders);
    return res.end(JSON.stringify(newPerson));
  } catch (error) {
    console.log(error);
    errorHandler(res, 400, `Wrong body passed.`);
  }
};

module.exports = {
  createPerson,
};
