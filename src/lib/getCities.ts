export const getCities = async () => {
  const API_URL =
    "https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw/train-stations.json";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch stations");
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error("not get cities:", error);
    throw error; 
  }
};
