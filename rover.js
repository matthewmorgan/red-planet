const BEARINGS = ['N', 'E', 'S', 'W'];

export default function () {

  let coordinates = [0, 0];
  let bearing = BEARINGS[0];
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

  function getPosition(){
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
      console.log('oldCoords were ' + oldCoords);
      const message = 'Obstacle encountered at [' + coordinates[0] + ', ' + coordinates[1] + ']';
      coordinates = [oldCoords[0], oldCoords[1]];
      throw new Error(message);
    }
    wrapCoords();
  }

  function wrapCoords() {
    if (coordinates[0] > 9) coordinates[0] = coordinates[0] % 10;
    if (coordinates[0] < 0) coordinates[0] = (coordinates[0] % 10) + 10;
    if (coordinates[1] > 9) coordinates[1] = coordinates[1] % 10;
    if (coordinates[1] < 0) coordinates[1] = (coordinates[1] % 10) + 10;
  }

  function turnRight() {
    const currentBearingIndex = BEARINGS.indexOf(bearing);
    const newBearingIndex = (currentBearingIndex + 1) % 4;
    bearing = BEARINGS[newBearingIndex];
  }

  function turnLeft() {
    const currentBearingIndex = BEARINGS.indexOf(bearing);
    const newBearingIndex = (currentBearingIndex - 1) % 4;
    bearing = BEARINGS[newBearingIndex];
  }

  function setObstacle(obstacle) {
    obstacles[JSON.stringify(obstacle)] = true;
  }

  return {coordinates, getBearing, getPosition, evaluate, setObstacle};
};
