import { shuffle } from "../Utils/arrays";
import { Heap } from "../Utils/heaps";
import { map, range, take } from "../Utils/iters";
import { randomIntBetwen } from "../Utils/random";

// split the board in two to prevent excessive recursion type errors
// when inferring the Square type

const board1 = [
  'GO', 'A1', 'CC1', 'A2', 'T1', 'R1', 'B1', 'CH1', 'B2',
  'B3', 'JAIL', 'C1', 'U1', 'C2', 'C3', 'R2', 'D1', 'CC2', 'D2',
] as const;

const board2 = [
  'D3', 'FP', 'E1', 'CH2', 'E2', 'E3', 'R3', 'F1', 'F2', 'U2',
  'F3', 'G2J', 'G1', 'G2', 'CC3', 'G3', 'R4', 'CH3', 'H1', 'T2', 'H2',
] as const;

type EnumOf<T> = T extends Readonly<[infer H, ...infer Tail]> ? H | EnumOf<Tail> : never;
type Square = EnumOf<typeof board1> | EnumOf<typeof board2>;

const board: Square[] = [...board1, ...board2];

const squarePositions = new Map<Square, number>(board.map((sq, idx) => [sq, idx]));

const createCircularStack = <T>(values: T[]) => {
  let index = 0;

  const next = () => {
    const val = values[index];
    index = (index + 1) % values.length;
    return val;
  };

  return { next };
};

type Card = 'GoToJail' | 'AdvanceToGo' | 'GoToC1' | 'GoToE3' |
  'GoToH2' | 'GoToR1' | 'GoToNextR' | 'GoToNextR' | 'GoToNextU' | 'GoBack3Squares' | 'Other';

const createGame = (maxDiceValue = 6) => {
  let position = 0;
  const visits = board.map(() => 0);
  let steps = 0;
  let consecutiveDoubles = 0;

  const comunityChest = createCircularStack<Card>(shuffle([
    'AdvanceToGo', 'GoToJail', 'Other', 'Other', 'Other', 'Other', 'Other', 'Other',
    'Other', 'Other', 'Other', 'Other', 'Other', 'Other', 'Other', 'Other'
  ]));

  const chance = createCircularStack<Card>(shuffle([
    'AdvanceToGo', 'GoToJail', 'GoToC1', 'GoToE3', 'GoToH2', 'GoToR1', 'GoToNextR', 'GoToNextR',
    'GoToNextU', 'GoBack3Squares', 'Other', 'Other', 'Other', 'Other', 'Other', 'Other', 'Other'
  ]));

  const rollDice = () => {
    const d1 = randomIntBetwen(1, maxDiceValue);
    const d2 = randomIntBetwen(1, maxDiceValue);

    return { sum: d1 + d2, isDouble: d1 === d2 };
  };

  const advance = (increment: number) => {
    position = (position + increment) % 40;
  };

  const goTo = (square: Square): void => {
    position = squarePositions.get(square);
  };

  const dist = (from: number, to: number): number => {
    const signedDist = to - from;
    return signedDist < 0 ? signedDist + 40 : signedDist;
  };

  const goToNext = (position: number, squares: Square[]): void => {
    const dists = new Heap<Square, number>();

    for (const sq of squares) {
      const squarePos = squarePositions.get(sq);
      dists.insert(sq, dist(squarePos, position));
    }

    const [closestSquare] = dists.removeHighestPriority();
    goTo(closestSquare);
  };

  const cardActions: { [C in Card]: (position: number) => void } = {
    'Other': () => { },
    'AdvanceToGo': () => goTo('GO'),
    'GoToJail': () => goTo('JAIL'),
    'GoToC1': () => goTo('C1'),
    'GoToE3': () => goTo('E3'),
    'GoToH2': () => goTo('H2'),
    'GoToR1': () => goTo('R1'),
    'GoToNextR': pos => goToNext(pos, ['R1', 'R2', 'R3', 'R4']),
    'GoToNextU': pos => goToNext(pos, ['U1', 'U2']),
    'GoBack3Squares': pos => goTo(board[pos - 3 < 0 ? pos + 40 - 3 : pos - 3])
  };

  const followCardAction = (card: Card): void => {
    cardActions[card](position);
  };

  const pickComunityChestCard = () => {
    followCardAction(comunityChest.next());
  };

  const pickChanceCard = () => {
    followCardAction(chance.next());
  };

  const step = () => {
    steps++;
    const { sum, isDouble } = rollDice();

    if (isDouble) {
      consecutiveDoubles++;
      if (consecutiveDoubles === 3) {
        consecutiveDoubles = 0;
        goTo('JAIL');
        return;
      }
    } else {
      consecutiveDoubles = 0;
    }

    advance(sum);

    switch (board[position]) {
      case 'G2J':
        goTo('JAIL');
        break;
      case 'CC1':
      case 'CC2':
      case 'CC3':
        pickComunityChestCard();
        break;
      case 'CH1':
      case 'CH2':
      case 'CH3':
        pickChanceCard();
        break;
    }

    visits[position]++;
  };

  const stats = () => {
    return visits
      .map<[Square, number]>((count, index) => [board[index], count * 100 / steps])
      .sort(([, a], [, b]) => b - a);
  };

  return { step, stats };
};

const pb84 = () => {
  const game = createGame(4);

  for (const _ of range(10 ** 7)) {
    game.step();
  }

  const pad = (n: number) => n < 10 ? `0${n}` : `${n}`;

  return [...map(take(game.stats(), 3), ([sq]) => pad(squarePositions.get(sq)))].join('');
};

console.log(pb84());