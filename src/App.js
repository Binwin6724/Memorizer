import { useEffect, useState } from 'react';
import './App.css';
import SimpleCard from './components/SimpleCard';

const cardImages = [
  {"src": "/img/helmet.png", matched: false},
  {"src": "/img/castle.png", matched: false},
  {"src": "/img/king.png", matched: false},
  {"src": "/img/scroll.png", matched: false},
  {"src": "/img/shield.png", matched: false},
  {"src": "/img/ring.png", matched: false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)


    //shuffle card
    const shuffleCard = () =>{
      const shuffledCard = [...cardImages, ...cardImages]
      .sort(() => Math.random() -0.5)
      .map((card) => ({ ...card, id: Math.random() }))
      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCard)
      setTurns(0)
    }

    //handle a choice
    const handleChoice = (card) => {
      choiceOne ? setChoiceTwo(card): setChoiceOne(card)
    }

    //compare 2 selected card
    useEffect(() => {
      
      if (choiceOne && choiceTwo) {
        setDisabled(true)
        if (choiceOne.src === choiceTwo.src) {
          setCards(prevCards => {
            return prevCards.map(card => {
              if (card.src === choiceOne.src)
              {
                return { ...card, matched: true }
              } else {
                return card
              }
            })
          })
          resetTurn()
        }
        else{
          setTimeout(() => resetTurn(), 1000)
        }
      }
    }, [choiceOne, choiceTwo])


    //reset choices & increase turns
    const resetTurn = () => {
      setChoiceOne(null)
      setChoiceTwo(null)
      setTurns(prevTurns => prevTurns + 1)
      setDisabled(false)
    }


    //start game automatically
    useEffect(() => {
      shuffleCard()
    }, [])

  return (
    <div className="App">
      <h1>Memorizer</h1>
      <button onClick={shuffleCard}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SimpleCard 
          key={card.id} 
          card = {card}
          handleChoice={handleChoice}
          flipped = {card === choiceOne || card === choiceTwo || card.matched}
          disabled = {disabled}
          />
        ))}
      </div>
      <p>Turns : {turns}</p>
      <footer>Developed by <a className='base-link' href='https://binwinviju.co.in/'>Binwin Viju</a></footer>
    </div>
  );
}

export default App;
