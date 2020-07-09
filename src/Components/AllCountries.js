import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1000,
        margin: "0 auto",
        marginTop: 50,
        marginBottom: 100
        //flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        fontWeight:"bold",
        color: theme.palette.text.secondary,
    },
    table: {
        minWidth: 650,
        border: "10px solid rgba(0, 0, 255, 0.5)"
    },
    title: {
        color: "blue"
    },
    values: {
        color: "red"
    },
    new:{
        color:"white",
        backgroundColor:"red"
    },
    newCases:{
        backgroundColor:"Tomato",
        color:"white"
    },
    recovered:{
        color:"Green"
    }
}));

export default function AllCountries() {
    const classes = useStyles();
    const [globalData, setGlobalData] = useState([{}]);
    useEffect(() => {
        async function getData() {
            const response = await fetch("https://api.thevirustracker.com/free-api?countryTotals=ALL");
            let data = await response.json();
            setGlobalData(Object.values(Object.values(data.countryitems)[0]));
        }
        getData();
    }, [])

    if (!globalData) {
        return <CircularProgress />;
      }
      else
    return (
        <div className={classes.root}>
            <TableContainer component={Paper}>
                <Table className={classes.table} >
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="right">Country</TableCell>
                        <TableCell align="right">Total Cases</TableCell>
                        <TableCell align="right">New Cases</TableCell>
                        <TableCell align="right">Total Deaths</TableCell>
                        <TableCell align="right">New Deaths</TableCell>
                        <TableCell align="right">Total Recovered</TableCell>
                        <TableCell align="right">Active Cases</TableCell>
                        <TableCell align="right">Serious Cases</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {globalData.map((key, ind) => {
                    return (
                    <TableRow >
                         <TableCell component="th" scope="row">
                            {[ind+1]}
                        </TableCell>
                        <TableCell align="right">
                            {globalData[ind].title}
                        </TableCell>
                        <TableCell align="right">
                            {globalData[ind].total_cases}
                        </TableCell>
                        <TableCell className={classes.newCases} align="right">
                            +{globalData[ind].total_new_cases_today}
                        </TableCell>
                        <TableCell align="right">
                            {globalData[ind].total_deaths}
                        </TableCell>
                        <TableCell className={classes.new} align="right">
                            +{globalData[ind].total_new_deaths_today}
                        </TableCell>
                        <TableCell className={classes.recovered} align="right">
                            {globalData[ind].total_recovered}
                        </TableCell>
                        <TableCell align="right">
                            {globalData[ind].total_active_cases}
                        </TableCell>
                        <TableCell align="right">
                            {globalData[ind].total_serious_cases}
                        </TableCell>
                        
                    </TableRow>
                    )
                    })}
                </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
}
