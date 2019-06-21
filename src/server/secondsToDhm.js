module.exports = seconds => {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);

  var dDisplay = d + "d ";
  var hDisplay = h + "h ";

  return dDisplay + hDisplay;
};
