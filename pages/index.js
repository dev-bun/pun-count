import { useState, useEffect } from 'react'
import { useReward } from 'react-rewards';

export default function Home() {
  const [puns, setPuns] = useState(0)

  const [punClass, setPunClass] = useState(`pun0`)
  const [punSubtext, setPunSubtext] = useState(``)

  const [emojis, setEmojis] = useState(['💀', '😭'])

  const { reward, isAnimating } = useReward('rewardId', 'emoji', {
    angle: 90,
    emoji: emojis
  })

  const getUniqueSubtext = () => {
    const allPunSubtexts = [
      `Send help`,
      `Getting worse...`,
      `Tell my family I love them`,
      `I can't take it anymore`,
      `You've ruined it`,
      `It's gone too far`,
      `I'm done`,
      `HELLPPPPPPPPP`,
      `AGHHHHHHH THE PAIN`,
      `I'm in agony`,
      `Please make it stop`,
      `Is there an off switch?`,
      `When will it end?`,
      `The pain never ends`,
      `I'm in hell`,
      `Oh lord. Oh god. Oh no.`,
      `cool cool cool no doubt no doubt no doubt`,
      `Shit.`,
      `I want to go home now.`,
      `I'm going to cry.`,
      `Going clinically insane.`,
      `Thanks Cameron, nan's crying now.`,
      `Brought a tear to my eyes.`,
      `Live, laugh, love. Just kidding.`,
      `Summoning the devil...`,
      `Please hold, your call is important to us.`,
      `AGHHHHHHHH`,
      `The pain is unbearable`,
      `What happened to the 5 pun limit?`,
    ]

    const uniqueSubtexts = allPunSubtexts.filter(subtext => subtext !== punSubtext)

    return uniqueSubtexts[Math.floor(Math.random() * uniqueSubtexts.length)]
  }

  const makeEmojiArray = () => {
    const emojiArray = []

    const possibleEmojis = [
      '💀',
      '😭',
      '🤡',
      '🤢',
      '🤮',
      '🤯',
      '🥵',
      '🥶',
      '🤬',
      '🤫',
      '🤥',
      '🤔',
    ]

    // generate a random array of 4 unique emojis
    while (emojiArray.length < 4) {
      const randomEmoji = possibleEmojis[Math.floor(Math.random() * possibleEmojis.length)]
      if (!emojiArray.includes(randomEmoji)) {
        emojiArray.push(randomEmoji)
      }
    }

    setEmojis(emojiArray)
  }

  useEffect(() => {
    makeEmojiArray()
  }, [])

  const handlePunIncrease = () => {
    if (puns % 1000 === 0 && puns !== 0) reward();

    if (puns <= 5) {
      setPunClass(`pun${puns}`)
    } else {
      setPunClass(`punTooMany`)
    }

    switch (puns) {
      case 0:
        setPunSubtext(`Phew, no puns (yet)`)
        break
      case 1:
        setPunSubtext(`Oh god, it's starting...`)
        break
      case 69:
        setPunSubtext(`Nice`)
        break
      case 420:
        setPunSubtext(`frfr ong`)
        break
      case 666:
        setPunSubtext(`The devil is here`)
        break
      default:
        setPunSubtext(getUniqueSubtext())       
        break
    }
  }

  useEffect(() => {
    handlePunIncrease()
  }, [puns])

  // watch document.getElementById('punNumber').innerText
  // execute handlePunIncrease() when it changes

  // we can't use useEffect because it doesn't watch for changes in the DOM
  // so we have to use a mutation observer
  useEffect(() => {
    const targetNode = document.getElementById('punNumber')
    const config = { attributes: true, childList: true, subtree: true }
    const callback = function (mutationsList, observer) {
      console.log('mutation observed')
      for (const mutation of mutationsList) {
        if (mutation.target.id === 'punNumber') {
          setPuns(parseInt(mutation.target.innerText))
        }
      }
    }

    const observer = new MutationObserver(callback)

    observer.observe(targetNode, config)

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleIncrease = () => {
    // IF ITS PUN #5, SHOW A POPUP SAYING ARE YOU SURE YOU WANT TO CONTINUE
    if (puns === 5) {
      if (window.confirm(`We have hit the 5 pun limit. Are you sure you want to proceed?`)) {
        setPuns(puns + 1)
      }
    }
    else {
      setPuns(puns + 1)
    }
  };

  // on spacebar press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ([13, 32, 38].includes(e.keyCode)) {
        handleIncrease()
      }
      else if (e.keyCode === 40) {
        setPuns(puns - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [puns])

  return (
    <>
      <script src="./script.js"></script>
      <div className={`overflow-hidden flex flex-col items-center justify-center min-h-screen py-2 select-none cursor-pointer ${punClass}`} onClick={handleIncrease}>
        <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
          <h1 className="text-9xl font-bold" id="rewardId">
            <span id="punNumber">{puns}</span>
          </h1>
          <h2 className="text-4xl font-bold">
            {punSubtext}
          </h2>
        </main>
      </div>
    </>
  )
}