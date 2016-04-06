import Rover from './rover';

describe('Rover', ()=> {
  let rover = new Rover();

  it('starts at a default location', ()=> {
    expect(rover.coordinates).toEqual([0, 0]);
    expect(rover.bearing).toEqual('N');
  });

  it('accepts an array of commands', ()=> {
    const commands = ['F', 'F', 'B'];
    rover.evaluate(commands);

    expect(rover.coordinates).toEqual([0, 1]);
    expect(rover.bearing).toEqual('N');
  });

  xit('accepts commands to turn left and right', ()=> {
    const commands = ['R', 'R', 'R', 'L'];
    rover.evaluate(commands);

    expect(rover.bearing).toEqual('S');
    expect(rover.coordinates).toEqual([0, 1]);
  });

  xit('location wraps from one edge of the grid to another', ()=> {
    const commands = ['F', 'F', 'F', 'F'];
    rover.evaluate(commands);
    expect(rover.coordinates).toEqual([0, 7]);
    expect(rover.bearing).toEqual('S');
  });

  xit('wraps in the other direction on the same axis', ()=> {
    const commands = ['B', 'B', 'B'];
    rover.evaluate(commands);
    expect(rover.coordinates).toEqual([0, 0]);
    expect(rover.bearing).toEqual('S');
  });

  xit('wraps on the other axis as well', ()=> {
    const commands = ['R', 'F', 'F', 'F'];
    rover.evaluate(commands);
    expect(rover.coordinates).toEqual([7, 0]);
  });

  xit('wraps in the other direction', ()=> {
    const commands = ['B', 'B', 'B'];
    rover.evaluate(commands);
    expect(rover.coordinates).toEqual([0, 0]);
  });

  xit('detects and reports obstacles in location ahead', ()=> {
    const obstacleCoordinates = [4, 7];
    rover.setObstacle(obstacleCoordinates);

    const commands = ['R', 'R', 'F', 'F', 'F', 'F'];
    expect(() => {
      rover.evaluate(commands)
    }).toThrow(new Error('Obstacle encountered at [4, 7]'));

    expect(rover.bearing).toEqual('E');
    expect(rover.coordinates).toEqual([3, 7]);
  });

});
