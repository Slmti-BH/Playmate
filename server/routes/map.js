const { Router } = require("express");
const mapRoutes = Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

//to read from users.json
const readData = () => {
  const mapData = fs.readFileSync("./data/map.json");
  return JSON.parse(mapData);
};

// to write to videos.json
const writeFile = (mapData) => {
  fs.writeFileSync("./data/map.json", JSON.stringify(mapData));
};

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

// get all map data specific to user
mapRoutes.get("/:username", (req, res) => {
  const mapData = readData();
  const userMapData = mapData.filter(
    (data) => data.username !== req.params.username
  );
  if (!userMapData.length) {
    return res.status(404).send("No users found.");
  }
  res.status(200).json(userMapData);
});
// validation middleware
const Validation = (req, res, next) => {
  console.log(req.body);
  if (
    !req.body.username ||
    !req.body.name ||
    !req.body.numberOfChildren ||
    !req.body.childrenAgeGroup ||
    !req.body.lng ||
    !req.body.lat
  ) {
    res
      .status(400)
      .send(
        "Please make sure to include username, name, number of children , children age group, lnt and lat."
      );
  } else {
    next();
  }
};

// clean up previous posts for the user in map.json file
const cleanUp = (req, res, next) => {
  const mapData = readData();
  const username = mapData.find((data) => data.username === req.body.username);
  if (username) {
    const filteredMapData = mapData.filter(
      (data) => data.username !== req.body.username
    );
    writeFile(filteredMapData);
  } else {
    next();
  }
};
mapRoutes.post("/", Validation, cleanUp, (req, res) => {
  const {
    lng,
    lat,
    username,
    name,
    numberOfChildren,
    childrenAgeGroup,
    address,
    notes,
  } = req.body;
  const mapData = readData();

  const newData = {
    id: uuid(),
    username: username,
    name: name,
    numberOfChildren: numberOfChildren,
    childrenAgeGroup: childrenAgeGroup,
    lng: lng,
    lat: lat,
    address: address,
    notes: notes,
  };

  mapData.push(newData);
  writeFile(mapData);
  res.json({ success: "true" });
});

mapRoutes.delete("/:username", (req, res) => {
  const mapData = readData();

  // check user exists
  const user = mapData.find((data) => data.username === req.params.username);
  console.log(req.params.username);

  if (!user) {
    return res.status(404).send("The user is not found.");
  }

  const filteredMapData = mapData.filter(
    (data) => data.username !== req.params.username
  );

  writeFile(filteredMapData);
  console.log(req.params.username);
  console.log(filteredMapData);

  res.status(204).send("user deleted");
});

// add notes
mapRoutes.put("/:username/edit", (req, res) => {
  const mapData = readData();
  const targetData = mapData.find(
    (data) => data.username === req.params.username
  );
  if (!targetData) {
    return res.status(404).send("The user is not found.");
  }
  const notesObj = { notes: req.body.notes };
  delete targetData.notes;
  const updatedData = { ...notesObj, ...targetData };

  mapData.splice(mapData.indexOf(targetData), 1, updatedData);

  writeFile(mapData);
  res.status(204).json(updatedData);
});

module.exports = mapRoutes;
