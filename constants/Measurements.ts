
export default function measurementNames(measure:string){
    switch(measure){
        case "arm":
            return "Ramię";
        case "chest":
            return "Klatka";
        case "forearm":
            return "Przedramię";
        case "height":
            return "Wysokość";
        case "hips":
            return "Biodra";
        case "thigh":
            return "Udo";
        case "waist":
            return "Talia";
        case 'weight':
            return 'Waga';
        case "bmi":
            return 'BMI';
    }

}
