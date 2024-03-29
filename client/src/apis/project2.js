import Ajax from '../ajax';

let alg_host = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3100/api' : '/api'
let com_host = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8088/api' : '/api'

class project1Router {
    sendToAlg = (user_input) => {
        let url = `${com_host}/project2/mockdata`
        return Ajax.post(url, {...user_input})
    }

    sendToComBack = (data) => {
        let url = `${com_host}/project2/newdata`
        Ajax.post(url, data).then(req => {
            console.log(url)
            console.log(req)
           // alert('Submit success!')
        })
    }
}

export default new project1Router();
