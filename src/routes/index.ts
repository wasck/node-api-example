import * as express from 'express';
import requireDir from 'require-dir';

const router = express.Router();
const routes = requireDir(__dirname, {recurse: true});

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/test', routes.controller.test);

export = router;