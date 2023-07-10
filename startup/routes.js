const express = require('express');

const api = require('../API/III.router')

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/", api);
}