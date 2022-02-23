const express = require("express");
const FeedbackController = require("./controller/FeedbackController");
const ImoveisController = require("./controller/ImoveisController");

const routes = express.Router();

routes.post("/imoveis", ImoveisController.create);

routes.get("/imoveis", ImoveisController.index);

routes.post("/imoveis/:properties_id/feedback", FeedbackController.create);

routes.get("/imoveis/:properties_id/feedback", FeedbackController.index);

module.exports = routes;