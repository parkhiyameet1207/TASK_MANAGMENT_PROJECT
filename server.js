const express = require("express");
const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/TasksList");
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const Schema = mongoose.Schema;

const subtTaskSchema = new Schema({
  title: String,
  cardId: String,
  listId: { type: Schema.Types.ObjectId, ref: 'MainTask' },
  index: Number
});

const mainTaskSchema = new Schema({
  title: String,
  subtasks: [{ type: Schema.Types.ObjectId, ref: 'SubtTask' }],
  index: Number

});

const MainTask = mongoose.model('maintask', mainTaskSchema);
const SubtTask = mongoose.model('subtask', subtTaskSchema);

app.post('/api/board/addlist', async (req, res) => {
  const { listId, title, index } = req.body
  let data = new MainTask({ title: title, index: index });
  await data.save();
  res.send(data);
});

app.get('/api/board/getlsit', async (req, res) => {
  let db = MainTask;
  let data = await db.find().exec();
  res.send(data);
})
app.post('/api/board/addcard', async (req, res) => {
  const { cardText, cardId, listId, index } = req.body;
  let mainTask = await MainTask.findById(listId);
  let data = new SubtTask({ title: cardText, cardId: cardId, listId: listId, index: index });
  await data.save();
  res.send(data);
});

app.get('/api/board/getcard', async (req, res) => {
  let db = SubtTask;
  let data = await db.find().exec();
  res.json(data);
})

app.put('/api/board/lists/:listId', async (req, res) => {
  try {
    const { listId } = req.params;
    const { title } = req.body;

    const updatedList = await SubtTask.findByIdAndUpdate(
      listId,
      { title },
      { new: true }
    );

    res.json(updatedList);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.put('/api/board/card/:listId', async (req, res) => {
  try {
    const { listId } = req.params;
    const { title } = req.body;
    const updatedList = await MainTask.findByIdAndUpdate(
      listId,
      { title },
      { new: true }
    );
    res.json(updatedList);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.delete('/api/board/lists/:listId', async (req, res) => {
  try {
    const { listId } = req.params;
    await SubtTask.findByIdAndDelete(listId);
    res.json({ message: 'List deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.delete('/api/board/listdata/:listId', async (req, res) => {
  try {
    const { listId } = req.params;
    await MainTask.findByIdAndDelete(listId);
    res.json({ message: 'List deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.put('/api/board/cardmove', async (req, res) => {
  const { sourceListId, destListId, oldCardIndex, newCardIndex } = req.body;

  try {
    const card = await SubtTask.find().exec();
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    const removedCard = card.splice(oldCardIndex, 1)[0];
    card.splice(newCardIndex, 0, removedCard);
    res.send(card)
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/board/cardmove', async (req, res) => {
  const { oldCardIndex, newCardIndex, sourceListId, destListId, cardId } = req.body;

  try {
    if (sourceListId === destListId) {
      // Moving within the same list
      const list = await SubtTask.findById(sourceListId).populate('cards');
      const [movedCard] = list.cards.splice(oldCardIndex, 1);
      list.cards.splice(newCardIndex, 0, movedCard);
      await list.save();
    } else {
      // Moving to a different list
      const sourceList = await SubtTask.findById(sourceListId).populate('cards');
      const destList = await SubtTask.findById(destListId).populate('cards');

      const [movedCard] = sourceList.cards.splice(oldCardIndex, 1);
      destList.cards.splice(newCardIndex, 0, movedCard);

      // Update the list references in the card document
      movedCard.listId = destListId;
      await movedCard.save();

      await sourceList.save();
      await destList.save();
    }

    res.status(200).send('Card moved successfully');
  } catch (error) {
    res.status(500).send('Error moving card: ' + error.message);
  }
});


app.listen(5000);