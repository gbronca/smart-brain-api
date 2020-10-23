const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');

const db = knex({
	client: 'pg',
	connection: {
		host : '127.0.0.1',
		user : 'gbronca',
		password : '',
		database : 'smart-brain'
	}
});

// console.log(db.select('*').from('users'));

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send(db.users);
});

// Sign-in
app.post('/signin', (req, res) => {
	signin.handleSignin(req, res, db, bcrypt);
});

// Register
app.post('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt);
});

// Profile
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db));

// Image
app.put('/image', (req, res) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json('unable to get entries'));
});

app.listen(3000, () => {
	console.log('app is running on port 3000');
});