require('dotenv').load();
const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

const discovery = new DiscoveryV1({
  version: "2018-10-15",
  iam_apikey: process.env.IAM_APIKEY,
  url: process.env.SERVICE_ENDPOINT
});

exports.discoveryQuery = (req, res) => {
  return new Promise((resolve, reject) => {
    discovery.query({
      environment_id: process.env.ENVIRONMENT_ID,
      collection_id: process.env.COLLECTION_ID,
      configuration: process.env.CONFIGURATION_ID,
      query: req.body.query,
      count: 100,
    }, (error, data) => {
      if (error) {
        res.status(400).json({
          msg: error
        })
        reject(error);
      } else {
        res.status(201).json({
          data: data
        })
        resolve(data);
      }
    });
  }).catch(error => console.log(error));
}
