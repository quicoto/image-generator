const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const utils = require('./utils');

const width = 1200;
const height = 630;
const titleMaxWidth = 1000;
const titleLineHeight = 100;
const paths = {
  images: './images',
  database: './database.txt',
  profileImage: './profile-photo.png',
};
const fonts = {
  postTitle: 'regular 70px Menlo',
  site: 'bold 30pt Menlo',
};
const colors = {
  background: '#343a40',
  postTitle: '#fd7e14',
  site: '#fff',
};

const imageCanvas = createCanvas(width, height);
const context = imageCanvas.getContext('2d');

context.fillStyle = colors.background;
context.fillRect(0, 0, width, height);

context.font = fonts.postTitle;
context.textAlign = 'center';
context.textBaseline = 'top';

const databaseContent = fs.readFileSync(paths.database, { encoding: 'utf8', flag: 'r' });
const lines = utils.getLines(databaseContent);

lines.forEach((line) => {
  const content = line.split('|');
  const postId = content[0];
  const postTitle = content[1];
  let textWidth;

  context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120);
  context.fillStyle = colors.postTitle;
  utils.wrapText(context, postTitle, 600, 80, titleMaxWidth, titleLineHeight);

  context.fillStyle = colors.site;
  context.font = fonts.site;
  context.fillText('ricard.dev', 580, 460);

  loadImage(paths.profileImage).then((image) => {
    context.drawImage(image, 350, 450, 70, 70);
    const buffer = imageCanvas.toBuffer('image/png');
    fs.writeFileSync(`${paths.images}/${postId}.png`, buffer);
  });
});
