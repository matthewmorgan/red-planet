const BEARINGS = ['N', 'E', 'S', 'W'];
const VERTICAL_GRID_SIZE = 10;
const HORIZONTAL_GRID_SIZE = 10;

export default function (c, b) {

  let coordinates = c || [0, 0];
  let bearing = b || BEARINGS[0];

  if (coordinates[0] < 0 || coordinates[0] > HORIZONTAL_GRID_SIZE)
    throw new Error('Illegal starting position.');
  if (coordinates[1] < 0 || coordinates[1] > VERTICAL_GRID_SIZE)
    throw new Error('Illegal starting position.');
  if (BEARINGS.indexOf(bearing) < 0)
    throw new Error('Illegal starting bearing.');

  const obstacles = {};

  function evaluate(commands) {
    commands.forEach(command => {
      if (command === 'F') move(1);
      if (command === 'B') move(-1);
      if (command === 'L') turnLeft();
      if (command === 'R') turnRight();
    });
  }

  function getBearing() {
    return bearing;
  }

  function getPosition() {
    return coordinates;
  }

  function move(direction) {
    const setCoords = {
      'N': () => coordinates[1] += direction,
      'S': () => coordinates[1] -= direction,
      'E': () => coordinates[0] += direction,
      'W': () => coordinates[0] -= direction
    };
    const oldCoords = [coordinates[0], coordinates[1]];
    setCoords[bearing].call();
    const key = JSON.stringify(coordinates);
    if (obstacles[key]) {
      const message = 'Obstacle encountered at [' + coordinates[0] + ', ' + coordinates[1] + ']';
      coordinates = [oldCoords[0], oldCoords[1]];
      throw new Error(message);
    }
    wrapCoords();
  }

  function wrapCoords() {
    if (coordinates[0] > HORIZONTAL_GRID_SIZE-1) coordinates[0] = coordinates[0] % HORIZONTAL_GRID_SIZE;
    if (coordinates[0] < 0) coordinates[0] = (coordinates[0] % HORIZONTAL_GRID_SIZE) + HORIZONTAL_GRID_SIZE;
    if (coordinates[1] > VERTICAL_GRID_SIZE-1) coordinates[1] = coordinates[1] % VERTICAL_GRID_SIZE;
    if (coordinates[1] < 0) coordinates[1] = (coordinates[1] % VERTICAL_GRID_SIZE) + VERTICAL_GRID_SIZE;
  }

  function turnRight() {
    const currentBearingIndex = BEARINGS.indexOf(bearing);
    const newBearingIndex = (currentBearingIndex + 1) % BEARINGS.length;
    bearing = BEARINGS[newBearingIndex];
  }

  function turnLeft() {
    const currentBearingIndex = BEARINGS.indexOf(bearing);
    const newBearingIndex = (currentBearingIndex + 3) % BEARINGS.length;
    bearing = BEARINGS[newBearingIndex];
  }

  function setObstacle(obstacle) {
    obstacles[JSON.stringify(obstacle)] = true;
  }

  return {coordinates, getBearing, getPosition, evaluate, setObstacle};
};
