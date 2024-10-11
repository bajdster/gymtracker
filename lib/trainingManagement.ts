
interface trainingDetails {
    date: string;
    trainingType: string;
    repsState: [];
    selectedExercise:string;
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