import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Box, LinearProgress} from "@mui/material";

Widget.propTypes = {};

const sxStyle = {

    iframe: {
        width: '100%',
        height: '850px'
    }
}

function Widget({bearerToken}) {
    const baseUrl = 'http://localhost:3000/wallets-and-balances';
    const [fullURL, setFullUrl] = React.useState('');

    useEffect(() => {
        if (bearerToken) {
            setFullUrl(`${baseUrl}?token=${bearerToken}`)
        }
    }, [bearerToken]);

    return (
        <>
            {fullURL ? <iframe style={sxStyle.iframe} src={fullURL}  frameBorder="0"/> : <Box sx={{width: '100%'}}>
                <LinearProgress/>
            </Box>
            }
        </>
    )
}

export default Widget;