const Feedback = require("../models/Feedback");
const Properties = require("../models/Properties");

module.exports = {
    async create(req, res) {
        const { properties_id } = req.params;
        const { host, note, text, date, title } = req.body;
        const data = {host, note, text, date, title, properties_id};
        try {
            const property = await Properties.findByPk(properties_id);
            if (!property) {
                return res.status(400).json({ error: "Imóvel não encontrado" });
            }
            const createFeedback = await Feedback.create(data);
            return res.json(createFeedback);
        } catch (error) {
            throw new Error(error);
        }
    },

    async index(req, res) {
        try {
            const { properties_id } = req.params;
            const property = await Properties.findByPk(properties_id, {
                include: { association: "feedbacks" }
            });
            return res.json(property);
        } catch (error) {
            throw new Error(error);
        }
    }
};