import './App.css';
import {Alert, Box, Button, Container, FormGroup, Grid, Paper, Snackbar, TextField} from "@mui/material";
import Widget from "./Widget";
import {clientTokenRequest, serverTokenRequest} from "./requests";
import React, {useEffect, useState} from "react";
import {useJwt} from "react-jwt";

const sxStyle = {
    root: {
        '& .MuiFormGroup-root': {margin: '10px 0'},
        '& .MuiButton-root': {height: '56px'}
    },
    fields: {
        marginBottom: '20px'
    }
}

function App() {

    const [serverToken, setServerToken] = useState('');
    const [bearerToken, setBearerToken] = useState('');
    const [loadWidget, setLoadWidget] = useState(false);
    const [open, setOpen] = useState(false);
    const {isExpired} = useJwt(serverToken);
    const [state, setState] = useState({
        clientId: 'dragon-race-server',
        clientSecret: '9vhm4ow4siekf2b8dix5zr3u7mldufdinuallal9jo1kq6r8',
        playerId: '00000000-0000-0000-0000-000000000002',
    })

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    useEffect(() => {
        if(isExpired && serverToken !== ''){
            setOpen(true);
            setLoadWidget(false);
        }

    },[isExpired]);

    const handleChanges = (e) => {
        setState(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }

    const serverTokenRequestAction = async () => {

        if (serverToken && bearerToken) {
            setLoadWidget(false);
        }
        serverTokenRequest(state.clientId, state.clientSecret).then((response) => {
            console.info(response, 'serverTokenRequest');
            setServerToken(response?.accessToken)
            setBearerToken('');
        });
    }

    const clientTokenRequestAction = async () => {
        clientTokenRequest(state.playerId, serverToken).then((response) => {
            console.log(response, 'clientTokenRequest');
            //we are setting an invalid token to the state to simulate the post message events flow
            setBearerToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbi10eXBlIjoiY2xpZW50LXRva2VuIiwiZ2FtZS1pZCI6ImFhMDljMDdmLWRiNGYtNDU2ZC04ZTQ3LTVlZmQ2Mzg3NDFkZCIsInBsYXllci1pZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMiIsInBsYXllci11dWlkIjoiZmJjZDQyMWYtMTE1NC00NDA5LTgwOGMtNjQ1OTRhMzliNDA0Iiwic3ViIjoiSldUU2VydmljZUFjY2Vzc1Rva2VuIiwianRpIjoiNGI3MWRlOGMtNTVlYy00Y2IyLTk3M2UtZjNiZTQxOWUzYTAxIiwiaWF0IjoiNC4xMC4yMDIyINCzLiAxMDozNDo0MyIsImV4cCI6MTY2NDg3OTgwMywiaXNzIjoiSldUQXV0aGVudGljYXRpb25TZXJ2ZXIiLCJhdWQiOiJKV1RTZXJ2aWNlUG9zdG1hbkNsaWVudCJ9.2MfV8AAirYfqhoJuHj0RUoeSeVJD7brg8b_yq2exQHU')
        });
    }

    const loadWidgetAction = () => {
        setLoadWidget(true);
    }

    return (
        <div className="App">
            <Container maxWidth="md" sx={sxStyle.root}>
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
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <FormGroup>
                                            <TextField onChange={handleChanges}
                                                       disabled={!!serverToken} id="client-id"
                                                       name={'clientId'}
                                                       label="Client id" variant="outlined"
                                                       defaultValue={state.clientId}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <TextField onChange={handleChanges}
                                                       disabled={!serverToken || (!!serverToken && !!bearerToken)}
                                                       name={'playerId'}
                                                       id="player-id"
                                                       label="Player Id GUID" variant="outlined"
                                                       defaultValue={state.playerId}/>
                                        </FormGroup>

                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormGroup>
                                            <TextField onChange={handleChanges}
                                                       disabled={!!serverToken} id="client-secret"
                                                         name={'clientSecret'}
                                                       label="Client secret" variant="outlined"
                                                       defaultValue={state.clientSecret}/>
                                        </FormGroup>

                                        <FormGroup>
                                            <Button color={'warning'}
                                                    disabled={!serverToken || (!!serverToken && !!bearerToken)}
                                                    onClick={clientTokenRequestAction}
                                                    variant="contained" >Request new client token</Button>
                                        </FormGroup>

                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormGroup>
                                            <Button color={'error'} variant="contained"
                                                    onClick={serverTokenRequestAction}>Request
                                                new server token</Button>
                                        </FormGroup>
                                        <FormGroup>
                                            <Button color={'success'}
                                                    disabled={(!serverToken || !bearerToken) || loadWidget === true}
                                                    onClick={loadWidgetAction} variant="contained" >Load
                                                the
                                                widget</Button>
                                        </FormGroup>
                                    </Grid>

                                </Grid>

                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Grid container>
                <Grid item xs={12}>
                    {!!loadWidget &&
                        <Widget playedId={state.playerId} bearerToken={bearerToken} serverToken={serverToken}/>}
                </Grid>
            </Grid>
            <Snackbar open={open} anchorOrigin={{ vertical:  'top', horizontal : 'center'}} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error"  sx={{width: '100%'}}>
                    You server token has expired. Please update it.
                </Alert>
            </Snackbar>
        </div>);
}

export default App;
