const request = require('request')
exports.validad2 = (req, res) => {
  console.log(req.body);
  const cpf = (req.body.cpf != undefined) ? req.body.cpf : null;
  if (cpf != undefined) {
    const body = {
      id: process.env.MARATONA_ID,
      cpf: cpf,
      environment_id: process.env.ENVIRONMENT_ID,
      collection_id: process.env.COLLECTION_ID,
      iam_apikey: process.env.IAM_APIKEY,
      desafio: process.env.DESAFIO
    };
    console.log(body)
    if (!body) {
      res.status(404).json({
        msg: 'Something is missing'
      })
    } else {
      request({
        uri: 'https://8d829621.us-south.apiconnect.appdomain.cloud/desafios/desafio2',
        body: body,
        json: true,
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        }
      }, function (err, response) {
        if (err || response.body.error) {
          res.status(500).json({
            msg: 'Something is wrong, contact support.'
          });
        } else if (response.body.err) {
          res.status(400).json({
            msg: 'Already Submited.'
          });
        } else {
          res.status(201).json({
            msg: response.body
          });
        }
      });
    }
  }
  else res.status(404).json({
    msg: 'Something is missing'
  });
}

exports.getTest = (req, res) => {
  const body = {
    err: false,
    environment_id: process.env.ENVIRONMENT_ID,
    collection_id: process.env.COLLECTION_ID,
    iam_apikey: process.env.IAM_APIKEY,
    desafio: process.env.DESAFIO
  };
  console.log(body);
  request({
    uri: 'https://8d829621.us-south.apiconnect.appdomain.cloud/desafios/testeDiscovery',
    body: body,
    json: true,
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    }
  }, (error, response, body) => {
    if (error) res.status(500).json({
      msg: error
    });
    else {
      res.status(200).json({
        msg: body
      })
    }
  });
}
