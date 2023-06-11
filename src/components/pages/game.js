import { useContext, useEffect, useMemo, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Clue from "../molecules/clue";
import Bonus from "../organisms/bonus";
import GridSection from "../organisms/grid-section";
import Keyboard from "../organisms/keyboard";
import Page from "../organisms/page";
import { AppContext } from "../utils/app-context";
import { shuffleArray } from "../utils/shuffle-array";
import Welcome from "./welcome";

// TODO: Bonus stage
// TODO: Mock NYT behaviour- skip letters already filled in
// TODO: Hide all and show message when under a particular height
// Later
// TODO: setup localStorage (gameData with guesses + everything in context state)
// TODO: use localStorage on play button click

const Game = ({ data: { main, bonus } }) => {
  const {
    stage,
    score,
    tabIndex,
    setTabIndex,
    modalVisible,
    bonusUnlocked,
    gameComplete,
  } = useContext(AppContext);
  const allWords = useMemo(
    () =>
      main.flatMap((game) => {
        const { data } = game;
        return data.map((item) => (item ? item.word : null));
      }),
    [main]
  );
  const totalLetters = useMemo(() => allWords.join("").length, [allWords]);
  const maxScore = useMemo(() => totalLetters * 3, [totalLetters]);
  const averageWordLength = useMemo(
    () => Math.floor(totalLetters / allWords.length),
    [totalLetters, allWords]
  );
  const bonusScore = useMemo(
    () => maxScore - averageWordLength * 6,
    [maxScore, averageWordLength]
  );

  const [readWelcome, setReadWelcome] = useState(
    localStorage.getItem("readHannagramsWelcome")
  );

  useEffect(() => {
    localStorage.setItem("readHannagramsWelcome", readWelcome);
  }, [readWelcome]);

  const praise = useMemo(() => {
    const praiseList = [
      "Nice nice nice!!!",
      "Fucking galaxy brain!!!",
      "Loving that big brain energy!",
      "You're so fucking smart!!!",
      "All the Tom's go wild!!!",
      "Absolute scenes!!!",
    ];

    return shuffleArray(praiseList);
  }, []);

  return (
    <Page>
      {readWelcome ? (
        <>
          <div className="bg-yellow text-center h-6">
            <h1 className="text-header5">Hannagrams!</h1>
          </div>
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(value) => setTabIndex(value)}
          >
            <div>
              <div className="text-center">
                <p>Score- {score}</p>
              </div>
            </div>
            <div className="flex justify-center">
              <TabList className="flex mt-1 mb-5">
                {main.map((game, index) => {
                  let unlocked = index === 0;
                  if (index > 0) unlocked = stage >= index;
                  let tabColors = "border-lightGrey bg-lightGrey";
                  if (unlocked) {
                    tabColors = "border-yellow bg-yellow";
                  }
                  if (stage > index) {
                    tabColors = "border-green bg-green";
                  }

                  return (
                    <Tab
                      key={game.grid + "tab"}
                      className={`w-8 h-8 rounded-[50%] flex items-center justify-center ml-1 mr-1 border-solid border-2 ${tabColors} text-white font-medium ${
                        unlocked ? "cursor-pointer" : ""
                      }`}
                      disabled={!unlocked}
                    >
                      <span className="block">
                        {unlocked ? index + 1 : <>&#128274;</>}
                      </span>
                    </Tab>
                  );
                })}
                {bonusUnlocked && (
                  <Tab
                    className={`w-8 h-8 rounded-[50%] flex items-center justify-center ml-1 mr-1 text-white font-medium border-solid border-2 ${
                      gameComplete
                        ? "border-green bg-green"
                        : "border-purple bg-purple"
                    } cursor-pointer`}
                  >
                    7
                  </Tab>
                )}
              </TabList>
            </div>
            {main.map((game, index) => {
              const active = !gameComplete && !modalVisible && stage === index;

              return (
                <TabPanel key={game.grid + "grid"}>
                  <GridSection
                    type={game.grid}
                    round={index}
                    data={game.data}
                    active={active}
                    bonusScore={bonusScore}
                    praise={praise}
                  />
                  <div className="h-[70px] bg-blue mt-[3em]">
                    <Clue active={active} />
                  </div>
                  <div className="grid grid-cols-1 grid-rows-3 h-[calc(40vh-60px-70px-3em)]">
                    <Keyboard active={active} />
                  </div>
                </TabPanel>
              );
            })}
            {bonusUnlocked && (
              <TabPanel>
                <Bonus data={bonus} active={!gameComplete} />
              </TabPanel>
            )}
          </Tabs>
        </>
      ) : (
        <Welcome handleReadWelcome={() => setReadWelcome(true)} />
      )}
    </Page>
  );
};

export default Game;
