import Rover from './rover';

describe('Rover', ()=> {
  let rover = new Rover();

  it('starts at a default location', ()=> {
    expect(rover.getPosition()).toEqual([0, 0]);
    expect(rover.getBearing()).toEqual('N');
  });

  it('accepts an array of commands', ()=> {
    const commands = ['F', 'F', 'B'];
    rover.evaluate(commands);

    expect(rover.getPosition()).toEqual([0, 1]);
    expect(rover.getBearing()).toEqual('N');
  });

  it('accepts commands to turn left and right', ()=> {
    const commands = ['R', 'R', 'R', 'L'];
    rover.evaluate(commands);

    expect(rover.getBearing()).toEqual('S');
    expect(rover.getPosition()).toEqual([0, 1]);
  });

  it('location wraps from one edge of the grid to another', ()=> {
    const commands = ['F', 'F', 'F', 'F'];
    rover.evaluate(commands);
    expect(rover.getPosition()).toEqual([0, 7]);
    expect(rover.getBearing()).toEqual('S');
  });

  it('wraps in the other direction on the same axis', ()=> {
    const commands = ['B', 'B', 'B'];
    rover.evaluate(commands);
    expect(rover.getPosition()).toEqual([0, 0]);
    expect(rover.getBearing()).toEqual('S');
  });

  it('wraps on the other axis as well', ()=> {
    const commands = ['R', 'F', 'F', 'F'];
    rover.evaluate(commands);
    expect(rover.getPosition()).toEqual([7, 0]);
    expect(rover.getBearing()).toEqual('W');
  });

  it('wraps in the other direction', ()=> {
    const commands = ['B', 'B', 'B'];
    rover.evaluate(commands);
    expect(rover.getPosition()).toEqual([0, 0]);
  });

  it('detects and reports obstacles in location ahead', ()=> {
    const obstacleCoordinates = [0, 4];
    rover.setObstacle(obstacleCoordinates);

    const commands = ['L','R', 'R', 'F', 'F', 'F', 'F'];
    expect(() => {
      rover.evaluate(commands)
    }).toThrow(new Error('Obstacle encountered at [0, 4]'));

    expect(rover.getBearing()).toEqual('N');
    expect(rover.getPosition()).toEqual([0,3]);
  });

});
