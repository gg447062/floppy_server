const router = require('express').Router();

router.use('/floppys', require('./floppys'));
router.use('/uploads', require('./uploads'));
router.use('/connect', require('./connect'));
router.use('/record', require('./record'));
router.use('/downloads', require('./downloads'));

router.use((req, res, next) => {
  const err = new Error('Route not found!!');
  err.status = 404;
  next(err);
});

module.exports = router;
