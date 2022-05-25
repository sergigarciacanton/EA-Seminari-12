import express from 'express'; // Import SOME modules from express.

const router = express.Router();
router.get('/', (req, res) => res.status(200).send('API: /api/users'));

export default router;
