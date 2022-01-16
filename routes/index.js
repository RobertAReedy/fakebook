const router = require("express").Router();
const apiRoutes = require("./apiRoutes/index");

router.use("/api", apiRoutes);

router.use((req, res) => {
  res.status(404).send("Got a problem in routes/index.js");
});

module.exports = router;