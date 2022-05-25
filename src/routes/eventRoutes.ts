import express, {
  Request, Response,
} from 'express';

import Event from '../models/Event';
import User from '../models/User';

async function getEvents(req: Request, res: Response): Promise<void> {
  // It returns a void, but internally it's a promise.
  const allEvents = await Event.find();
  if (allEvents.length === 0) {
    res.status(404).send('There are no events yet!');
  } else {
    res.status(200).send(allEvents);
  }
}

async function getEventByUserName(req: Request, res: Response): Promise<void> {
  const userFound = await User.findOne({
    name: req.params.nameUser,
  }).populate('events');
  if (userFound == null) {
    res.status(404).send("The user doesn't exist!");
  } else {
    res.status(200).send(userFound);
  }
}

async function addEventToUser(req: Request, res: Response): Promise<void> {
  const {
    id, name, admin, category,
  } = req.body;
  const userFound = await User.findOne({
    name: req.params.nameUser,
  }).populate('events');
  const newEvent = new Event({
    id, name, admin, category,
  });
  await userFound.events.push(newEvent);
  await userFound.save();
  res.status(200).send('Event added!');
}

async function updateEvent(req: Request, res: Response): Promise<void> {
  const eventToUpdate = await Event.findOneAndUpdate(
    { name: req.params.nameEvent },
    req.body,
  );
  if (eventToUpdate == null) {
    res.status(404).send("The event doesn't exist!");
  } else {
    res.status(200).send('Updated!');
  }
}

async function deleteEvent(req: Request, res: Response): Promise<void> {
  const eventToDelete = await Event.findOneAndDelete(
    { name: req.params.nameUser },
    req.body,
  );
  if (eventToDelete == null) {
    res.status(404).send("The event doesn't exist!");
  } else {
    res.status(200).send('Deleted!');
  }
}

const router = express.Router();

router.get('/', getEvents);
router.get('/:nameUser', getEventByUserName);
router.post('/:nameUser', addEventToUser);
router.put('/:nameEvent', updateEvent);
router.delete('/:nameEvent', deleteEvent);

export default router;
