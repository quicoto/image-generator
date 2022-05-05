module.exports.getLines = (content) => content.split(/\r?\n/);

module.exports.wrapText = (ctx, text, x, y, maxTextWidth, lineHeight) => {
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
};
