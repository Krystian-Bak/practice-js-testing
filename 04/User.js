export default class User {

    constructor({
        email = '', 
        password = ''} = {}){ // zabezpiecznie przed undefined TypeError 
        this.setEmail(email)
        this.setPassword(password)
    }
    

    setEmail(email){
        if(!this.validEmail(email)){
            throw new Error('Invalid email')
        }
        
        this.email = email
    }

    setPassword(password){
        if(!this.validPassword(password)){
            throw new Error('Invalid passowrd')
        }
        this.password = password
    }

    getEmail(){
        return this.email
    }

    getPassword(){
        return this.password
    }

    validEmail(email){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return typeof email === 'string' && regex.test(email)
    }

    validPassword(passowrd){
        return typeof passowrd == 'string' && passowrd.length >= 6
    }

    login(){
        return this.email.includes('devmentor.pl')
    }


}
