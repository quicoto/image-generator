const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const rimraf = require('rimraf');
const utils = require('./utils');

// Configuration
const delay = 1000; // Throttle to prevent memory issues
let throttle = 0;
const canvas = {
  height: 630,
  width: 1200,
};
const title = {
  maxWidth: 1000,
  lineHeight: 100,
};
const paths = {
  images: './images',
  database: './database.txt',
  profileImage: './profile-photo.png',
};
const fonts = {
  postTitle: 'regular 90px Kefa',
  site: 'bold 30pt Menlo',
};
const colors = {
  background: '#343a40',
  postTitle: '#fd7e14',
  site: '#fff',
};
const siteName = 'ricard.dev';

// Delete the directory content
rimraf.sync(paths.images);

// Create the required folder
fs.mkdir(paths.images, () => {});

// Read the database file and get all the lines in an array
const databaseContent = fs.readFileSync(paths.database, { encoding: 'utf8', flag: 'r' });
const lines = utils.getLines(databaseContent);

lines.forEach((line) => {
  setTimeout(() => {
    const imageCanvas = createCanvas(canvas.width, canvas.height);
    const context = imageCanvas.getContext('2d');
    const content = line.split('|'); // Example line: "401|Autofocus in HTML5"
    const postId = content[0]; // WordPress Post ID
    const postTitle = content[1];
    let textWidth;

    // eslint-disable-next-line no-console
    console.log(`Starting time: ${new Date().toLocaleString()} - ${postTitle}`);

    // Define the canvas background
    context.fillStyle = colors.background;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Define the post title text
    context.font = fonts.postTitle;
    context.textAlign = 'center';
    context.textBaseline = 'top';

    // Define the area of the text
    context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120);

    // Color the text
    context.fillStyle = colors.postTitle;

    // Fills the text with appriate word wrapping
    utils.wrapText(context, postTitle, 600, 80, title.maxWidth, title.lineHeight);

    // Define the site name text
    context.fillStyle = colors.site;
    context.font = fonts.site;
    context.fillText(siteName, 580, 520);

    // Load the profile image next to the site name
    loadImage(paths.profileImage).then((image) => {
      // Defines the image position and size
      context.drawImage(image, 350, 510, 70, 70);

      // Create the final image
      fs.writeFileSync(
        `${paths.images}/${postId}.png`,
        imageCanvas.toBuffer('image/png'),
      );
    });
  }, throttle);

  throttle += delay;
});
