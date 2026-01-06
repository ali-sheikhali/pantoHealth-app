import { useEffect, useState } from "react";
import { getCities } from "./lib/getCities";
import type { TrainStationType } from "./types/trainStationTypes";
import ChoiceCity from "./components/common/ChoiceCity";
import ChoiceMap from "./components/common/ChoiceMap";

function App() {
  const [data, setData] = useState<TrainStationType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const cities = await getCities();
        setData(cities);
      } catch (err) {
        console.error(err);
        setError("Failed to load cities. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-10/12 mx-auto mt-10 text-center">
        <p className="text-lg font-medium animate-pulse">
          Loading cities...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-10/12 mx-auto mt-10 text-center text-red-500">
        <p className="text-lg font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-10/12 mx-auto mt-10">
      <div className="flex flex-col gap-5">
        <ChoiceCity cities={data} />
        <ChoiceMap data={data} />
      </div>
    </div>
  );
}

export default App;
