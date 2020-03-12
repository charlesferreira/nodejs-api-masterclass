const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Bootcamp = require('./models/Bootcamp');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);

    console.log('Data imported...'.green.inverse);
  } catch (err) {
    console.log(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();

    console.log('Data destroyed...'.red.inverse);
  } catch (err) {
    console.log(err);
  }
};

// Run seeder
(async function() {
  if (process.argv[2] === '-i' || process.argv[2] === '--import') {
    await importData();
  } else if (process.argv[2] === '-d' || process.argv[2] === '--delete') {
    await deleteData();
  } else if (process.argv[2] === '-r' || process.argv[2] === '--reset') {
    await deleteData();
    await importData();
  }
  process.exit();
})();