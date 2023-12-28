const router = require('express').Router();
const { db } = require('../../firebase');

router.get('/', async (req, res, next) => {
  try {
    const ip = req.headers['x-forwarded-for'];
    const ref = db.collection('sessions');
    const querySessionExists = await ref.where('ip', '==', ip).count().get();

    const count = querySessionExists.data().count;

    if (count == 0) {
      await db.collection('sessions').add({
        timestamp: Date.now(),
        ip: ip,
        recording: false,
      });
    }

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/end', async (req, res, next) => {
  try {
    const ip = req.headers['x-forwarded-for'];
    const ref = db.collection('sessions');
    const snapshot = await ref.where('ip', '==', ip).get();

    if (!snapshot.empty) {
      snapshot.forEach(async (doc) => {
        await doc.delete();
      });
    }

    // await db.collection('sessions').doc(session.uuid).delete();

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
