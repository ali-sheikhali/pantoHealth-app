import { useCitiesStore } from "../../store/useCitiesStore";
import type { TrainStationType } from "../../types/trainStationTypes";

interface ChoiceCityProps {
  cities: TrainStationType[];
}

export default function ChoiceCity({ cities }: ChoiceCityProps) {
  const selectedCity = useCitiesStore((state) => state.selectedCity);
  const setSelectedCity = useCitiesStore((state) => state.setSelectedCity);

  const uniqueCities = Array.from(new Set(cities.map((city) => city.city)));

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  const handleClearFilter = () => {
    setSelectedCity("");
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row  md:justify-between md:items-center">
      <select className="w-full md:w-50 bg-gray-300 rounded-md px-4 py-1 focus:outline-none border border-gray-700" value={selectedCity ?? ""} onChange={handleChange}>
        <option className="" value="" disabled>
          choice city
        </option>

        {uniqueCities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <button
        onClick={handleClearFilter}
        className="bg-blue-600 hover:bg-blue-400 text-white px-4 py-1 rounded-md cursor-pointer"
      >
        clear filter
      </button>
    </div>
  );
}
