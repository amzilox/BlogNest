"use strict";
const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const compression = require("compression");
dotenv.config({ path: "./config.env" });

const register = require("./src/routes/register_route");
const login = require("./src/routes/login_route");
const logout = require("./src/routes/logout_route");
const home = require("./src/routes/home_route");
const createBlog = require("./src/routes/create_blog_route");
const blogDetail = require("./src/routes/blog_detail_route");
const readingList = require("./src/routes/reading_list_route");
const blogUpdate = require("./src/routes/blog_update_route");
const blogDelete = require("./src/routes/blog_delete_route");
const profile = require("./src/routes/profile_route");
const dashboard = require("./src/routes/dashboard_route");
const dbMethods = require("./src/config/mongoose_config");
const userAuth = require("./src/middlewares/user_auth");
const settings = require("./src/routes/settings_route");
const app = express();

// Setting view engine
app.set("view engine", "ejs");

// Parse urlencoded body
app.use(express.urlencoded({ extended: true }));

// Set public Directory
app.use(express.static(`${__dirname}/public`));

// Parse JSON Bodies
app.use(express.json({ limit: "10mb" }));

// instance for session storage
const store = MongoStore.create({
  mongoUrl: process.env.DATABASE_CONNECTION_URL,
  collectionName: "sessions",
  dbName: "blognest",
});

// initial express session
app.use(
  session({
    secret: process.env.SECRET_KEY, // Used to sign the session ID cookie
    resave: false, // Prevents resaving session if nothing has changed
    saveUninitialized: false, // Don't create a session until something is stored
    store,
    cookie: {
      maxAge: Number(process.env.SESSION_MAX_AGE), // Cookie expiration time (1 hour in this case)
    },
  })
);

// Defining Routes
app.use("/register", register);
app.use("/login", login);
app.use("/logout", logout);
app.use("/", home);

// blog detail page
app.use("/blogs", blogDetail);

// profile page
app.use("/profile", profile);

// user authorization
app.use(userAuth);

app.use("/createblog", createBlog);

// reading list page
app.use("/readinglist", readingList);

// blog update & blog delete
app.use("/blogs", blogUpdate, blogDelete);

// Dashboard
app.use("/dashboard", dashboard);

// settings page
app.use("/settings", settings);

app.use(compression());

// Starting the server:
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, async () => {
  console.log(`server listening on port ${PORT}`);
  await dbMethods.connectDB(process.env.DATABASE_CONNECTION_URL);
});

server.on("close", async () => await dbMethods.disconnectDB());
