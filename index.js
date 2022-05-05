const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

const width = 1200;
const height = 630;
const titleMaxWidth = 1000;
const titleLineHeight = 100;

const imageCanvas = createCanvas(width, height);
const context = imageCanvas.getContext('2d');

function getLines(content) {
  return content.split(/\r?\n/);
}

function wrapText(ctx, text, x, y, maxTextWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';

  for (let n = 0; n < words.length; n += 1) {
    const testLine = `${line + words[n]} `;
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxTextWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = `${words[n]} `;
      // eslint-disable-next-line no-param-reassign
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

context.fillStyle = '#343a40';
context.fillRect(0, 0, width, height);

context.font = 'regular 70px Menlo';
context.textAlign = 'center';
context.textBaseline = 'top';

const databaseContent = fs.readFileSync('./database.txt', { encoding: 'utf8', flag: 'r' });
const lines = getLines(databaseContent);

lines.forEach((line) => {
  const content = line.split('|');
  const postId = content[0];
  const postTitle = content[1];
  let textWidth;

  context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120);
  context.fillStyle = '#fd7e14';
  wrapText(context, postTitle, 600, 80, titleMaxWidth, titleLineHeight);

  context.fillStyle = '#fff';
  context.font = 'bold 30pt Menlo';
  context.fillText('ricard.dev', 580, 460);

  loadImage('./profile-photo.png').then((image) => {
    context.drawImage(image, 350, 450, 70, 70);
    const buffer = imageCanvas.toBuffer('image/png');
    fs.writeFileSync(`./images/${postId}.png`, buffer);
  });
});
