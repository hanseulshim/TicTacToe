$('document').ready(function() {

    var topRight = $('#top-right');
    var topMiddle = $('#top-middle');
    var topLeft = $('#top-left');
    var middleRight = $('#middle-right');
    var middleMiddle = $('#middle-middle');
    var middleLeft = $('#middle-left');
    var bottomRight = $('#bottom-right');
    var bottomLeft = $('#bottom-left');
    var bottomMiddle = $('#bottom-middle');

    game();
});

function game() {
    var status,player, board = [],numNodes=0;

    boardInitialize();

    $('.board').on("click", "p", function() {
        	var move = $(this).attr('id').charAt(1);
            if(check(move)){
            	humanMove(move)
            }
            else{
            	alert("Move is not valid. Try again");
            	return;
            }
            update();
            if(checkWin() == 1|| checkWin() == 0)
            	return gameOver(checkWin());
            
            player=-1;
        	aiMove();
        	update();
        	if(checkWin() == -1|| checkWin() == 0)
            	return gameOver(checkWin());
            player=1;
    });
    
    function gameOver(winner){
    	winner==0?alert("It's a tie! Press OK to start a new game."):alert("Player "+playerVal(winner)+" wins! Press OK to start a new game.");
    	boardInitialize();
    }


    function boardInitialize() {
        board = 
        [	
        	0, 0, 0,
            0, 0, 0,
            0, 0, 0,
        ];
        player = "1";
        update();
        console.log(board);
    }


    function humanMove(move) {
    	board[move]=1;
    }

    function aiMove() {
    	var move = Math.floor(Math.random()*8);
    	while(!check(move)){
    		move = Math.floor(Math.random()*8);
    	}
    	board[move]=-1;

    	/*
    	var move = 1;
    	var score = 2;
    	for(var i = 0; i < 9; ++i){
    		if(board[i]==0){
    			board[i]=-1;
    			var tempScore = -minimax(board,1);
    			board[i]=0;
    			if(tempScore > score){
    				score = tempScore;
    				move = i;
    			}
    		}

    	}

    	board[move] = -1;
    	*/

    }
    /*
    function minimax(board,player){
    	var winner = checkWin();
    	if(winner!=null){
    		return playerVal(winner);
    	}
    	move = 1;
    	var score = 2;
    	for (var i = 0; i < 9; ++i){
    		if(board[i] == 0){
    			board[i]=player;
    			var thisScore = -minimax(board,player*-1);
    			if(thisScore > score){
    				score = thisScore;
    				move = i;
    			}
    			board[i]=0;
    		}
    	}
    	if(move==1) return 0;
    	return score;
    	




    }
    */
    //Check for valid move
    function check(move) {
        return board[move] == 0;
    }

    //Update board
    function update(){
    	board.forEach(function(element,index){
    		if(element!=0){var value = '#a'+index;
    		$(value).html(playerVal(element));
    	}
    	else{
    		var value = '#a'+index;
    		$(value).html(" ");
    	}
    	});
    	console.log(board);
    }

    //Check Win
    function checkWin(){
    	//Check horizontal
    	if(((player==board[0])&&(board[0]==board[1])&&(board[1]==board[2]))||
    		((player==board[3])&&(board[3]==board[4])&&(board[4]==board[5]))||
    		((player==board[6])&&(board[6]==board[7])&&(board[7]==board[8])))
    		return player;

    	 //Check vertical
    	else if(((player==board[0])&&(board[0]==board[3])&&(board[3]==board[6]))||
    		((player==board[1])&&(board[1]==board[4])&&(board[4]==board[7]))||
    		((player==board[2])&&(board[2]==board[5])&&(board[5]==board[8])))
    		return player;

    	 //Check diagonal
    	else if(((player==board[0])&&(board[0]==board[4])&&(board[4]==board[8]))||
    		((player==board[6])&&(board[6]==board[4])&&(board[4]==board[2])))
    		return player;


    	else if(board.indexOf(0)==-1)
    		return 0;
    	else
    		return null;
    }

    function playerVal(player){
    	switch(player){
    		case 1:
    			return "X";
    			break;
    		case -1:
    			return "O";
    			break;
    		default:
    			return " ";
    	}
    }

}
