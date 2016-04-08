const BEARINGS = ['N', 'E', 'S', 'W'];
const V_GRID_SIZE = 10;
const H_GRID_SIZE = 10;

export default function (c, b) {

  let pos = c || [0, 0];
  let bearing = b || BEARINGS[0];

  throwOnIllegalStartingParameters();

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
    return pos;
  }

  function move(direction) {
    const setCoords = {
      'N': () => pos[1] += direction,
      'S': () => pos[1] -= direction,
      'E': () => pos[0] += direction,
      'W': () => pos[0] -= direction
    };

    const oldCoords = [pos[0], pos[1]];
    setCoords[bearing].call();

    const key = JSON.stringify(pos);
    if (obstacles[key]) {
      const message = `Obstacle encountered at [${pos[0]}, ${pos[1]}]`;
      pos = [oldCoords[0], oldCoords[1]];
      throw new Error(message);
    }

    wrapCoords();
  }

  function wrapCoords() {
    if (pos[0] > H_GRID_SIZE-1) pos[0] = pos[0] % H_GRID_SIZE;
    if (pos[0] < 0) pos[0] = (pos[0] % H_GRID_SIZE) + H_GRID_SIZE;
    if (pos[1] > V_GRID_SIZE-1) pos[1] = pos[1] % V_GRID_SIZE;
    if (pos[1] < 0) pos[1] = (pos[1] % V_GRID_SIZE) + V_GRID_SIZE;
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

  function clearObstacle(obstacle){
    delete obstacles[JSON.stringify(obstacle)];
  }

  function throwOnIllegalStartingParameters(){
    if (pos[0] < 0 || pos[0] > H_GRID_SIZE){
      throw new Error('Illegal starting position.');
    }
    if (pos[1] < 0 || pos[1] > V_GRID_SIZE){
      throw new Error('Illegal starting position.');
    }
    if (BEARINGS.indexOf(bearing) < 0){
      throw new Error('Illegal starting bearing.');
    }
  }

  return {pos, getBearing, getPosition, evaluate, setObstacle};
};
