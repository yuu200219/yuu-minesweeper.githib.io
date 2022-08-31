//for logic
//switch button: reveal/flag
// check win/lose
export const BOARD_SIZE_WIDTH = 10
export const BOARD_SIZE_HEIGHT = 10
export const NUMBER_OF_MINES = 20

export const GAME_STATUS = {
    WIN: 'win',
    LOSE: 'lose'
}

export function checkWin(board, mainTitle) {
    return board.every(row => {
        return row.every(tile => {
            return tile.status === TILE_STATUS.NUMBER || 
                    (tile.mine && tile.status === TILE_STATUS.FLAG)
        })
    })
}

export function checkLose(tile, mainTitle) {
    if(tile.status == TILE_STATUS.MINE) {
        mainTitle.dataset.game = GAME_STATUS.LOSE
        return true
    }
    else return false
}

export const TILE_STATUS = {
    HIDDEN: 'hidden',
    MINE: 'mine',
    NUMBER: 'number',
    FLAG: 'flag'
}
export const OPTION_STATUS = {
    MINE: 'mine',
    FLAG: 'flag'
}
// export const LEVEL_STATUS = {
//     EASY: 'easy',
//     MEDIUM: 'medium',
//     HARD: 'hard'
// }

// export function Level(level) {
//     level.dataset.level = LEVEL_STATUS.EASY
//     BOARD_SIZE_WIDTH = 10
//     BOARD_SIZE_HEIGHT = 10
//     NUMBER_OF_MINES = 10
// }
// export function LevelSwitch(level) {
//     if(level.dataset.level === LEVEL_STATUS.EASY) {
//         BOARD_SIZE_WIDTH = 10
//         BOARD_SIZE_HEIGHT = 10
//         NUMBER_OF_MINES = 10
//     }
//     else if(level.dataset.level === LEVEL_STATUS.MEDIUM) {
//         BOARD_SIZE_WIDTH = 10
//         BOARD_SIZE_HEIGHT = 13
//         NUMBER_OF_MINES = 15
//     }
//     else if(level.dataset.level === LEVEL_STATUS.HARD) {
//         BOARD_SIZE_WIDTH = 10
//         BOARD_SIZE_HEIGHT = 16
//         NUMBER_OF_MINES = 25
//     }
// }

export function createBoard(boardSize_x, boardSize_y, numberOfMine) {
    const board = []
    const minePosition = getMinePosition(boardSize_x, boardSize_y, numberOfMine)
    // console.log(numberOfMine)
    console.log(minePosition)

    for (let x = 0; x < boardSize_x; x++) {
        const row = []
        for (let y = 0; y < boardSize_y; y++) {

            const element = document.createElement("div")
            element.dataset.status = TILE_STATUS.HIDDEN

            const tile = {
                element,
                x,
                y,
                mine: minePosition.some(positionOverFlow.bind(null, {x, y})),
                get status() {
                    return element.dataset.status
                },
                set status(value) {
                    this.element.dataset.status = value
                }
            }
            row.push(tile)
        }
        board.push(row)
    }
    return board
}

export function Option(opt) {
    opt.dataset.opt = OPTION_STATUS.MINE //default is mine
}
export function OptionSwitch(opt) {
    // if(opt.dataset.opt !== OPTION_STATUS.MINE && opt.dataset.opt !== OPTION_STATUS.FLAG ) {
    //     opt.dataset.opt = OPTION_STATUS.MINE
    // }
    if(opt.dataset.opt === OPTION_STATUS.MINE) {
        opt.dataset.opt = OPTION_STATUS.FLAG
    }
    else if(opt.dataset.opt === OPTION_STATUS.FLAG) {
        opt.dataset.opt = OPTION_STATUS.MINE
    }
}

export function flagedTile(tile) {
    if(tile.status !== TILE_STATUS.HIDDEN && tile.status !== TILE_STATUS.FLAG) {
        return
    }
    if(tile.status === TILE_STATUS.FLAG) {
        tile.status = TILE_STATUS.HIDDEN
    }
    else {
        tile.status = TILE_STATUS.FLAG
    }
}

export function revealTile(board, tile) {
    // console.log(tile)
    if(tile.status !== TILE_STATUS.HIDDEN) {
        // console.log("return")
        return
    }
    if(tile.mine) {
        tile.status = TILE_STATUS.MINE
        return
    }

    tile.status = TILE_STATUS.NUMBER
    const adjacentTiles = nearbyTile(board, tile)
    const mines = adjacentTiles.filter(t => t.mine)
    if(mines.length === 0) {
        adjacentTiles.forEach(revealTile.bind(null, board))
    }
    else {
        // console.log(mines.length)
        tile.element.textContent = mines.length
    }
    // console.log(adjacentTiles)
}

function getMinePosition(boardSize_x, boardSize_y, numberOfMine) {
    const positions = []
    while(positions.length < numberOfMine) {
        const position = {
            x: randomNumber(boardSize_x),
            y: randomNumber(boardSize_y)
        }
        if(!positions.some(p => positionOverFlow(p, position))) {
            positions.push(position)
        }
    }
    return positions
}

function positionOverFlow(a, b) {
    return a.x == b.x && a.y == b.y
}

function randomNumber(size) {
    return Math.floor(Math.random() * size)
}

function nearbyTile(board, {x, y}) {
    const tiles = []

    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            if(xOffset == 0 && yOffset == 0) continue
            const tile = board[x + xOffset]?.[y + yOffset]
            if(tile) {
                tiles.push(tile)
            }
            
        }
    }
    return tiles
}