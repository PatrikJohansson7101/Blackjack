const output = document.getElementById("output-area"); //Div för att mata ut kort och samamanlagda värdet på korten.
const winnerArea = document.getElementById("winner-area"); // Div för att mata ut PlayerWin/DealerWin/Draw
// Kopplar våra knappar till HTML.
const newGame = document.getElementById("new-game-button");
const hitButton = document.getElementById("hit-button");
const stayButton = document.getElementById("stay-button");
let playerScore = 0;
let dealerScore = 0;

hideGameButtons(); // Gömmer hit & stay och visar "New game"

// Orginal array med kortsymboler och värden på varje kort.
let cards = [
    //Spades
    { card: "🂱", value: 1 },
    { card: "🂢", value: 2 },
    { card: "🂣", value: 3 },
    { card: "🂤", value: 4 },
    { card: "🂥", value: 5 },
    { card: "🂦", value: 6 },
    { card: "🂧", value: 7 },
    { card: "🂨", value: 8 },
    { card: "🂩", value: 9 },
    { card: "🂪", value: 10 },
    { card: "🂫", value: 10 },
    { card: "🂬", value: 10 },
    { card: "🂭", value: 10 },

    //Hearts
    { card: "🂱", value: 1 },
    { card: "🂲", value: 2 },
    { card: "🂳", value: 3 },
    { card: "🂴", value: 4 },
    { card: "🂵", value: 5 },
    { card: "🂶", value: 6 },
    { card: "🂷", value: 7 },
    { card: "🂸", value: 8 },
    { card: "🂹", value: 9 },
    { card: "🂺", value: 10 },
    { card: "🂻", value: 10 },
    { card: "🂼", value: 10 },
    { card: "🂽", value: 10 },

    //JOKER?? 🂿🂿🂿🂿🂿🂿
    //Diamonds
    { card: "🃁", value: 1 },
    { card: "🃂", value: 2 },
    { card: "🃃", value: 3 },
    { card: "🃄", value: 4 },
    { card: "🃅", value: 5 },
    { card: "🃆", value: 6 },
    { card: "🃇", value: 7 },
    { card: "🃈", value: 8 },
    { card: "🃉", value: 9 },
    { card: "🃊", value: 10 },
    { card: "🃋", value: 10 },
    { card: "🃌", value: 10 },
    { card: "🃍", value: 10 },

    
    //CLUBS

    { card: "🃑", value: 1 },
    { card: "🃒", value: 2 },
    { card: "🃓", value: 3 },
    { card: "🃔", value: 4 },
    { card: "🃕", value: 5 },
    { card: "🃖", value: 6 },
    { card: "🃗", value: 7 },
    { card: "🃘", value: 8 },
    { card: "🃙", value: 9 },
    { card: "🃚", value: 10 },
    { card: "🃛", value: 10 },
    { card: "🃜", value: 10 },
    { card: "🃝", value: 10 }
];

let deck = []; // En empty array för att lagra våra shufflade kort från shuffleDeck funktionen.


function shuffleDeck() {  //En funktion för att shuffla cards. Den tar ett random kort från orginalArrayen och lägger i Deck.
    let tmpDeck = [...cards]; //Använder spread för att få ut värden från arrayen istället för arrayer. "..." är spread.
    //Sålänge tmpDeck är mer än 0 kör loopen AKA blanda kortleken.
    while (tmpDeck.length > 0) {
        let result = Math.random() * tmpDeck.length; // Genererar random nummer beroende tmpDecks längd.
        let pos = Math.trunc(result); // Gör om vårat genererade nummer till heltal.

        let tempCard = tmpDeck.splice(pos, 1); //Splicar ut ett kort från tmpDeck.

        deck.push(...tempCard); //Använder spread för att lägga till värdet i arrayen istället för arrayer.
        //Pushar in random kort til deck.
    }
}

// Drar ut 1 kort från korteleken

function drawCard() {
    return deck.shift();
}

// Show hands
let dealer = []; //Här ligger det 2 kort efter att funktionen är körd.
let player = []; //Här ligger det 2 kort efter att funktionen är körd. dealInitialCards.

const outPutArea = document.getElementById("output-area");

function showHand(playerPara, scorePara) { // Delar ut 2 kort till player och dealer. parametrarna är bara en placeholder för player/dealer/random array.
    if (scorePara == 0) {
        return "";
}
   

    let cards = ""; //Här ska vi trycka in dealer.cards och player.cards.

    playerPara.forEach(singleCard => {
        // För varje kort i player får du ett singleCard, och singlecard är ett kort

        cards += singleCard.card; // Konkar cardsArrayen med singleCard och symbolen som är .card.
    });

    cards += ` ${scorePara}</br>`; //Konkar cardsArrayen med score.

    return cards; // Returnerar cards.card + card.value
}

function clearTable() {
    //Funktion som resettar bordet aka Clearing the table

    outPutArea.innerHTML = "";
}

function calculateHandValue(cards) {
    //Cards är i det här fallet player eller dealer, med andra ord 2 kort.

    let score = 0;

    cards.forEach(singleCard => {
        // Räknar ut värdet på korten i cards. För varje kort, lägg till värdet i score.
        
        score += singleCard.value;
    });
    
    let hasAce = cards.find(element => element.value === 1)!== undefined; //Söker efter ett ess(1) i cards-parametern, kan vara player eller dealer. 1 eller undefined.
    if (score + 10  <= 21 && hasAce ) {
        //Dubbelkollar om score är mer eller lika med 21. OM DET är ett E
        score += 10;
    }
    return score;
}

function dealInitialCards() {
    player.push(drawCard()); //Pushar in 1 kort till playerArrayen
    player.push(drawCard()); //Pushar in 1 kort till playerArrayen
    dealer.push(drawCard()); //Pushar in 1 kort till dealarArrayen
    dealer.push(drawCard()); //Pushar in 1 kort till dealerArrayen
}



function startNewGame() {
    showGameButtons();
    winnerArea.innerHTML = "";
    hitButton.style.display = "inline-block"; //Visar hit & stay button, döljer NewgameBtn
    stayButton.style.display = "inline-block";
    newGame.style.display = "none";
    dealer = []; // Reset array
    player = []; // Reset array
    deck = []; // Reset array
    clearTable(); //Rensar bordet varje gång vi startar nytt game
    shuffleDeck(); //Blandar kortleken
    dealInitialCards(); //Delar ut 2 kort till dealar och player arrayerna.
    showHands(); //Matar ut 2 kort och poängen på bordet från player + dealer arrays. Anropar även calculateHandvalue med player/dealer score.
    
}

function showNewBtn() {
    hitButton.style.display = "none";
    stayButton.style.display = "none";
    newGame.style.display = "inline-block";
}

showNewBtn();

function showHands(stayed = false) {
    playerScore = calculateHandValue(player);
    dealerScore = calculateHandValue(dealer);
    outPutArea.innerHTML = showHand(player, playerScore); // Pushar in playerArrayen till playerPara.
    outPutArea.innerHTML += showHand(dealer, dealerScore); // Pushar in dealerArrayen till playerPara.
    let winner = determineWinner(stayed) // Stayed är false tills vi trycker på Stay med showhandTrue Anrop.
    winnerArea.innerHTML = winner; // Här skrivs vinnaren ut.

  if (winner != "") {
    hideGameButtons();
  }
}

function addAnotherCard(hand) {
    //hand är player/dealer //hand ska ta emot player eller dealers 2 kort. Alltså handen.
    hand.push(drawCard()); //drawCard är ett kort från shuffledDeck.
}

// ButtonCLickEvents

newGame.addEventListener(`click`, () => {
    // Klicka på New Game = Anropar funktionen startNewGame.
    startNewGame();
    
});

hitButton.addEventListener(`click`, () => {
    addAnotherCard(player);
    showHands();
    
});

stayButton.addEventListener(`click`, () => {
    hideGameButtons();
    //Skapa en while loop som agerar när dealerSCore är mindre än playerScore OCH&& när playerScore är mindre eller LIKA MED 21. OCH&& dealerScore mindre eller lika med 21.
    while (playerScore >= dealerScore && playerScore <= 21 && dealerScore <= 17) {
        addAnotherCard(dealer); // Ger ett kort till dealer
        showHands(true);
    }
    showHands(true);
});

function hasBlackJack(hand, score) {
    //Ska kolla om handen har 2 kort med värde på exakt 21.
    if (score == 21 && hand.length == 2) {
        return true;
    }
    return false;
}



function isBust(score) {
    //Ska kolla om handen har 2 kort med värde på exakt 21.
    if (score > 21) {
        return true;
    }
    return false;
}



function determineWinner(stayed) {
    // frga jonas
    console.log(stayed, playerScore, dealerScore);

    const dealerWins = "Dealer Wins"; //Tilldelar sträng till dealerWins
    const playerWins = "Player Wins";
    const draw = "Draw";

    if (isBust(playerScore)) {
        //Lägger till playerScore i "isBust" funktionen.
        return dealerWins; //Om playerscore är mer än 21 return DealerWins!
    }

    if (isBust(dealerScore)) {
        //Lägger till dealerScore i "isBust" funktionen.
        return playerWins; //om dealerScore är mer än 21 return PlayerWins
    }
    if (dealer.length == 5 && dealerScore <= 21) {
        //Kollar om dealern har 5 kort.
        return dealerWins;
    }
    if (dealerScore == playerScore && stayed)  {
        return draw;
    }
    if (playerScore > dealerScore && stayed) {
        return playerWins;
    }
    if (playerScore < dealerScore && stayed) {
        return dealerWins;
    } // Check if dealer or player has blackjack
    else {
        let dealerBJ = hasBlackJack(dealer, dealerScore);
        let playerBJ = hasBlackJack(player, playerScore);
        if (playerBJ && dealerBJ) {
            return draw;
        }
      if (playerBJ) {
        return playerWins;
      }
      if (dealerBJ) {
        return dealerWins;
      }

  }
  return "";
}



function showGameButtons() {
  hitButton.style.display = "inline-block";
  stayButton.style.display = "inline-block";
  newGame.style.display = "none";
}
function hideGameButtons() {
  hitButton.style.display = "none";
  stayButton.style.display = "none";
  newGame.style.display = "inline-block";
}

