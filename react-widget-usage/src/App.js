import './App.css';
import {Box, Button, Container, FormGroup, Grid, Paper, TextField} from "@mui/material";
import Widget from "./Widget";
import {clientTokenRequest, serverTokenRequest} from "./requests";
import {useEffect, useState} from "react";

function App() {

    const [serverToken, setServerToken] = useState('');
    const [bearerToken, setBearerToken] = useState('');
    const [loadWidget, setLoadWidget] = useState(false);
    const [playerId, setPlayerId] = useState('00000000-0000-0000-0000-000000000002');



    const handleChanges = (e) => {
        setPlayerId(e.target.value)
    }

    const serverTokenRequestAction = async () => {

        if(serverToken && bearerToken){
            setServerToken('');
            setBearerToken('');
            setLoadWidget(false);
        }

        serverTokenRequest().then((response) => {
            console.info(response, 'serverTokenRequest');
            setServerToken(response?.accessToken)
        });
    }

    const clientTokenRequestAction = async () => {
        clientTokenRequest(playerId, serverToken).then((response) => {
            console.log(response, 'clientTokenRequest');
            setBearerToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbi10eXBlIjoiY2xpZW50LXRva2VuIiwiZ2FtZS1pZCI6ImFhMDljMDdmLWRiNGYtNDU2ZC04ZTQ3LTVlZmQ2Mzg3NDFkZCIsInBsYXllci1pZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMiIsInBsYXllci11dWlkIjoiZmJjZDQyMWYtMTE1NC00NDA5LTgwOGMtNjQ1OTRhMzliNDA0Iiwic3ViIjoiSldUU2VydmljZUFjY2Vzc1Rva2VuIiwianRpIjoiNGI3MWRlOGMtNTVlYy00Y2IyLTk3M2UtZjNiZTQxOWUzYTAxIiwiaWF0IjoiNC4xMC4yMDIyINCzLiAxMDozNDo0MyIsImV4cCI6MTY2NDg3OTgwMywiaXNzIjoiSldUQXV0aGVudGljYXRpb25TZXJ2ZXIiLCJhdWQiOiJKV1RTZXJ2aWNlUG9zdG1hbkNsaWVudCJ9.2MfV8AAirYfqhoJuHj0RUoeSeVJD7brg8b_yq2exQHU')
        });
    }

    const loadWidgetAction = () => {
        setLoadWidget(true);
    }

    return (<div className="App">
        <Container maxWidth="sm">
            <Grid container>
                <Grid item xs={12}>
                    <Paper elevation={0}>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': {m: 1,},
                            }}
                            noValidate
                            autoComplete="off">
                            <FormGroup>
                                <Button color={'error'}  variant="contained" size={'small'} onClick={serverTokenRequestAction}>Request
                                    new server token</Button>
                            </FormGroup> <FormGroup>
                            <TextField onChange={handleChanges} disabled={!serverToken} id="player-id" label="Player Id GUID" variant="outlined"
                                       defaultValue={playerId}/>
                        </FormGroup> <FormGroup>
                            <Button color={'warning'}  disabled={!serverToken} onClick={clientTokenRequestAction} variant="contained" size={'small'}>Request new client token</Button>
                        </FormGroup> <FormGroup>
                            <Button color={'success'} disabled={(!serverToken || !bearerToken)} onClick={loadWidgetAction} variant="contained" size={'small'}>Load the widget</Button>
                        </FormGroup>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
        <Container maxWidth={'xl'}>
            <Grid container>
                <Grid item xs={12}>
                    {!!loadWidget && <Widget playedId={playerId} bearerToken={bearerToken} serverToken={serverToken}/>}
                </Grid>
            </Grid>
        </Container>

    </div>);
}

export default App;
