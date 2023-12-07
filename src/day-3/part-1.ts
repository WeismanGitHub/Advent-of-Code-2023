// --- Day 3: Gear Ratios ---
// You and the Elf eventually reach a gondola lift station; he says the gondola lift will take you up to the water source, but this is as far as he can bring you. You go inside.

// It doesn't take long to find the gondolas, but there seems to be a problem: they're not moving.

// "Aaah!"

// You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. "Sorry, I wasn't expecting anyone! The gondola lift isn't working right now; it'll still be a while before I can fix it." You offer to help.

// The engineer explains that an engine part seems to be missing from the engine, but nobody can figure out which one. If you can add up all the part numbers in the engine schematic, it should be easy to work out which part is missing.

// The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

// Here is an example engine schematic:

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
// In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

// Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?
import { readFileSync } from 'fs';

function part1(input: string) {
    const periodOrNumRegex = /(\.|\d)+/;
    const lines = input.trim().split(/\r?\n/);
    let total = 0;

    for (let i = 0; i < lines.length; i++) {
        const lastLine: string | undefined = lines[i - 1];
        const nextLine: string | undefined = lines[i + 1];
        const currentLine = lines[i];

        for (let j = 0; j < currentLine.length; j++) {
            // if not num
            if (Number.isNaN(Number(currentLine[j]))) {
                continue;
            }

            let num = '';

            // match complete num
            while (/\d+/.test(currentLine[j])) {
                num += currentLine[j];
                j++;
            }

            // if there's a symbol before/after
            const charAfter = currentLine[j - num.length - 1]
            if (
                (currentLine[j] && !periodOrNumRegex.test(currentLine[j])) ||
                (charAfter && !periodOrNumRegex.test(charAfter))
            ) {
                total += Number(num);
                continue;
            }

            // if there's a symbol above/below
            for (let k = j - 1 - num.length; k < j + 1; k++) {
                if (
                    (lastLine?.[k] && !periodOrNumRegex.test(lastLine[k])) ||
                    (nextLine?.[k] && !periodOrNumRegex.test(nextLine[k]))
                ) {
                    total += Number(num);
                    break;
                }
            }
        }
    }

    return total;
}

const input = readFileSync('./src/day-3/input.txt', 'utf-8');
console.log(part1(input));