const db = require('../helpers/db.js').db

const model = {
  saveSignature(req, res, next) {
    const {
      signer,
      message,
      r,
      s,
      v
    } = req.body

    if(!signer || !message || !r || !s || !v) {
      res.status(500)
      res.body = { 'status': 500, 'success': false, 'message': 'Nope' }
      return next(null, req, res, next)
    }

    db.none('insert into signatures (uuid, delegatee, nonce, expiry, signer, r, s, v, created) values (md5(random()::text || clock_timestamp()::text)::uuid, $1, $2, $3, $4, $5, $6, $7, now())',
      [message.delegatee, message.nonce, message.expiry, signer, r, s, v])
    .then(() => {
      res.status(205)
      res.body = { 'status': 200, 'success': true, 'message': 'Done' }
      return next(null, req, res, next)
    })
    .catch((ex) => {
      console.log(ex)
      res.status(500)
      res.body = { 'status': 500, 'success': false, 'message': ex }
      return next(null, req, res, next)
    })
  }
}

module.exports = model
