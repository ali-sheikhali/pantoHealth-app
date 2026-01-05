import { useCitiesStore } from "../../store/useCitiesStore"
import type { TrainStationType } from "../../types/trainStationTypes";

interface ChoiceMapProps {
  data: TrainStationType[];
}

export default function ChoiceMap({data}:ChoiceMapProps) {

    const selectedCity = useCitiesStore(state => state.selectedCity)

    console.log("data:" , data);
    
   const stationOfCity = data.filter((station) => {
  return station.city === selectedCity
})

    console.log("stationOfCity" , stationOfCity);
    

    return(
        <div>
            {selectedCity}
          
        </div>
    )
}