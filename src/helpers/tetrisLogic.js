export const rotate = (figures) => {
  let min_x = 0;
  const [avg_x, avg_y] = figures
    .reduce(([prev_x, prev_y], [x, y]) => [prev_x + x, prev_y + y], [0, 0])
    .map((cur) => Math.round(cur / figures.length));

  let return_val = figures.map(([x, y]) => {
    const x_val = y - avg_y + avg_x;
    min_x = Math.min(x_val, min_x);
    return [x_val, -(x - avg_x) + avg_y];
  });

  if (min_x < 0) {
    return_val = return_val.map(([x, y]) => [x + -min_x, y]);
  }

  return return_val.sort(([a_x, a_y], [b_x, b_y]) => {
    if (a_x > b_x || (a_x === b_x && a_y > b_y)) {
      return -1;
    }

    return 0;
  });
};

export const canBeMoved = (figure, tiles) =>
  figure.every(([x, y]) =>
    y >= 1 ? !(tiles[(y - 1) * 10 + x].busy || x < 0 || x > 9) : true
  );

export const clearTiles = (figure, tiles) => {
  figure.forEach(([x, y]) => {
    if (y >= 1) {
      tiles[(y - 1) * 10 + x].busy = false;
    }
  });

  return tiles;
};

export const fillTiles = (figure, tiles) => {
  figure.forEach(([x, y]) => {
    if (y >= 1) {
      tiles[(y - 1) * 10 + x].busy = true;
    }
  });

  return tiles;
};
