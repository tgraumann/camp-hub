const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/camp-hub");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20 + 10);
    const camp = new Campground({
      author: "6716a579922d457e85cad0b9",
      location: `${(cities[random1000].city, cities[random1000].state)}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis tempora quidem amet mollitia itaque tenetur et maiores molestiae, necessitatibus veniam vitae. Ad, nemo similique labore quasi nobis molestias beatae voluptatibus.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dkx7joegh/image/upload/v1730776871/CampHub/zcrgqmrotg2ajo9tuoex.jpg",
          filename: "CampHub/zcrgqmrotg2ajo9tuoex",
        },
        {
          url: "https://res.cloudinary.com/dkx7joegh/image/upload/v1730776871/CampHub/fxdzfkoopgs8v7bcyjax.avif",
          filename: "CampHub/fxdzfkoopgs8v7bcyjax",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
