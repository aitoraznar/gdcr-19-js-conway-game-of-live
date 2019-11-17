const { createUniverse, 
  getNeigthbors, 
  updateCellStatus, 
  updateStatus, 
  ALIVE, DEAD } = require("../src/universe");

describe('Get the neighbors', () => {
  test('Checking neighbors', () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];
  
    let universe = createUniverse(initialState);
    expect(getNeigthbors(universe, 2, 2)).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0]);
  });

  test('Checking neighbors', () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];
  
    let universe = createUniverse(initialState);
    expect(getNeigthbors(universe, 2, 1)).toStrictEqual([0, 0, 0, 0, 0, 0, 1, 0]);
  });

  test('Checking neighbors', () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];
  
    let universe = createUniverse(initialState);
    expect(getNeigthbors(universe, 1, 2)).toStrictEqual([0, 0, 0, 0, 1, 0, 0, 0]);
  });
});

describe('Check the rules', () => {
  test('Una célula viva con menos de 2 vecinas vivas, muere', () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];
  
    let universe = createUniverse(initialState);
    expect(updateCellStatus(universe, 1, 1)).toBe(DEAD);
  });
  
  test('Una célula viva con más de 3 vecinas vivas, muere', () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0]
    ];
  
    let universe = createUniverse(initialState);
    expect(updateCellStatus(universe, 2, 2)).toBe(DEAD);
  });

  test('Una célula viva con 2 vecinas vivas, sobrevive', () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0]
    ];
  
    let universe = createUniverse(initialState);
    expect(updateCellStatus(universe, 2, 2)).toBe(ALIVE);
  });

  test('Una célula viva con 3 vecinas vivas, sobrevive', () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0]
    ];
  
    let universe = createUniverse(initialState);
    expect(updateCellStatus(universe, 2, 2)).toBe(ALIVE);
  });

  test('Una célula muerta con 2 vecinas vivas, sigue muerta', () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0]
    ];
  
    let universe = createUniverse(initialState);
    expect(updateCellStatus(universe, 2, 2)).toBe(DEAD);
  });

  test('Una célula muerta con, exactamente, 3 células vivas, revive', () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0]
    ];
  
    let universe = createUniverse(initialState);
    expect(updateCellStatus(universe, 2, 2)).toBe(ALIVE);
  });
});

describe('Check the bounds', () => {
  test('Out of bounds in (0, 0)', () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0]
    ];
  
    let universe = createUniverse(initialState);

    expect(updateCellStatus(universe, 0, 0)).toBe(DEAD);
  });

  test('Out of bounds in (0, 0)', () => {
    const initialState = [
      [0, 1, 0, 0, 0],
      [1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0]
    ];
  
    let universe = createUniverse(initialState);

    expect(updateCellStatus(universe, 0, 0)).toBe(ALIVE);
  });

  test('Out of bounds in (1, 0)', () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0]
    ];
  
    let universe = createUniverse(initialState);

    expect(updateCellStatus(universe, 1, 0)).toBe(DEAD);
  });

  test('Out of bounds in (0, 4)', () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0]
    ];
  
    let universe = createUniverse(initialState);

    expect(updateCellStatus(universe, 0, 4)).toBe(DEAD);
  });

  test('Out of bounds in (4, 0)', () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0]
    ];
  
    let universe = createUniverse(initialState);

    expect(updateCellStatus(universe, 4, 0)).toBe(DEAD);
  });

  test('Out of bounds in (4, 4)', () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 1, 1],
      [0, 0, 0, 1, 0]
    ];
  
    let universe = createUniverse(initialState);

    expect(updateCellStatus(universe, 4, 4)).toBe(ALIVE);
  });

  test('Out of bounds in (-50, -50)', () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0]
    ];
  
    let universe = createUniverse(initialState);

    expect(updateCellStatus(universe, -50, -50)).toBe(null);
  });
  test('Out of bounds in (50, 50)', () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0]
    ];
  
    let universe = createUniverse(initialState);

    expect(updateCellStatus(universe, 50, 50)).toBe(null);
  });
});

describe('Update status', () => {
  test('Oscilator "Parpadeador"', () => {
    const initialState = [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0]
    ];
    const finalState = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];
  
    let universe = createUniverse(initialState);

    universe = updateStatus(universe);
    expect(universe).toStrictEqual(finalState);

    universe = updateStatus(universe);
    expect(universe).toStrictEqual(initialState);
  });

  test('Oscilator "Toad"', () => {
    const initialState = [
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [1, 1, 1, 0],
      [0, 0, 0, 0]
    ];
    const finalState = [
      [0, 0, 1, 0],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 0, 0]
    ];
  
    let universe = createUniverse(initialState);

    universe = updateStatus(universe);
    expect(universe).toStrictEqual(finalState);

    universe = updateStatus(universe);
    expect(universe).toStrictEqual(initialState);
  });

  test('Oscilator "Octogono"', () => {
    const state1 = [
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 0],
      [0, 1, 0, 0, 0, 0, 1, 0],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [0, 1, 0, 0, 0, 0, 1, 0],
      [0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
    ];
    const state2 = [
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 0, 0, 0, 0, 1, 0],
      [1, 1, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 1, 1],
      [0, 1, 0, 0, 0, 0, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
    ];
    const state3 = [
      [0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 0],
      [1, 1, 0, 1, 1, 0, 1, 1],
      [0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 0],
      [1, 1, 0, 1, 1, 0, 1, 1],
      [0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 0],
    ];
    const state4 = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 0],
      [0, 1, 0, 1, 1, 0, 1, 0],
      [0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 0],
      [0, 1, 0, 1, 1, 0, 1, 0],
      [0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const state5 = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 0, 1, 1, 0, 1, 0],
      [0, 1, 1, 0, 0, 1, 1, 0],
      [0, 1, 1, 0, 0, 1, 1, 0],
      [0, 1, 0, 1, 1, 0, 1, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
  
    let universe = createUniverse(state1);

    universe = updateStatus(universe);
    expect(universe).toStrictEqual(state2);

    universe = updateStatus(universe);
    expect(universe).toStrictEqual(state3);

    universe = updateStatus(universe);
    expect(universe).toStrictEqual(state4);
    
    universe = updateStatus(universe);
    expect(universe).toStrictEqual(state5);
    
    universe = updateStatus(universe);
    expect(universe).toStrictEqual(state1);
  });
});
