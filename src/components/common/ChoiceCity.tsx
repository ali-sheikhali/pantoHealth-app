import { useCitiesStore } from "../../store/useCitiesStore";
import type { TrainStationType } from "../../types/trainStationTypes";

interface ChoiceCityProps {
  cities: TrainStationType[];
}

export default function ChoiceCity({ cities }: ChoiceCityProps) {
  const setSelectedCity = useCitiesStore((state) => state.setSelectedCity);

  const uniqueCities = Array.from(new Set(cities.map((city) => city.city)));

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };
  return (
    <select defaultValue="" onChange={handleChange}>
      <option value="" disabled>
        شهر را انتخاب کنید
      </option>

      {uniqueCities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}

    </select>
  );
}
