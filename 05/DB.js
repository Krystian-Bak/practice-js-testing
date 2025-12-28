export default class DB {
    constructor() {
        this._rows = [];
    }

    insert(data) {
        return new Promise((resolve, reject) => {
            if(data.id) {
                if(typeof data.id !== 'number') {
                    this.async(reject,'ID can be only number!');
                    return null; // stop function
                } else if(this._rows.some(item => item.id === data.id)) {
                    this.async(reject, 'ID can\'t be duplicated!');
                    return null; // stop function
                }
            }

            this.async(() => {
                if(!data.id) { // ustawia automatycznie id 
                    data.id = this._rows.reduce((acc, item) => {
                        return acc <= item.id ? item.id + 1 : acc;
                    }, 1);
                }

                this._rows.push(data); // dodaje rekord
                resolve(data)
            }); 
        });
    }

    select(id) { // 1 rekord po id
        return new Promise((resolve, reject) => {
            this.async(() => {
                const [row = null] = this._rows.filter(item => item.id === id);
                if(row) {
                    resolve(row);
                } else {
                    reject('ID not found');
                }
            });
        });
    }

    remove(id) { // usuwa
        return new Promise((resolve, reject) => {
            this.async(() => {
                const lengthBeforeFilter = this._rows.length;
                this._rows = this._rows.filter(item => item.id !== id);
                const lengthAfterFilter = this._rows.length;
                
                if(lengthBeforeFilter === lengthAfterFilter) {
                    reject('Item not exist!');
                } else {
                    resolve('Item was remove!');
                }
            });
        });
    }

    update(data) { // aktualizacja po id
        return new Promise((resolve, reject) => {
            if(!data.id) { // id jest wymagane
                this.async(reject, 'ID have to be set!');
            } else {
                this.async(() => {
                    let updated = null;
                    this._rows = this._rows.map(item => { // map zmiana po id
                        if(item.id === data.id) {
                            updated = data
                            return updated;
                        }
            
                        return item;
                    });

                    if(updated) {
                        resolve(updated); // 
                    } else {
                        reject('ID not found!');   
                    }
                });
            }
        });
    }

    truncate() {
        return new Promise(resolve => {
            this.async(() => {
                this._rows = [];
                resolve(true);
            });
            
        })
    }

    getRows() { // zwraca wszystkie rekordy
        return new Promise(resolve => {
            this.async(() => {
                resolve(this._rows);
            });
        })
    }

    async(callback, ...params) { // "tylko udaje kod asynchroniczny"
        setTimeout(() => {
            callback(...params);
        }, Math.random() * 100);
    }
}