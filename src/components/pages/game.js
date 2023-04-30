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
// TODO: Hide all and show message when under a particular height
// Later
// TODO: setup localStorage (gameData with guesses + everything in context state)
// TODO: use localStorage on play button click

const Game = () => {
  const { main, bonus } = jsonData;
  const { stage, score, tabIndex, setTabIndex, bonusUnlocked, gameComplete } =
    useContext(AppContext);
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

  return (
    <Page>
      <div className="bg-yellow text-center h-6">
        <h1 className="text-header5">Hannagrams!</h1>
      </div>
      <Tabs selectedIndex={tabIndex} onSelect={(value) => setTabIndex(value)}>
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
      <div className="min-h-[50vh]">Keyboard</div>
    </Page>
  );
};

export default Game;
