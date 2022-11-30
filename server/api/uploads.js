const router = require('express').Router();
const { db } = require('../../firebase');

// POST /api/uploads/:address
router.post('/:address', async (req, res, next) => {
  try {
    const address = req.params.address;
    const song = JSON.parse(req.body.song);
    const repaired = song.base64File.split(' ').join('+');

    const result = await db.collection('uploads').add({
      time: new Date().toISOString(),
      address: address,
      name: song.FileName,
      wavBase64: repaired,
    });

    res.send(result.id);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
