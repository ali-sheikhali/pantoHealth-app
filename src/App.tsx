import { useEffect, useState } from "react";
import { getCities } from "./lib/getCities";
import type { TrainStationType } from "./types/trainStationTypes";
import ChoiceCity from "./components/common/ChoiceCity";
import ChoiceMap from "./components/common/ChoiceMap";

function App() {
  const [data, setData] = useState<TrainStationType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCities();
        console.log("data from api:", data);
        setData(data);
      } catch (error) {
        console.error("error:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <div className="w-10/12 mx-auto mt-10">
        <div className="flex flex-col gap-5">
          <ChoiceCity cities={data} />
          <ChoiceMap data={data} />
        </div>
      </div>
    </>
  );
}

export default App;
