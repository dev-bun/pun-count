import { useState, useEffect } from 'react'

export default function Home() {
  const [puns, setPuns] = useState(0)

  const [punClass, setPunClass] = useState(`pun0`)
  const [punSubtext, setPunSubtext] = useState(``)

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
      `I'm in hell`
    ]

    const uniqueSubtexts = allPunSubtexts.filter(subtext => subtext !== punSubtext)

    return uniqueSubtexts[Math.floor(Math.random() * uniqueSubtexts.length)]
  }

  useEffect(() => {
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

  }, [puns])

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen py-2 select-none cursor-pointer ${punClass}`} onClick={() => setPuns(puns + 1)}>
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-9xl font-bold">
          {puns}
        </h1>
        <h2 className="text-4xl font-bold">
          {punSubtext}
        </h2>
      </main>
    </div>
  )
}