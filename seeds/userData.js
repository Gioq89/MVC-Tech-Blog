const { User } = require("../models");

const userData = [
  {
    id: 1,
    username: "John",
    password: "1234",
  },
  {
    id: 2,
    username: "Jane",
    password: "5678",
  },
  {
    id: 3,
    username: "Jack",
    password: "9101",
  },
  {
    id: 4,
    username: "Jill",
    password: "1121",
  },
  {
    id: 5,
    username: "James",
    password: "3141",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
