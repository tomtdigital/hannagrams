import { useContext } from "react";
import jsonData from "../../api/data.json";
import Grid from "../organisms/grid";
import Page from "../organisms/page";
import { AppContext } from "../utils/app-context";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Bonus from "../organisms/bonus";
import { useMemo } from "react";

// TODO: Create dummy L grid
// TODO: Create keyboard
// Later
// TODO: setup localStorage (gameData with guesses + everything in context state)
// TODO: use localStorage on play button click

const Game = () => {
  const { main, bonus } = jsonData;
  const {
    stage,
    cluesUsed,
    score,
    tabIndex,
    setTabIndex,
    bonusUnlocked,
    gameComplete,
  } = useContext(AppContext);
  const bonusTabBorder = gameComplete ? "border-green" : "border-purple";
  const bonusTabFill = gameComplete ? "bg-green" : "bg-purple";
  const allWords = useMemo(
    () =>
      main.flatMap((game) => {
        const across = game.data.across;
        const down = game.data.down;
        let words = [];
        if (across)
          words = [
            ...words,
            ...across.map((item) => (item ? item.word : null)),
          ];
        if (down)
          words = [...words, ...down.map((item) => (item ? item.word : null))];
        return words;
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

  return (
    <Page>
      <div className="bg-yellow text-center w-device h-6">
        <h1 className="text-header5">Hannagrams!</h1>
      </div>
      <div className="min-h-[50%]">
        <Tabs selectedIndex={tabIndex} onSelect={(value) => setTabIndex(value)}>
          <div>
            <div className="text-center">
              <p>
                Clues used- {cluesUsed} Score- {score}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <TabList className="flex mt-3 mb-3">
              {main.map((game, index) => {
                let unlocked = index === 0;
                if (index > 0) unlocked = stage >= index;
                let tabBorder = "border-lightGrey";
                let tabFill = "bg-lightGrey";
                if (unlocked) {
                  tabBorder = "border-yellow";
                  tabFill = "bg-yellow";
                }
                if (stage > index) {
                  tabBorder = "border-green";
                  tabFill = "bg-green";
                }

                return (
                  <Tab
                    key={game.grid + "tab"}
                    className={`w-8 h-8 rounded-[50%] flex items-center justify-center ml-1 mr-1 border-solid border-2 ${tabBorder} ${tabFill} text-white font-medium ${
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
                  className={`w-8 h-8 rounded-[50%] flex items-center justify-center ml-1 mr-1 text-white font-medium border-solid border-2 ${bonusTabBorder} ${bonusTabFill} cursor-pointer`}
                >
                  7
                </Tab>
              )}
            </TabList>
          </div>
          {main.map((game, index) => {
            return (
              <TabPanel key={game.grid + "grid"}>
                <Grid
                  type={game.grid}
                  stage={index}
                  active={!gameComplete && stage === index}
                  data={game.data}
                  bonusScore={bonusScore}
                />
              </TabPanel>
            );
          })}
          {bonusUnlocked && (
            <TabPanel>
              <Bonus data={bonus} active={!gameComplete} />
            </TabPanel>
          )}
        </Tabs>
      </div>
      <div className="min-h-[50%]">Keyboard</div>
    </Page>
  );
};

export default Game;
