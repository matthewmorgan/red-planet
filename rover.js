const BEARINGS = ['N', 'E', 'S', 'W'];
export default function () {

  let coordinates = [0, 0];
  let bearing = BEARINGS[0];

  function evaluate(commands) {
    commands.forEach(command => {
      if (command === 'F') coordinates[1]++;
      if (command === 'B') coordinates[1]--;
      if (command === 'L') turnLeft();
      if (command === 'R') turnRight();
    });
  }

  function getBearing(){
    return bearing;
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
