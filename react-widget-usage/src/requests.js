import axios from "axios";

export const serviceEnvUrl = (uri) => {
    return 'http://ec2-44-201-101-203.compute-1.amazonaws.com/api/'+ uri;
}

export const serverTokenRequest = async () => {
    try {
        return axios.post( serviceEnvUrl('v1/auth'), {
            "clientId": "time-shuffle-admin",
            "clientSecret": "0015427bb7c34c3e843c60d2739f1b41"
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
