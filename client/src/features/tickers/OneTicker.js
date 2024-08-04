import React from 'react';
import { Box, TableCell, TableRow } from '@mui/material';

const OneTicker = ({ ticker }) => {
    return (
        <TableRow hover sx={{ cursor: 'pointer' }}>
            <TableCell>{ticker.type}</TableCell>
            <TableCell align="right">{ticker.symbol}</TableCell>
            <TableCell align="right">{ticker.date}</TableCell>
            <TableCell align="right">{ticker.high}</TableCell>
            <TableCell align="right">{ticker.low}</TableCell>
            <TableCell align="right">{ticker.open}</TableCell>
            <TableCell align="right">{ticker.close}</TableCell>
            <TableCell align="right">{ticker.volume}</TableCell>
        </TableRow>
    );
};

export default OneTicker;
