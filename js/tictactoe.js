const tictactoe = {
    board: ['','','','','','','','',''],
    player_1: 0,
    player_2: 0,
    does_change: 0,
    win : null,
    divs: document.querySelectorAll('.game div'),
    count: 0,
    simbols: {
        options: ['x','o'],
        turn_index: 0,
        change: function() {
            this.turn_index = (this.turn_index === 0 ? 1 : 0);
        },
    },
    container_element: null, 
    gameover: false,
    wining_sequences: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],

    init: function(container) {
        this.container_element = container;
    },

    makePlay: function(position) {
        if (this.gameover) return false;
        if (this.board[position] === '') {
            this.board[position] = this.simbols.options[this.simbols.turn_index];
            this.draw();
            let wining_sequences_index = this.check_wining_sequences(this.simbols.options[this.simbols.turn_index]);
            let tot = 0;
            for (i in this.board) {
                if (this.board[i] != '') {
                    tot += 1;
                }
                if (tot == 9) {
                    this.simbols.change();
                    changetie();
                }
            }
            if (wining_sequences_index >= 0 && tot != 9){
                let tot = 0;
                for (i in this.board) {
                    if (this.board[i] != '') {
                        tot += 1;
                    }
                    if (tot == 9) {
                        this.simbols.change();
                        changetie();
                    }
                }
                if (tot < 9) {
                    this.game_is_over();
                    this.win = wining_sequences_index;
                    gameoveranimation();
                    if (this.does_change % 2 == 0 && this.simbols.options[this.simbols.turn_index] == 'x') {
                        this.simbols.change();
                    }else if (this.does_change % 2 != 0 && this.simbols.options[this.simbols.turn_index] == 'o') {
                        this.simbols.change();
                    }
                    this.does_change += 1;
                }
            }else{
                this.simbols.change();
            }
            return true;
        }else {
            return false;
        }
    },

    check_wining_sequences: function(simbol) {
        for (i in this.wining_sequences) {
            if (this.board[this.wining_sequences[i][0]] == simbol && this.board[this.wining_sequences[i][1]] == simbol && this.board[this.wining_sequences[i][2]] == simbol) {
                if (simbol === 'x') {
                    this.player_1 += 1;
                    document.querySelector('.score1').textContent = this.player_1;
                }else {
                    this.player_2 += 1;
                    document.querySelector('.score2').textContent = this.player_2;
                }
                return i;
            }
        }
        return -1;
    },

    game_is_over: function() {
        this.gameover = true;
    },

    start: function() {
        this.board.fill('');
        this.draw();
        this.gameover = false;
    },

    draw: function() {
        let content = '';

        for (i in this.board) {
            content += `<div class="box" onclick="tictactoe.makePlay(${i})">${this.board[i]}</div>`
        }

        this.container_element.innerHTML = content;
    },
}

var animecount = 0;
var intv;

function gameoveranimation(){
    intv = setInterval(animation,1000)
}

function animation() {
    let divs = document.querySelectorAll('.game div');
    divs[tictactoe.wining_sequences[tictactoe.win][animecount]].style.background = '#dda520';
    divs[tictactoe.wining_sequences[tictactoe.win][animecount]].style.color = 'rgba(0,0,0,1)';

    if (animecount == 2) {
        clearInterval(intv);
        animecount = -1;
        intv = setInterval(clear,150);
    }
    animecount += 1;
}

function changetie() {
    intv = setInterval(clear,150);
}

function clear() {
    let divs = document.querySelectorAll('.game div');
    divs[animecount].style.background = 'rgb(24, 23, 24)';
    divs[animecount].textContent = '';
    if (animecount == 8) {
        clearInterval(intv)
        animecount = -1;
        intv = setInterval(set,150);
    }
    animecount += 1;
}

function set() {
    let divs = document.querySelectorAll('.game div');
    divs[animecount].style.background = 'rgba(60, 60, 60, 0.624)';
    if (animecount == 8) {
        animecount = -1;
        clearInterval(intv);
        setTimeout(start,500);
    }
    animecount += 1;
}

function start() {
    tictactoe.start();
}

function Start() {
    let x2 = document.querySelector('#x2');
    let x1 = document.querySelector('#xboot');
    let online = document.querySelector('#online');

    if (x2.checked){
        window.location.href = 'localx2.html'
    }else if (x1.checked){
        window.alert('Sorry , we are working in this mode . Try again after ):')
    }else if (online.checked){
        window.alert('Sorry , we are working in this mode . Try again after ):')
    }else{
        window.alert('choose an option !')
    }
}