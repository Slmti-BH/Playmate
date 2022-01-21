const { Router } = require("express");
const authRoutes = Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

//to read from users.json
const readData = () => {
  const usersData = fs.readFileSync("./data/auth.json");
  return JSON.parse(usersData);
};

// to write to videos.json
const writeFile = (usersData) => {
  fs.writeFileSync("./data/auth.json", JSON.stringify(usersData));
};

// check we have all required fields
const registerValidation = (req, res, next) => {
  console.log("registerValidation");
  const usersData = readData();
  const username = usersData.find(
    (user) => user.username === req.body.username
  );
  if (
    !req.body.username ||
    !req.body.password ||
    !req.body.name ||
    !req.body.numberOfChildren ||
    !req.body.childrenAgeGroup
  ) {
    res
      .status(400)
      .send(
        "Please make sure to include username, name, password, email, number of children and children age group in the form."
      );
  }
  if (username) {
    res.status(400).send("Username already exists, enter other username.");
  } else {
    next();
  }
};

authRoutes.post("/register", registerValidation, (req, res) => {
  console.log("registerEndpointReached");

  const { username, password, name, numberOfChildren, ChildrenAgeGroup } =
    req.body;
  const usersData = readData();

  const newUser = {
    id: uuid(),
    username: username,
    name: name,
    password: password,
    numberOfChildren: numberOfChildren,
    ChildrenAgeGroup: ChildrenAgeGroup,
  };
  usersData.push(newUser);
  //   update usersData so that user information is added
  writeFile(usersData);
  res.json({ success: "true" });
});

// login endpoint
authRoutes.post("/sign-in", (req, res) => {
  const { username, password } = req.body;

  const usersData = readData();

  const user = usersData.find((user) => user.username === username);

  // handle the instances where user is not found/is found
  if (!user) {
    return res.status(404).send("User not found.");
  }
  //check if user entered correct password
  if (user.password !== password) {
    return res.status(401).send("Please enter correct password.");
  } else {
    const token = jwt.sign({ name: user.name }, JWT_SECRET, {
      expiresIn: "8h",
    });

    res.json({ token });
  }
});

// authorize middleware
const authorize = (req, res, next) => {
  // first check if headers contain authorization
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "not authorized" });
  }
  // else check token in headers
  const authToken = req.headers.authorization.split(" ")[1];

  // decode content of token
  jwt.verify(authToken, JWT_SECRET, (err, decoded) => {
    console.log("authorize middleware :: JWT verification");
    if (err) {
      return res.status(401).json({ message: "not authorized" });
    }
    // check if token is expired
    if (Date.now() > new Date(decoded.exp * 1000)) {
      return res.status(401).json({ message: "token expired" });
    }

    // decoded contents should to be on req.decoded
    req.decoded = decoded;
    next();
  });
};

// profile endpoint
authRoutes.get("/profile", authorize, (req, res) => {
  res.json(req.decoded);
});

module.exports = authRoutes;
