import { MeasurementProps } from "@/types/types";

interface trainingDetails {
    date: string;
    trainingType: string;
    repsState: [];
    selectedExercise:string;
  }

  interface RepsState {
    weight: number;
    reps: number;   
  }
  
  interface Training {
    date: string;
    id: string;
    repsState: RepsState[]; 
    selectedExercise: string;
    trainingType: string;
  }
  

export async function sendTrainingToDB(trainingData:trainingDetails)
{
    try
    {
        const response = await fetch("https://gymtracker-c5f99-default-rtdb.firebaseio.com/trainings.json", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(trainingData),
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log("Trening został zapisany z ID: ", responseData.name); // responseData.name to unikalny ID wygenerowany przez Firebase
          } else {
            console.error("Błąd podczas zapisywania treningu:", response.status);
          }
    }
    catch(error)
    {
        console.error("Wystąpił błąd:", error);
    }

}

export async function fetchHistoryShortTrainings()
{
  const response = await fetch('https://gymtracker-c5f99-default-rtdb.firebaseio.com/trainings.json?orderBy=%22date%22&limitToLast=20');
  return response
}

export async function fetchAllTrainings()
{
  try {
    const response = await fetch('https://gymtracker-c5f99-default-rtdb.firebaseio.com/trainings.json');
    const data = await response.json();

    if (typeof data === 'object' && data !== null) {
      const trainingsArray: Training[] = Object.keys(data).map((key) => ({
        id: key,
        ...data[key]
      }));

      return trainingsArray
    } else {
      console.error("Unexpected data format:", data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

//need to adjust this to data from Measurement Component
export async function sendMeasurementToDB(measurementData:MeasurementProps)
{
    try
    {
        const response = await fetch("https://gymtracker-c5f99-default-rtdb.firebaseio.com/measurement.json", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(measurementData),
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log("Pomiary zostały zapisane z ID: ", responseData.name); 
          } else {
            console.error("Błąd podczas zapisywania pomiarów:", response.status);
          }
    }
    catch(error)
    {
        console.error("Wystąpił błąd:", error);
    }

}

export async function fetchAllMeasurements()
{
  try {
    const response = await fetch('https://gymtracker-c5f99-default-rtdb.firebaseio.com/measurement.json');
    const data = await response.json();

    if (typeof data === 'object' && data !== null) {
      const measurementsArray: MeasurementProps = Object.keys(data).map((key) => ({
        id: key,
        ...data[key]
      }));

      return measurementsArray
    } else {
      console.error("Unexpected data format:", data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function deleteTrainingFromDB(trainingId: string) {
  try {
      // Tworzymy URL z dynamicznym trainingId
      const url = `https://gymtracker-c5f99-default-rtdb.firebaseio.com/trainings/${trainingId}.json`;

      const response = await fetch(url, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (response.ok) {
          console.log(`Trening o ID ${trainingId} został usunięty.`);
      } else {
          console.error(`Błąd podczas usuwania treningu: ${response.status}`);
      }
  } catch (error) {
      console.error("Wystąpił błąd:", error);
  }
}

// Firebase Realtime Database obsługuje podstawowe filtrowanie danych przy użyciu zapytań z metodami takimi jak orderBy, equalTo, startAt, endAt oraz limitToFirst i limitToLast.

// const fetchTrainingsByType = async (trainingType: string): Promise<void> => {
//     try {
//       const response = await fetch(`https://gymtracker-c5f99-default-rtdb.firebaseio.com/trainings.json?orderBy="trainingType"&equalTo="${trainingType}"`);
  
//       if (response.ok) {
//         const data = await response.json();
//         console.log(`Treningi o typie '${trainingType}':`, data);
//         // Przetwarzanie danych, np. renderowanie w interfejsie użytkownika
//       } else {
//         console.error("Błąd podczas pobierania treningów:", response.status);
//       }
//     } catch (error) {
//       console.error("Wystąpił błąd:", error);
//     }
//   };
  

// 4. Indeksowanie pól w Firebase
// Aby przyspieszyć zapytania i zapewnić, że Firebase obsługuje filtrowanie, musisz skonfigurować indeksy. Przykładowa konfiguracja indeksu dla pola trainingType w Firebase Realtime Database:

// json
// Skopiuj kod
// {
//   "rules": {
//     ".read": true,
//     ".write": true,
//     "trainings": {
//       ".indexOn": ["trainingType", "date"]
//     }
//   }
// }