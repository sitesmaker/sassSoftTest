import {defineStore} from 'pinia';

interface ILabel {
    text: string;
  }
  
interface IUsers {
    id: number,
    label: ILabel[],
    labelInput: string,
    type: string,
    login: string,
    password: string | null,
}

export const useAppStore = defineStore('app', {
    state: () => ({
        users: [] as IUsers[],
    }),
    actions: {
        addNewUser():void {
            this.users.push({
                id: this.users.length + 1,
                label: [{text: ''}],
                type: '',
                login: '',
                password: '',
            } as IUsers)
        },
        deleteUser(id:number) {
            this.users = this.users.filter(user => user.id != id)
        },
        saveCurrentUsers():void {
            const resultArr = this.users.map(({labelInput, ...rest}) => rest)
            localStorage.setItem('users', JSON.stringify(resultArr));
        },
        getCurrentUsers():void {
            const storedUsers = localStorage.getItem('users');
            if (storedUsers) {
              this.users = JSON.parse(storedUsers);
            }
        }
    },
    getters: {},
})