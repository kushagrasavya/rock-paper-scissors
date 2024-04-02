let score = JSON.parse(localStorage.getItem('score')) ||  {
    wins: 0,
    losses: 0,
    ties: 0
};


updateScoreElement();


     let isAutoPlaying = false;
     let intervalid;




  function autoplay(){
     if(!isAutoPlaying){
        intervalid = setInterval(() => {
               const playerMove = pickComputerMove()
               playGame(playerMove);
          }, 1000);
          isAutoPlaying = true;

      document.querySelector('.js-auto-play-button').innerHTML=`
         Stop Auto Play
          `;
     }
     else{
          clearInterval(intervalid);
          isAutoPlaying=false;
          document.querySelector('.js-auto-play-button').innerHTML=`
         Auto Play
          `;
     }
  }



  document.querySelector('.js-rock-button').addEventListener('click', () =>{
     playGame('rock');
  });

  document.querySelector('.js-paper-button').addEventListener('click', () => {
     playGame('paper');
  });

  document.querySelector('.js-scissors-button').addEventListener('click', ()=>{
     playGame('scissors');
  });

  document.querySelector('.js-restore-score-button').addEventListener('click', ()=>{
     score.wins= 0;
          score.losses= 0;
          score.ties= 0;
      localStorage.removeItem('score');
      updateScoreElement();
  });

  document.querySelector('.js-auto-play-button').addEventListener('click', ()=>{
   autoplay();
  });


  document.body.addEventListener('keydown', (event) =>{
          if(event.key === 'r'){
               playGame('rock');
          }
          else if (event.key === 'p'){
               playGame('paper');
          }
          else if(event.key === 's'){
               playGame('scissors');
          }
  })


function playGame(playerMove){

    const computerMove = pickComputerMove();
         
    let result = '';

    if(playerMove === 'scissors'){
                        if(computerMove === 'rock'){
                        result = 'You lose' ;
                   } else if(computerMove === 'paper'){
                        result= 'You win';
                   } else if(computerMove === 'scissors'){
                        result = 'Tie';
                   }
              }

          else if(playerMove === 'paper'){
                        if(computerMove === 'rock'){
                        result = 'You win';
                        } else if(computerMove === 'paper'){
                        result= 'tie';
                        } else if(computerMove === 'scissors'){
                             result = 'You lose';
                        }
                   }


              else if(playerMove === 'rock'){
                        if(computerMove === 'rock'){
                        result = 'Tie';
                        } else if(computerMove === 'paper'){
                        result= 'You lose';
                        } else if(computerMove === 'scissors'){
                             result = 'You win';
                        }

              }

         
    if(result === 'You win'){
         score.wins += 1;
    } 
    else if(result === 'You lose'){
         score.losses += 1
    }
    else if( result === 'Tie'){
         score.ties+=1;
    }

    localStorage.setItem('score', JSON.stringify(score));


    document.querySelector('.js-result').innerHTML=`${result}.`;
    document.querySelector('.js-moves').innerHTML=`  You
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    computer`;

    updateScoreElement();


}


function updateScoreElement(){
    document.querySelector('.js-score')
         .innerHTML= `wins: ${score.wins} losses: ${score.losses} Ties: ${score.ties}`;
}

function pickComputerMove(){

    const randomNumber= Math.random();
    let computerMove= '';
     if(randomNumber>= 0 && randomNumber<1/3){
              computerMove= 'rock';
         }
          else if(randomNumber>= 1/3 && randomNumber<2/3){
                   computerMove= 'paper';
              }
         else if(randomNumber>= 2/3 && randomNumber<1){
                   computerMove= 'scissors';
              }

    return computerMove;

}