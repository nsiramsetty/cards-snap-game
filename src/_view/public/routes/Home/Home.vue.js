let cardsList = require('../../../../_data/cardsList');
import 'vue-range-component/dist/vue-range-slider.css';
import VueRangeSlider from 'vue-range-component';

export default {
  name: 'home',
  props: [],
  data: function () {
    return {
      listOfCards: [...cardsList],
      noOfTotalCards: [...cardsList].length,
      playerCards: [],
      computerCards: [],
      playingCards: [],
      isPlayersTurn: false,
      isComputersTurn: false,
      isGameInProgress : false,
      isSnapTime : false,
      alert : null,
      reactionTime : 3,
      actingTime : 2
    };
  },
  created: function () {
    this.setReactionTimeForToastr();
  },
  methods: {

    setReactionTimeForToastr : function(){
      console.log(this.$toastr.options);
    },

    startGame : function(){
      this.clearAlert();
      this.resetGame();
      this.shuffleAndDistributeCards();
      this.setInitialTurn();
    },

    clearAlert : function(){
      this.alert = null;
    },

    resetGame: function () {
      this.isPlayersTurn = false;
      this.isComputersTurn= false;
      this.isGameInProgress =false;
      this.isSnapTime = false;
      this.playerCards = [];
      this.computerCards = [];
      this.playingCards = [];
    },

    shuffleAndDistributeCards: function () {
      let shuffledCards = this.shuffleCards([...cardsList]);
      for (let i = 0; i < shuffledCards.length / 2; i++) {
        this.playerCards.push(shuffledCards[i]);
        this.computerCards.push(shuffledCards[shuffledCards.length - i - 1]);
      }
    },

    shuffleCards: function (cards) {
      let currentIndex = cards.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
      }
      return cards;
    },

    setInitialTurn: function () {
      this.isGameInProgress = true;
      this.isPlayersTurn = Math.round(Math.random());
      this.isComputersTurn = !this.isPlayersTurn;
      if (this.isComputersTurn) {
        this.drawComputerCard();
      }
    },

    // Game Controls

    toggleTurns: function () {
      this.isPlayersTurn = !this.isPlayersTurn;
      this.isComputersTurn = !this.isComputersTurn;
      if (this.isComputersTurn) {
        this.drawComputerCard();
      }
    },

    drawPlayerCard: function () {
      if (this.playerCards.length && this.isPlayersTurn) {
        this.playingCards.unshift(this.playerCards[0]);
        this.playerCards.splice(0, 1);
      }
    },

    drawComputerCard: function () {
      if (this.computerCards.length) {
        setTimeout(() => {
          this.playingCards.unshift(this.computerCards[0]);
          this.computerCards.splice(0, 1);
        }, this.actingTime*1000);
      }
    },

    doPlayerSnap : function(){
      if(this.isSnapTime){
        this.playerCards = this.playerCards.concat([...this.playingCards]);
        this.playingCards = [];
        this.$toastr.s("Congrats :-), You SNAPPED it :-) ");
        this.isSnapTime = false;
        this.toggleTurns();
      }
    },

    doComputerSnap : function(){
      if(this.isSnapTime){
        this.computerCards.concat([...this.playerCards]);
        this.playingCards = [];
        this.$toastr.e("Sorry :-(, Computer Called it a SNAP , Better Luck Next Time.");
        this.isSnapTime = false;
        this.toggleTurns();
      }
    },

    // Helpers

    getImageClass: function (card) {
      return "card rank-"+card.value.toString().toLowerCase()+" "+ card.suit;
    },

    getImageContent : function(card){
      return '<div class="rank">'+card.value.toString().toUpperCase()+'</div>' +
        '    <div class="suit">&'+card.suit+';</div>';
    },

    getImageSrc: function (card) {
      return "/static/images/cards/" + card.value + card.suit[0].toUpperCase() + ".jpg";
    },
  },
  computed: {},
  watch: {
    playingCards: {
      handler: function (newVal, oldVal) {
        if(this.isGameInProgress){
          if(this.playerCards.length === 0){
            this.alert = {
              text : 'Sorry :-(, Computer Won the game !!',
              class : 'alert-danger'
            };
            this.$toastr.e(this.alert.text);
            this.isGameInProgress = false;
          }
          else if(this.computerCards.length === 0){
            this.alert = {
              text : 'Congratulations :-) , You Won the game !!',
              class : 'alert-success'
            };
            this.$toastr.s(this.alert.text);
            this.isGameInProgress = false;
          } else{
            if(newVal.length){
              if (newVal.length >= 2) {
                if (newVal[0].value === newVal[1].value) {
                  this.isSnapTime = true;
                  setTimeout(() => {
                    this.doComputerSnap();
                  }, this.reactionTime*1000);
                } else {
                  this.toggleTurns();
                }
              } else {
                this.toggleTurns();
              }
            }
          }
        }
      },
      deep: true
    }
  },
  components: {
    VueRangeSlider
  }
}
