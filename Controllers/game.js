function handleGame(req, res, db) {
  const { id, answer } = req.body;
  db("users")
    .where("id", "=", id)
    .increment({
      games: 1,
      rightanswers: answer,
    })
    .returning(["games", "rightanswers"])
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => res.status(400).json(err));
}

export default handleGame;
