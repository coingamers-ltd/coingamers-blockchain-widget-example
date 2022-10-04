import './App.css';
import {Box, Button, Container, FormGroup, Grid, Paper, Stack, TextField} from "@mui/material";
import Widget from "./Widget";
import {clientTokenRequest, serverTokenRequest} from "./requests";
import {useEffect, useState} from "react";

function App() {

    const [serverTokenData, setServerTokenData] = useState('');
    const [bearerToken, setBearerToken] = useState('');
    const [loadWidget, setLoadWidget] = useState(false);
    const [playerId, setPlayerId] = useState('00000000-0000-0000-0000-000000000002');


    const handleChanges = (e) => {
        setPlayerId(e.target.value)
    }

    const serverTokenRequestAction = async () => {

        if(serverTokenData && bearerToken){
            setServerTokenData('');
            setBearerToken('');
            setLoadWidget(false);
        }

        serverTokenRequest().then((response) => {
            console.info(response)
            setServerTokenData(response)
        });
    }

    const clientTokenRequestAction = async () => {
        clientTokenRequest(playerId, serverTokenData?.accessToken).then((response) => {
            console.info(response)
            setBearerToken(response?.accessToken)
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
                            <TextField onChange={handleChanges} disabled={!serverTokenData} id="player-id" label="Player Id GUID" variant="outlined"
                                       defaultValue={playerId}/>
                        </FormGroup> <FormGroup>
                            <Button color={'warning'}  disabled={!serverTokenData} onClick={clientTokenRequestAction} variant="contained" size={'small'}>Request new client token</Button>
                        </FormGroup> <FormGroup>
                            <Button color={'success'} disabled={(!serverTokenData || !bearerToken)} onClick={loadWidgetAction} variant="contained" size={'small'}>Load the widget</Button>
                        </FormGroup>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
        <Container maxWidth={'xl'}>
            <Grid container>
                <Grid item xs={12}>
                    {!!loadWidget && <Widget bearerToken={bearerToken}/>}
                </Grid>
            </Grid>
        </Container>

    </div>);
}

export default App;
