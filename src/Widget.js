import React, {useEffect, useRef, useState} from 'react';
import {Box, LinearProgress} from "@mui/material";
import {clientTokenRequest} from "./requests";

Widget.propTypes = {};

const sxStyle = {

    iframe: {
        width: '100%', height: '850px'
    }
}

function Widget({playedId, bearerToken, serverToken, isExpired}) {
    const iframe = useRef();
    const baseWidgetUrl = 'http://coingamers-widget-2.s3-website.eu-central-1.amazonaws.com/wallets-and-balances';
    const [fullURL, setFullUrl] = useState('');
    let eventListener = null;


    useEffect(() => {

        if (playedId && serverToken && !eventListener) {
            eventListener = true;

            window.addEventListener('message', function (e) {
                //The message will be sent from the widget to the parent window.
                if (e.data.expiredToken) {
                    console.warn('Token expired');
                    //The token has expired, and you should send a new valid token through a postMessage with property token.
                    clientTokenRequest(playedId, serverToken).then((response) => {
                        if (!isExpired) {
                            iframe.current.contentWindow.postMessage({token: response?.accessToken}, '*');
                        }
                    });
                }
            }, false);
        }

        return () => {
            window.removeEventListener('message', function (e) {
                e.stopPropagation();
            });
        }
    }, [playedId, serverToken]);

    useEffect(() => {
        if (bearerToken) {
            setFullUrl(`${baseWidgetUrl}?token=${bearerToken}`)
        }
    }, [bearerToken]);

    return (<>
        {fullURL ? <iframe ref={iframe} title={'widget'} style={sxStyle.iframe} src={fullURL} frameBorder="0"/> :
            <Box sx={{width: '100%'}}>
                <LinearProgress/>
            </Box>}
    </>)
}

export default Widget;