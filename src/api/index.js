const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const { Client } = require("@hubspot/api-client");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
});

const Contact = mongoose.model("Contact", contactSchema);

const hubspotClient = new Client({
  accessToken: process.env.ACCESS_TOKEN,
});

app.post("/api/saveContact", async (req, res, next) => {
  try {
    const { email, firstName, lastName, phoneNumber } = req.body;

    const newContact = new Contact({
      email,
      firstName,
      lastName,
      phoneNumber,
    });

    await newContact.save();
    console.log("Contact saved successfully");

    res.sendStatus(200);
  } catch (error) {
    console.error("Error saving contact:", error);
    next(error);
  }
});

app.post("/api/saveContactToHubSpot", async (req, res, next) => {
  try {
    const { email, firstName, lastName, phoneNumber } = req.body;

    const properties = {
      email,
      firstname: firstName,
      lastname: lastName,
      phone: phoneNumber,
    };

    const SimplePublicObjectInputForCreate = {
      properties,
      associations: [],
    };

    const apiResponse = await hubspotClient.crm.contacts.basicApi.create(
      SimplePublicObjectInputForCreate
    );
    console.log(JSON.stringify(apiResponse, null, 2));

    res.sendStatus(200);
  } catch (error) {
    if (error.message === "HTTP request failed") {
      console.error(JSON.stringify(error.response, null, 2));
    } else {
      console.error(error);
    }
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
