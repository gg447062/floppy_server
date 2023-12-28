const router = require('express').Router();
const { db } = require('../../firebase');

router.post('/', async (req, res, next) => {
  try {
    const ip = req.headers['x-forwarded-for'];
    const ref = db.collection('sessions');
    const snapshot = await ref.where('ip', '==', ip).get();
    const state = req.query.state == 'on' ? true : false;
    await snapshot.update({ record: state });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
