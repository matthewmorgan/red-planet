const BEARINGS = ['N', 'E', 'S', 'W'];

export default function () {

  let coordinates = [0, 0];
  let bearing = BEARINGS[0];

  function evaluate(commands) {
    commands.forEach(command => {
      if (command === 'F') move(1);
      if (command === 'B') move(-1);
      if (command === 'L') turnLeft();
      if (command === 'R') turnRight();
    });
  }

  function getBearing(){
    return bearing;
  }

  function move(direction){
    const setCoords = {
      'N': () => coordinates[1] += direction,
      'S': () => coordinates[1] -= direction,
      'E':  () => coordinates[0] += direction,
      'W':  () => coordinates[0] -= direction
    };
    setCoords[bearing].call();
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

  return {coordinates, getBearing, evaluate};
};
