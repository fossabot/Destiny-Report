export default (all, wins) => {
  if (!all) {
    all = 1;
  }
  return ((wins / all) * 100).toFixed(0);
};
