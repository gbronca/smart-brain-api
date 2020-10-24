const Clarifai = require('clarifai');
const { response } = require('express');

const app = new Clarifai.App({
	apiKey: '35832779b8d64d96a7d153286574e9f2'
});

const handleApiCall = (req, res) => {
	app.models.predict(
		'c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
		.then(data => res.json(data))
		.catch(err => res.status(400).json('Unable to connect to API'));
};

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json('unable to get entries'));
};

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};
