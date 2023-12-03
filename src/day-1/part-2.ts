// Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

// Equipped with this new information, you now need to find the real first and last digit on each line. For example:

// two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen
// In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.

// What is the sum of all of the calibration values?
import { readFileSync } from 'fs';

const numbers: Record<string, number> = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
};

function part2(input: string): number {
    const lines = input.trim().split('\n');
    let total = 0;

    for (const line of lines) {
        const startRegex = /(\d|one|two|three|four|five|six|seven|eight|nine)/i;
        const endRegex = /(\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/i;

        const startMatch = line.match(startRegex)![0];
        const endMatch = line.split('').reverse().join('').match(endRegex);

        total += Number(
            String(numbers[startMatch]) +
                String(numbers[endMatch ? endMatch[0].split('').reverse().join('') : startMatch])
        );
    }

    return total;
}

const input = readFileSync('./src/day-1/input.txt', 'utf-8');
console.log(part2(input));
