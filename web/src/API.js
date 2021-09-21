import {makeAutoObservable, runInAction} from "mobx";

const baseUrl = process.env.NODE_ENV === 'development' ?  "http://localhost:8080/":"http://localhost:8080/"; //Check if dev environment
class KamelStore {
    Kamels = [{name:"Henter data", age:""}];

    constructor(props) {
        makeAutoObservable(this,{},{autoBind:true});
        this.fetchKamels();
    }

    async fetchKamels (){
        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(baseUrl+"rest/kamels", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                this.Kamels=JSON.parse(result);
            })
            .catch(error => {console.log('error', error)
                this.Kamels=[{name:"Kan ikke hente data", age:""}];});
    }
    async addKamel(name, age){
        var myHeaders = new Headers();
        const newKamel = {name, age}
        console.log(newKamel);
        var requestOptions = {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newKamel)
        };
        fetch(baseUrl+"rest/kamels", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                this.fetchKamels()
            })
            .catch(error => console.log('error', error));
    }
}
export const Kamels = new KamelStore();