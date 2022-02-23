const Properties = require("../models/Properties");

module.exports = {
    async create(req, res) {
        const { name, type, adress, district, guests, description, available, shared } = req.body;
        const data = { name, type, adress, district, guests, description, available, shared };
        try {
            const createProperty = await Properties.create(data);
            return res.json(createProperty);
        } catch (error) {
            throw new Error(error);
        }
    },

    async index(req, res) {
        try {
            const getAll = await Properties.findAll();
            return res.json(getAll);
        } catch (error) {
            throw new Error(error);
        }
    }
};