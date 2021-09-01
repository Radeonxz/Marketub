const moduleNam = "server";
const fctName = `${moduleNam}'s pid: ${process.pid}`;

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

global.__base = __dirname + "/";
const config = require(path.join(__base, "config/config"));
const routes = require(path.join(__base, "initializers/routes"));
const logger = require(path.join(__base, "middlewares/logger"));

// Init express app setup
const app = express();
app.set("port", config.server.port);
app.set("mongoURL", config.mongodb.url);

// Init static upload folder
// app.use('/uploads', express.static('uploads'));

// Init body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Method", "POST, GET, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	if (req.method === "OPTIONS") {
		return res.sendStatus(200);
	}
	next();
});

// Init logger middleware
app.use(logger);

// Init routes setup
routes.setup(app);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	// app.use(express.static(path.join(__dirname, "../build")));
	// app.get("*", (req, res) => {
	// 	res.sendFile(path.join(__dirname, "../build"));
	// });
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

// Routes validation
// const reditectUnmatchedAPI = (req, res) => {
// 	return res.status(400).json({
// 		status: "error",
// 		data: {
// 			level: "ERR",
// 			code: "400",
// 			message: "Invalid API Call",
// 			details: "Invalid API Call"
// 		}
// 	});
// };
// app.all("*", reditectUnmatchedAPI);

// MongoDB setup
const MongoDBOptions = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
};

mongoose
	.connect(app.get("mongoURL"), MongoDBOptions)
	.then(() => {
		// Start server
		console.info("Express server starting ....");
		const server = app.listen(app.get("port"), function () {
			console.info(
				"Express server is listening on port " +
					server.address().port +
					", " +
					fctName
			);
		});
	})
	.catch((err) => {
		console.error(err);
	});

module.exports = app;
