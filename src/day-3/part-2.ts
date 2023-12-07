// --- Part Two ---
// The engineer finds the missing part and installs it in the engine! As the engine springs to life, you jump in the closest gondola, finally ready to ascend to the water source.

// You don't seem to be going very fast, though. Maybe something is still wrong? Fortunately, the gondola has a phone labeled "help", so you pick it up and the engineer answers.

// Before you can explain the situation, she suggests that you look out the window. There stands the engineer, holding a phone in one hand and waving with the other. You're going so slowly that you haven't even left the station. You exit the gondola.

// The missing part wasn't the only issue - one of the gears in the engine is wrong. A gear is any * symbol that is adjacent to exactly two part numbers. Its gear ratio is the result of multiplying those two numbers together.

// This time, you need to find the gear ratio of every gear and add them all up so that the engineer can figure out which gear needs to be replaced.

// Consider the same engine schematic again:

// 467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..
// In this schematic, there are two gears. The first is in the top left; it has part numbers 467 and 35, so its gear ratio is 16345. The second gear is in the lower right; its gear ratio is 451490. (The * adjacent to 617 is not a gear because it is only adjacent to one part number.) Adding up all of the gear ratios produces 467835.

// What is the sum of all of the gear ratios in your engine schematic?
import { readFileSync } from 'fs';

function part2(input: string) {
    const lines = input.trim().split(/\r?\n/);
    let total = 0;

    for (let i = 0; i < lines.length; i++) {
        const lastLine: string | undefined = lines[i - 1];
        const nextLine: string | undefined = lines[i + 1];
        const currentLine = lines[i];

        for (let j = 0; j < currentLine.length; j++) {
            // if not an asterisk
            if (currentLine[j] !== '*') {
                continue;
            }

            const partNums: number[] = [];

            // if there's a num after
            if (currentLine[j + 1] && /\d/.test(currentLine[j + 1])) {
                let currentNum = '';
                let k = j + 1;

                while (/\d/.test(currentLine[k])) {
                    currentNum += currentLine[k];
                    k++;
                }

                partNums.push(Number(currentNum));
            }

            // if there's a num before
            if (currentLine[j - 1] && /\d/.test(currentLine[j - 1])) {
                let currentNum = '';
                let k = j - 1;

                while (/\d/.test(currentLine[k])) {
                    currentNum = `${currentLine[k]}${currentNum}`;
                    k--;
                }

                partNums.push(Number(currentNum));
            }

            // if there's a num above
            if (lastLine && /\d/.test(lastLine.slice(j - 1, j + 2))) {
                let rightIndex = j + 1;
                let leftIndex = j - 1;
                let currentNum = '';

                if (/\d/.test(lastLine[j])) {
                    currentNum = lastLine[j];
                }

                while (/\d/.test(lastLine[leftIndex])) {
                    currentNum = `${lastLine[leftIndex]}${currentNum}`;
                    leftIndex--;
                }

                while (/\d/.test(lastLine[rightIndex])) {
                    currentNum += lastLine[rightIndex];
                    rightIndex++;
                }

                if (currentNum) {
                    partNums.push(Number(currentNum));
                }
            }

            // if there's a num below
            if (nextLine && /\d/.test(nextLine.slice(j - 1, j + 2))) {
                let rightIndex = j + 1;
                let leftIndex = j - 1;
                let currentNum = '';

                if (/\d/.test(nextLine[j])) {
                    currentNum = nextLine[j];
                }

                while (/\d/.test(nextLine[leftIndex])) {
                    currentNum = `${nextLine[leftIndex]}${currentNum}`;
                    leftIndex--;
                }

                while (/\d/.test(nextLine[rightIndex])) {
                    currentNum += nextLine[rightIndex];
                    rightIndex++;
                }

                if (currentNum) {
                    partNums.push(Number(currentNum));
                }
            }

            if (partNums.length === 2) {
                total += partNums[0] * partNums[1];
            }
        }
    }

    return total;
}

const input = readFileSync('./src/day-3/input.txt', 'utf-8');
input;
console.log(part2(input)); // too low: 80399371
console.log(
    part2(`
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`)
);