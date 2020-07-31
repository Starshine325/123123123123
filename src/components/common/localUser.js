const KEY = 'delivery_locker_List'

const local ={
    setList(list){
        localStorage.setItem(KEY,JSON.stringify(list))
    },
    getList(){
        list = localStorage.getItem(KEY)     
        return JSON.parse(list)
    },
    delList(){
        localStorage.removeItem(KEY)
    }
}

export default local