import axios from "axios";
import { useEffect, useState } from "react";
import backupJson from "../../api/backup.json";
import Game from "../pages/game";
import Page from "../organisms/page";

const GameWithData = () => {
  const [loading, setLoading] = useState(true);
  const [mainData, setMainData] = useState([]);
  const [bonusData, setBonusData] = useState({});

  useEffect(() => {
    const fetchData = async (endpoint, setter) => {
      setTimeout(async () => {
        setLoading(true);
        try {
          const { data: response } = await axios.get(
            `http://localhost:3030/${endpoint}`
          );
          setter(response);
        } catch (error) {
          console.error(
            "Unable to fetch data from DB!\n\nUsing a backup JSON file instead"
          );
          setter(backupJson[endpoint]);
        }
        setLoading(false);
      }, 1000);
    };

    fetchData("main", setMainData);
    fetchData("bonus", setBonusData);
  }, []);

  return (
    <div>
      {loading && <Page>Loading</Page>}
      {!loading && <Game data={{ main: mainData, bonus: bonusData }} />}
    </div>
  );
};

export default GameWithData;
