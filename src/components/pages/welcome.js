import Page from "../organisms/page";

const Welcome = () => {
  return (
    <Page>
      <div className="bg-yellow w-[375px] min-h-screen p-6">
        <h1 className="text-center text-header1 mb-1">
          Welcome to Hannagrams!
        </h1>
        <p className="mb-5 text-center">
          <em>a word game just for us!</em>
        </p>
        <h2 className="text-header2 mb-3">How to play</h2>
        <p className="mb-3">
          In a similar way to a crossword, you must populate a grid containing
          spaces for multiple words. However, you are initially given only the
          letters found in each word for a clue. For example, the word Hannah
          could present you with 'A H N'.
        </p>
        <p className="mb-3">
          If you are really stuck, there is an option on each word to obtain a
          descriptive clue. Please note that using this will affect your final
          score.
        </p>
        <p className="mb-5">
          In total, there are 6 grids to fill in. Completing each one will
          unlock the next. If your score is high enough, you will unlock a bonus
          stage. Good luck {":)"}
        </p>
        <div className="flex justify-center">
          <button className="bg-purple p-2 w-20 rounded-md text-white font-medium">
            Play
          </button>
        </div>
      </div>
    </Page>
  );
};

export default Welcome;
