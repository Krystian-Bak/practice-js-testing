import randomNumber from './app';

describe('randomNumber', () =>{

    test('Zwraca 1 w przedziale od 1-1', () => {
        
        const number = randomNumber(1, 1)
        expect(number).toBe(1)

    })
    
    test('Zwraca liczbę w przedziale 1-10', () => {
    
        const number = randomNumber(1, 10)
        expect(number).toBeGreaterThanOrEqual(1)
        expect(number).toBeLessThanOrEqual(10)

    })

    test('Zwraca 0 w przedziale od 0-0', () => {
        
        const number = randomNumber(0, 0)
        expect(number).toBe(0)

    })

    test('Zwraca liczbę całkowią', () => {
    
        const number = randomNumber(5, 15)
        expect(Number.isInteger(number)).toBe(true)

    })

    test('Przyjmuje ujene wartości', () => {
    
        const number = randomNumber(-10, -1)
        expect(number).toBeGreaterThanOrEqual(-10)
        expect(number).toBeLessThanOrEqual(-1)

    })

    test('Zwraca błąd gdy min jest większy od max', () =>{
        expect(() => randomNumber(5,2).toThrow('min nie może przyjmować wartości mniejszą od max'))
    })

    test('Argumenty nie bądące liczbami', () =>{
        expect(() => randomNumber('a', 5)).toThrow('min i max muszą być liczbami')
        expect(() => randomNumber(5, 'a')).toThrow('min i max muszą być liczbami')
        expect(() => randomNumber('a', 'b')).toThrow('min i max muszą być liczbami')
    })

    test('Liczba w wybranym przedziale', () => {

        for(let i=0; i < 20; i++){
            const number = randomNumber(10, 20)
            expect(number).toBeGreaterThanOrEqual(10)
            expect(number).toBeLessThanOrEqual(20)
        }

    })

})
