import axios from "axios";

export const serviceEnvUrl = (uri) => {
    return 'http://ec2-44-201-101-203.compute-1.amazonaws.com/api/'+ uri;
}

export const serverTokenRequest = async () => {
    try {
        return axios.post( serviceEnvUrl('v1/auth'), {
            "clientId": "dragon-race-server",
            "clientSecret": "9vhm4ow4siekf2b8dix5zr3u7mldufdinuallal9jo1kq6r8"
        },{}).then((response) => {
            return response.data;
        })
    } catch (e) {
        console.error(e);
    }
}

export const clientTokenRequest = async (playerId,accessToken) => {
    return axios.post( serviceEnvUrl('v1/auth'), {
        "playerId": playerId
    },{
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }).then((response) => {
        console.log(1232131312)
        return response.data;
    })
}
