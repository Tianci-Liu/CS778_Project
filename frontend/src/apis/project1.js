import Ajax from '../ajax';

let alg_host = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3100/api' : '/api'
let com_host = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8088/api' : '/api'

class project1Router {
    sendToAlg = (user_input) => {
        let url = `${alg_host}/page1/submit`
        return Ajax.post(url, {...user_input})
    }

    sendToComBack = (data) => {
        let url = `${com_host}/project1/newdata`
        Ajax.post(url, data).then(req => {
            // console.log(url)
            // console.log(req)
            alert('Submit success!')
        })
    }
}

export default new project1Router();
