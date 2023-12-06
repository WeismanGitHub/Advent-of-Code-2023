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
    const lines = input.trim().split(/\r?\n/);
    let total = 0;

    for (let i = 0; i < lines.length; i++) {
        const lastLine: string | undefined = lines[i - 1];
        const currentLine = lines[i];

        const partNumbers = [
            ...currentLine.matchAll(/(\*|\$|@|#|%|&|\*|-|\+|=|\/)\d+/g),
            ...currentLine.matchAll(/\d+(\*|\$|@|#|%|&|\*|-|\+|=)/g),
        ];

        partNumbers.forEach((num) => {
            total += Number(num[0].match(/\d+/));
        });

        if (!lastLine) continue;

        for (let j = 0; j < currentLine.length; j++) {
            const charIsNumber = !Number.isNaN(Number(currentLine[j]));
            if (currentLine[j] === '.' || charIsNumber) continue;

            // If the special char isn't touching a number.
            if (
                Number.isNaN(Number(lastLine[j - 1])) &&
                Number.isNaN(Number(lastLine[j])) &&
                Number.isNaN(Number(lastLine[j + 1]))
            ) {
                continue;
            }

            const area = lastLine.slice(j - 4, j + 5);

            // If the partNumber isn't already touching a special char horizontally.
            if (/\d+(\*|\$|@|#|%|&|\*|-|\+|=)/.test(area) || /(\*|\$|@|#|%|&|\*|-|\+|=)\d+/.test(area)) {
                continue;
            }

            const res = [...area.matchAll(/\d+/g)];

            if (!res) continue; // If end of line.

            const match = res[res.length - 1]
            
            console.log(lastLine.slice(j - 4 + match.index! + match[0].length))
            // console.log(j - 4 + res.index! + res[0].length)
            // j = j - 4 + match.index! + match[0].length + 1
            // j += res.index! + res[0].length - 4
            total += Number(match[0])
            // j += res.index! - 1

            // const endOfPart = j + regexRes.index! - 2;

            // if (/(\*|\$|@|#|%|&|\*|-|\+|=)/.test(currentLine[endOfPart])) {
            //     j++
            // }

            // if (/(\*|\$|@|#|%|&|\*|-|\+|=)/.test(currentLine[endOfPart + 1])) {
            //     j++
            // }

            // const numIndex = area.indexOf(partNum) + j - 4 - (3 - partNum.length)
            // dont count duplicates. increase j when you reach a match. dont forget about rechecking if area is already counted
        }
    }

    return total;
}

const input = readFileSync('./src/day-3/input.txt', 'utf-8');
input
// console.log(part1(input));
part1(`
...733.......289..262.....520..................161.462..........450.........................183.............................................
....*....................*.............707.352....*............/.....................801...@...............333..196........484.635......287.
....42.........131....913..............*......&..........634..................440..&...............83.....@...........404$..=....*..423.*...
618.......272....*.........&......547.344...............#............689.589.*....150......382=................................168......433.
`)
