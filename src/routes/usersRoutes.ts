import express, {
  Request, Response,
} from 'express';

import User from '../models/User';

async function getUsers(req: Request, res: Response) : Promise<void> {
  const allUsers = await User.find();
  if (allUsers.length === 0) {
    res.status(404).send('There are no users yet!');
  } else {
    res.status(200).send(allUsers);
  }
}

async function getUserByName(req: Request, res: Response) : Promise<void> {
  const userFound = await User.findOne({ name: req.params.nameUser });
  if (userFound == null) {
    res.status(404).send("The user doesn't exist!");
  } else {
    res.status(200).send(userFound);
  }
}

async function addUser(req: Request, res: Response) : Promise<void> {
  const {
    id, name, age, password,
  } = req.body;
  const newUser = new User({
    id, name, age, password,
  });
  await newUser.save();
  res.status(200).send('User added!');
}

async function updateUser(req: Request, res: Response) : Promise<void> {
  const userToUpdate = await User.findOneAndUpdate({ name: req.params.nameUser }, req.body);
  if (userToUpdate == null) {
    res.status(404).send("The user doesn't exist!");
  } else {
    res.status(200).send('Updated!');
  }
}

async function deleteUser(req: Request, res: Response) : Promise<void> {
  const userToDelete = await User.findOneAndDelete({ name: req.params.nameUser }, req.body);
  if (userToDelete == null) {
    res.status(404).send("The user doesn't exist!");
  } else {
    res.status(200).send('Deleted!');
  }
}

const router = express.Router();

router.get('/', getUsers);
router.get('/:nameUser', getUserByName);
router.post('/', addUser);
router.put('/:nameUser', updateUser);
router.delete('/:nameUser', deleteUser);

export default router;
