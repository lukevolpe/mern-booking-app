const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Property = require('./models/Property.js');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const Booking = require('./models/Booking.js');

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'asdfasdfasdf';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (error, userData) => {
      if (error) throw error;
      resolve(userData);
    });
  });
}

app.get('/test', (req, res) => {
  res.json('Test OK');
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (error, token) => {
          if (error) throw error;
          res.cookie('token', token).json(userDoc);
        }
      );
    } else {
      res.status(422).json('pass not ok');
    }
  } else {
    res.json('not found');
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (error, userData) => {
      if (error) throw error;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = 'photo_' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: 'uploads' });
app.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads\\', ''));
  }
  res.json(uploadedFiles);
});

app.post('/create-property', (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    features,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (error, userData) => {
    if (error) throw error;
    const propertyDoc = await Property.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      features,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(propertyDoc);
  });
});

app.get('/user-properties', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (error, userData) => {
    if (error) throw error;
    const { id } = userData;
    res.json(await Property.find({ owner: id }));
  });
});

app.get('/properties/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await Property.findById(id));
});

app.put('/properties', async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    features,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (error, userData) => {
    if (error) throw error;
    const propertyDoc = await Property.findById(id);
    if (userData.id === propertyDoc.owner.toString()) {
      propertyDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        features,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await propertyDoc.save();
      res.json('Property saved');
    }
  });
});

app.get('/properties', async (req, res) => {
  res.json(await Property.find());
});

app.post('/bookings', async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { property, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;
  Booking.create({
    property,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((error) => {
      throw error;
    });
});

app.get('/bookings', async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate('property'));
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
