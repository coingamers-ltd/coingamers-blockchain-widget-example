import axios from "axios";

export const serviceEnvUrl = (uri) => {
    return 'http://ec2-44-201-101-203.compute-1.amazonaws.com/api/'+ uri;
}

export const serverTokenRequest = async (clientId, clientSecret) => {
    return axios.post( serviceEnvUrl('v1/auth'), {
        "clientId": clientId,
        "clientSecret": clientSecret
    },{}).then((response) => {
        return response.data;
    }).catch((error) => {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            alert(error.response.data.errors[0] || error.response.data.errors.credentials);

        }else {
            console.log('Error', error.message);
        }
    });
}

export const clientTokenRequest = async (playerId,accessToken) => {
    return axios.post( serviceEnvUrl('v1/auth'), {
        "playerId": playerId
    },{
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            console.log(error.response.data.errors);
            alert(error.response.data.errors[0] || error.response.data.errors.credentials);
        }else {
            console.log('Error', error.message);
        }
    });
}
