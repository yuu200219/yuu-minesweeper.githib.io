//for display UI
import { createBoard, flagedTile, Option, OptionSwitch, OPTION_STATUS, TILE_STATUS,
    revealTile,
    checkWin, checkLose,
    GAME_STATUS,
    BOARD_SIZE_WIDTH, BOARD_SIZE_HEIGHT, NUMBER_OF_MINES} from "./minesweeper.js";
import {timer} from "./timer.js";


// const levelElement = document.querySelector('.level')
// Level(levelElement)

// const easy = document.querySelector('.easy')
// const medium = document.querySelector('.medium')
// const hard = document.querySelector('.hard')
const board = createBoard(BOARD_SIZE_WIDTH, BOARD_SIZE_HEIGHT, NUMBER_OF_MINES)
const boardElement = document.querySelector('.board')
const mineLeftText = document.querySelector('[data-mine-count]')
const mainTitle = document.querySelector('.main-title')
const optElement = document.querySelector('.option')
const restart = document.getElementById('restart')

restart.addEventListener("click", () => {
    window.location.reload();
})

mainTitle.textContent = "Minesweeper"

// easy.addEventListener("click", () => {
//     console.log("easy")
    
//     levelElement.dataset.level = LEVEL_STATUS.EASY
//     LevelSwitch(levelElement)

//     // board = createBoard(BOARD_SIZE_WIDTH, BOARD_SIZE_HEIGHT, NUMBER_OF_MINES)
//     // listMineLeft()
//     boardDetector(board)
// })
// medium.addEventListener("click", () => {
//     console.log("medium")
    
//     levelElement.dataset.level = LEVEL_STATUS.MEDIUM
//     LevelSwitch(levelElement)

//     // board = createBoard(BOARD_SIZE_WIDTH, BOARD_SIZE_HEIGHT, NUMBER_OF_MINES)
//     // listMineLeft()
//     boardDetector(board)
// })
// hard.addEventListener("click", () => {
//     console.log("hard")
    
//     levelElement.dataset.level = LEVEL_STATUS.HARD
//     LevelSwitch(levelElement)

//     // board = createBoard(BOARD_SIZE_WIDTH, BOARD_SIZE_HEIGHT, NUMBER_OF_MINES)
//     // listMineLeft()
//     boardDetector(board)
// })

Option(optElement)
optElement.addEventListener("click", () => {
    OptionSwitch(optElement)
    // console.log(optElement.dataset.opt)
})
// function boardDetector(board) {
//     // boardElement.style.setProperty("--size_x", BOARD_SIZE_WIDTH)
//     // boardElement.style.setProperty("--size_y", BOARD_SIZE_HEIGHT)
//     console.log(x)
//     board = createBoard(BOARD_SIZE_WIDTH, BOARD_SIZE_HEIGHT, NUMBER_OF_MINES)
//     board.forEach(row => {
//         row.forEach(tile => {
//             boardElement.append(tile.element)
//             tile.element.addEventListener("click", () => {
//                 if(optElement.dataset.opt === OPTION_STATUS.FLAG) {
//                     flagedTile(tile)
//                     listMineLeft()
//                     // console.log("option status = flag")
//                 }
//                 else if(optElement.dataset.opt === OPTION_STATUS.MINE) {
//                     revealTile(board, tile)
//                 }
//                 else {
//                     return
//                 }
//                 checkGameEnd(board, tile)
//                 // console.log("tile.element" + tile.element.dataset.status)
//             })
//         })
//     })
// }

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
        tile.element.addEventListener("click", () => {
            if(optElement.dataset.opt === OPTION_STATUS.FLAG) {
                flagedTile(tile)
                listMineLeft()
                // console.log("option status = flag")
            }
            else if(optElement.dataset.opt === OPTION_STATUS.MINE) {
                revealTile(board, tile)
            }
            else {
                return
            }
            checkGameEnd(board, tile)
            // console.log("tile.element" + tile.element.dataset.status)
        })
    })
})

boardElement.style.setProperty("--size_x", BOARD_SIZE_WIDTH)
boardElement.style.setProperty("--size_y", BOARD_SIZE_HEIGHT)
mineLeftText.textContent = NUMBER_OF_MINES

// console.log("test" + optElement.dataset.opt)
// console.log(board)
// function reset(board) {
//     board.forEach(row => {
//         row.forEach( tile => {

//         })
//     })
// }

function listMineLeft() {
    const flagedTilesCount = board.reduce((count, row) => {
        return count + row.filter(tile => tile.status === TILE_STATUS.FLAG).length
    }, 0)

    mineLeftText.textContent = NUMBER_OF_MINES - flagedTilesCount
    // console.log("mine left: " + mineLeftText.textContent)
}

function checkGameEnd(board, tile) {
    const win = checkWin(board, mainTitle)
    const lose = checkLose(tile, mainTitle)
    if(lose) {
        // flagedTile(tile)
        mainTitle.textContent = "You Lose!"
    }
    else if(win) {
        mainTitle.dataset.game = GAME_STATUS.WIN
        mainTitle.textContent = "You Win!"
    }
    if(win || lose) {
        clearInterval(timer)
        boardElement.addEventListener('click', stopProp, {capture: true})
    }
}

function stopProp(e) {
    e.stopImmediatePropagation()
}
// console.log(board)