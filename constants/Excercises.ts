
const exercises:{} = {
    chest: [
      "Wyciskanie sztangi na ławce poziomej",
      "Wyciskanie hantli na ławce skośnej",
      "Rozpiętki na wyciągu (brama)",
      "Rozpiętki na ławce",
      "Rozpiętki na maszynie",
      "Wyciskanie sztangi na ławce skośnej"
    ],
    back: [
      "Podciąganie na drążku",
      "Ściąganie drążka nachwytem do klatki",
      "Martwy ciąg",
      "Wiosłowanie hantlami",
      "Wiosłowanie końcem sztangi w opadzie tułowia",
      "Unoszenie tułowia na ławce rzymskiej"
    ],
    shoulder: [
      "Wyciskanie sztangi nad głowę stojąc",
      "Arnoldki -  wyciskanie hantli nad głowę z rotacją",
      "Unoszenie hantli w bok",
      "Unoszenie hantli nad głowę klasyczne",
      "Wyciskanie sztangi na maszynie smitha siedząc"
    ],
    triceps: [
        "Wyciskanie sztangi francuskie w leżeniu",
        "Wyciskanie hantli francuskie w leżeniu",
        "Prostowanie ramion z linką wyciągu górnego",
        "Pompki na poręczach",
        "Pompki w podporze tyłem",
        "Prostowanie ręki z hantlem w podparciu o ławkę"
    ],
    legs: [
      "Przysiady ze sztangą/hantlem",
      "Wykroki z hantlami",
      "Martwy ciąg",
      "Wypychanie suwnicy leżąc",
      "Wyprosty kolan na maszynie siedząc",
      "Przywodzenie/Odwodzenie nóg na maszynie",
      "Żuraw",
      "Wnosy na łydkach"
    ],
    biceps:[
        "Unoszenie hantli stylem młotkowym",
        "Modlitewnik ze sztangą",
        "Modlitewnik na maszynie",
        "Wznosy hantli z rotacją siedząc",
        "Zginanie ramion ze sztangą łamaną stojąc",
        "Zginanie przedramion z drążkiem wyciągu dolnego"
    ],
    abs:[
        "Brzuszki z blokowaniem nóg",
        "Brzuszki na maszynie",
        "Unoszenie prostych nóg do drążka",
        "Russian twist",
        "Rowerek"
    ],
    pullups:[
        "Podciąganie na drążku nachwytem",
        "Podciąganie na drążku podchwytem"
    ],
    running:[
        "Bieg 1km",
        "Bieg 3km",
        "Bieg 5km",
        "Bieg 6km",
        "Bieg 10km",
    ]

  };


    interface Training {
      trainingType:string,
      text: string,
      imageUrl: any
    }
  
    export const trainings: Training[] = [
      {
        trainingType: 'chest',
        text:'Klatka',
        imageUrl: require("../assets/images/chest.png") // bezpośrednie użycie require
      },
      {
        trainingType: 'back',
        text:'Plecy',
        imageUrl: require("../assets/images/back.png")
      },
      {
        trainingType: 'shoulder',
        text:'Barki',
        imageUrl: require("../assets/images/shoulder.png")
      },
      {
        trainingType: 'triceps',
        text:'Triceps',
        imageUrl: require("../assets/images/tricep.png")
      },
      {
        trainingType: 'legs',
        text:'Nogi',
        imageUrl: require("../assets/images/leg.png")
      },
      {
        trainingType: 'biceps',
        text:'Biceps',
        imageUrl: require("../assets/images/muscle.png")
      },
      {
        trainingType: 'abs',
        text:'Brzuch',
        imageUrl: require("../assets/images/abs.png")
      },
      {
        trainingType: 'pullups',
        text:'Drążek',
        imageUrl: require("../assets/images/pullups.png")
      },
      {
        trainingType: 'running',
        text:'Bieganie',
        imageUrl: require("../assets/images/running.png")
      },
    ]

    export function getTrainingsNames(engName:string)
    {
      switch(engName){
        case "chest":
            return "Klatka";
        case "back":
            return "Plecy";
        case "shoulder":
            return "Barki";
        case "legs":
            return "Nogi";
        case "biceps":
            return "Biceps";
        case "triceps":
            return "Triceps";
        case "abs":
            return "Brzuch";
        case 'pullups':
            return 'Drążek';
        case "running":
            return 'Bieganie';
    }
    }
  
  
  export default exercises;
  