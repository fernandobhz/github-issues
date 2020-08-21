/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable func-names */
import "dotenv/config";
import mongoose from "mongoose";
import request from "supertest";
import { expect } from "chai";
import { app } from "../core/app";
import { updateRepository } from "../helpers/issues";
import { MONGO_CONNECTION_STRING } from "../core/config";

let token;
describe("Account", function () {
  const email = "bob@email.com";
  const password = "12345678";
  const name = "Bob";

  before(function (done) {
    mongoose.connection.on("error", console.error.bind(console, "connection error:"));
    mongoose.connection.once("open", done);
    mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(function (done) {
    mongoose.disconnect();
    done();
  });

  it("Close account if exits", function (done) {
    request(app).post("/users/close-account").send({ email, password }).end(done);
  });

  it("Register the account", function (done) {
    request(app)
      .post("/users/register")
      .send({ email, password, name })
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function (err, res) {
        token = JSON.parse(res.text);
        done();
      });
  });

  it("Login", function (done) {
    request(app).post("/users/login").send({ email, password }).expect("Content-Type", /json/).expect(200, done);
  });
});

describe("Repositories", function () {
  const fullName = "fernandobhz/nodejs-boilerplate";
  const term = "react";

  before(function (done) {
    mongoose.connection.on("error", console.error.bind(console, "connection error:"));
    mongoose.connection.once("open", done);
    mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(function (done) {
    mongoose.disconnect();
    done();
  });

  it("Seaching a lib", function (done) {
    this.timeout(10 * 1000);
    request(app)
      .get("/repositories/search")
      .query({ term })
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        const results = JSON.parse(res.text);
        expect(results).to.include("facebook/react");
        return done();
      });
  });

  it("Removing a lib", function (done) {
    request(app)
      .post("/repositories/remove")
      .set("Authorization", `Bearer ${token}`)
      .send({ fullName })
      .expect(204, done);
  });

  it("Adding a not existent item", function (done) {
    request(app)
      .post("/repositories/add")
      .set("Authorization", `Bearer ${token}`)
      .send({ fullName })
      .expect(201, function (err, res) {
        if (err) return done(err);
        const result = JSON.parse(res.text);
        expect(result).to.have.own.property("_id");
        expect(result.fullName).to.equal(fullName);
        expect(result).to.have.own.property("__v");
        return done();
      });
  });

  it("Adding an existing item", function (done) {
    request(app).post("/repositories/add").set("Authorization", `Bearer ${token}`).send({ fullName }).expect(400, done);
  });

  it("Update the stats", function (done) {
    request(app).post("/repositories/update").set("Authorization", `Bearer ${token}`).expect(204, done);
  });

  it("Update the stats of one repository", function (done) {
    this.timeout(10 * 1000);
    updateRepository({ fullName }).then(done);
  });

  it("Query the stats", function (done) {
    request(app)
      .get("/repositories/stats")
      .set("Authorization", `Bearer ${token}`)
      .expect(200, function (err, res) {
        if (err) throw err;
        const results = JSON.parse(res.text);

        // eslint-disable-next-line no-underscore-dangle
        const inserted = results.find(item => item._id === fullName);
        if (!inserted) throw new Error("Couldn't find the inserted repository on GET /repositories/stats");
        done();
      });
  });
});
