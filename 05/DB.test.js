// ./DC.test.js

import DB from './DB';

// Scenario

// 1. Dodawanie rekoród (insert) i aytomatyczne ID. 

// 2. Błędy przy duplikowaniu lub złym typie ID. 

// 3. Pobieranie rekordów (select) i błędy przy braku. 

// 4. Aktualizowanie rekordów (udpade) i obsługa błędów. 

// 5. Usuwanie rekrodów (remove) i błędy przy braku. 

// 6. Czyszczenie tabeli (truncate).

// 7. Pobieranie wszystkich rekordów (getRows).


// Scenario 

// S.1. Add rekord insert and auto ID

describe('DB class', () => {

    let dataBase

    beforeEach(() => {
        dataBase = new DB()
    })

    test('Add rekord insert and auto ID', async() => {

        const data = { name: 'Adam' }
        const result = await dataBase.insert(data)

        expect(result).toHaveProperty('id')
        expect(result.name).toBe('Adam')

        const allRows = await dataBase.getRows()
        expect(allRows.length).toBe(1)

    })


    // S.2. duplicate id

    test('Duplicate id', async() =>{

        await dataBase.insert({ id: 1, name: 'Adam' })

        await expect(dataBase.insert({ id: 1, name: 'Piort' }))
            .rejects.toBe("ID can\'t be duplicated!")
    })


    // S.3. non-number id

    test('Non-number id', async() => {
        
        await expect(dataBase.insert({ id: 'wasd', name: 'Adam'}))
            .rejects.toBe("ID can be only number!")

    })

    // S.4. select and update id record

    test('Select and update id record', async() =>{
        
        const added = await dataBase.insert({ name: 'Adam'})
        const newUpdate = await dataBase.select(added.id)

        expect(newUpdate).toEqual(added)
    })

    // S.5. when not found id

    test('Not found id', async() => {
        await expect(dataBase.select(99999)).rejects.toBe("ID not found")
    })

    // S.5.1 update modiufies an existing record

    test('Update modiufies an existing record', async() =>{

        const added = await dataBase.insert({ name: 'Jan'})
        const newUpdate = { id: added.id, name: 'Janusz'}

        const update = await dataBase.update(newUpdate)
        expect(update.name).toBe('Janusz')

        const dataPost = await dataBase.update(newUpdate)
        expect(dataPost.name).toBe('Janusz') 
    })

    // S.5.2 update rejects if id not set

    test('Update reject if id not set', async() =>{
        await expect(dataBase.update({ name: 'Piotr'}))
        .rejects.toBe('ID have to be set!')
    })

    // S.5.3 update rejects if id not found

    test('Update rejects if id not found', async() =>{
        await expect(dataBase.update({ id: 123, name: 'Piort'}))
        .rejects.toBe('ID not found!')
    })

    // S.5.4 remove rejects if item doesn't exist

    test('Remove rejects if item doesnt exist', async() =>{
        await expect(dataBase.remove(99999)).rejects.toBe('Item not exist!')
    })

    // S.6. truncate clears all records

    test('Truncate clears all records', async() =>{
        
        await dataBase.insert({ name: 'Krystian'})
        await dataBase.insert({ name: 'Kamila'})
        await dataBase.insert({ name: 'Iga'})
        await dataBase.insert({ name: 'Anastazja'})

        const result = await dataBase.truncate()
        expect(result).toBe(true)

        const allRows = await dataBase.getRows()
        expect(allRows.length).toBe(0)
    })


    // S.7. getRows return all current records

    test('GetRows return all current records', async() => {
        const piterName = await dataBase.insert({ name: 'Piotr'})
        const adamName = await dataBase.insert({ name: 'Adam'})

        const rows = await dataBase.getRows()
        expect(rows).toEqual([piterName, adamName])
    })

})



