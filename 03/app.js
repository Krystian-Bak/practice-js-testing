export default function randomNumber(min, max) {
 
 // if (min > max) throw new Error('min musi przyjmować wartość mniejszą od max')
 //   return Math.floor(Math.random() * (max - min + 1)) + min

    if(typeof min !== 'number' || typeof max !== 'number'){

        throw new Error('min i max muszą być liczbami')

    }

    if(min > max) throw new Error('min musi przyjmować wartość mniejszą od max')
    
        const number = Math.floor(Math.random()*(max - min +1) + min) 

    if(number < min || number > max){

            throw new Error('Wylosowana liczba jest poza wybranym przedziałem')
        }

    return number

}