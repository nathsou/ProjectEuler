import { fst, occurences, snd } from "../Utils/functions";
import { allEq, chunks, filter, find, has, map, max, take, zip, count } from "../Utils/iters";
import { readFileSync } from "fs";

type Value = number;
type Suit = 'S' | 'C' | 'D' | 'H';

type Card = [Value, Suit];
type Hand = Card[];

const Ten = 10;
const Jack = 11;
const Queen = 12;
const King = 13;
const Ace = 14;

// 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace.
const valueMap = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'T': Ten,
    'J': Jack,
    'Q': Queen,
    'K': King,
    'A': Ace
};

const parseGame = (game: string): [Hand, Hand] => {
    const [h1, h2] = [...chunks(
        game.split(' ').map(card => [valueMap[card[0]], card[1]] as Card),
    5)];

    return [h1, h2];
};

// Two cards of the same value.
const highestCard = (h: Hand): number => {
    return max(map(h, fst)).value;
};

// Two cards of the same value.
const onePair = (h: Hand): number => {
    const occ = find(occurences(map(h, fst)).entries(), ([_, indices]) => indices.length === 2);
    return occ.index >= 0 ? occ.value[0] : 0; 
};

// Two different pairs.
const twoPairs = (h: Hand): [number, number] => {
    const pairs = [...take(filter(
        occurences(map(h, fst)).entries(), ([_, indices]) => indices.length === 2
    ), 2)];

    return pairs.length === 2 ? [pairs[0][0], pairs[1][0]] : null;
};

// Three cards of the same value.
const threeOfAKind = (h: Hand): number => {
    const occ = find(occurences(map(h, fst)).entries(), ([_, indices]) => indices.length === 3);
    return occ.index >= 0 ? occ.value[0] : 0;
};

// Three of a kind and a pair.
const fullHouse = (h: Hand): [number, number] | null => {
    const [t, p] = [threeOfAKind(h), onePair(h)];
    if (t === 0 || p === 0) return null;
    return [t, p];
};

// All cards are consecutive values.
const straight = (h: Hand): number => {
    const min = Math.min(...h.map(fst));
    return has(map(h, fst), min, min + 1, min + 2, min + 3, min + 4) ? min : 0;
};

// All cards of the same suit.
const isFlush = (h: Hand): boolean => {
    return allEq(map(h, snd));
};

// Four cards of the same value.
const fourOfAKind = (h: Hand): number => {
    const occ = find(occurences(map(h, fst)).entries(), ([_, indices]) => indices.length === 4);
    return occ.index >= 0 ? occ.value[0] : 0;
};

// All cards are consecutive values of same suit.
const isStaightFlush = (h: Hand): boolean => {
    return isFlush(h) && straight(h) > 0;
};

// Ten, Jack, Queen, King, Ace, in same suit.
const isRoyalFlush = (h: Hand): boolean => {
    return isFlush(h) && has(map(h, fst), Ten, Jack, Queen, King, Ace);
};

enum Rank {
    HighCard = 1,
    OnePair,
    TwoPairs,
    ThreeOfAKind,
    Straight,
    Flush,
    FullHouse,
    FourOfAKind,
    StraightFlush,
    RoyalFlush
};

const rank = (h: Hand): Rank => {
    if (isRoyalFlush(h)) return Rank.RoyalFlush;
    if (isStaightFlush(h)) return Rank.StraightFlush;
    if (fourOfAKind(h) > 0) return Rank.FourOfAKind;
    if (fullHouse(h) !== null) return Rank.FullHouse;
    if (isFlush(h)) return Rank.Flush;
    if (straight(h) > 0) return Rank.Straight;
    if (threeOfAKind(h) > 0) return Rank.ThreeOfAKind;
    if (twoPairs(h)) return Rank.TwoPairs;
    if (onePair(h) > 0) return Rank.OnePair;
    return Rank.HighCard;
};

const untie = (h1: Hand, h2: Hand): boolean => {
    for (const [u, v] of zip(h1.map(fst).sort((a, b) => b - a), h2.map(fst).sort((a, b) => b - a))) {
        if (u !== v) return u > v;
    }

    throw new Error('Same hand');
};

const cmp = (rank: Rank, h1: Hand, h2: Hand): boolean => {
    switch (rank) {
        case Rank.RoyalFlush:
            throw new Error('Same hand');
        case Rank.StraightFlush:
            const min1 = Math.min(...map(h1, fst));
            const min2 = Math.min(...map(h2, fst));
            if (min1 !== min2) return min1 > min2;
            return untie(h1, h2);
        case Rank.FourOfAKind:
            const f1= fourOfAKind(h1);
            const f2 = fourOfAKind(h2);
            if (f1 !== f2) return f1 > f2;
            return untie(h1, h2);
        case Rank.FullHouse:
            const [t1, p1] = fullHouse(h1);
            const [t2, p2] = fullHouse(h2);
            if (t1 !== t2) return t1 > t2;
            if (p1 !== p2) return p1 > p2;
            return untie(h1, h2);
        case Rank.Flush:
            return untie(h1, h2);
        case Rank.Straight:
            return untie(h1, h2);
        case Rank.ThreeOfAKind:
            {
                const t1 = threeOfAKind(h1); 
                const t2 = threeOfAKind(h2); 
                if (t1 !== t2) return t1 > t2;
                return untie(h1, h2);
            }
        case Rank.TwoPairs:
            {
                console.log(twoPairs(h1), twoPairs(h2));
                const [p11, p12] = twoPairs(h1);
                const [p21, p22] = twoPairs(h2);
                if (p11 !== p21) return p11 > p21;
                if (p12 !== p22) return p12 > p22;
                return untie(h1, h2);
            } 
        case Rank.OnePair:
            {
                const p1 = onePair(h1);
                const p2 = onePair(h2);
                if (p1 !== p2) return p1 > p2;
                return untie(h1, h2);
            }
    }

    return untie(h1, h2);
};

const player1Wins = ([h1, h2]: [Hand, Hand]): boolean => {
    if (rank(h1) !== rank(h2)) return rank(h1) > rank(h2);
    return cmp(rank(h1), h1, h2);
};

const pb54 = (): number => {
    const games = readFileSync('poker.txt', 'utf-8')
        .toString()
        .trim()
        .split('\n')
        .map(parseGame);


    return count(games, player1Wins);
};

console.log(pb54());