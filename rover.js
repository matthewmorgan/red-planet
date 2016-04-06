export default function () {

  let coordinates = [0, 0];
  let bearing = 'N';

  function evaluate(commands){
    commands.forEach(command => {
      if (command === 'F') coordinates[1]++;
      if (command === 'B') coordinates[1]--;
    });
  }

  return {coordinates, bearing, evaluate };
};
