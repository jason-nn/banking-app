import React, { useState, useEffect } from "react";

export default function Covid() {
    const [country, setCountry] = useState();
    const [confirmed, setConfirmed] = useState();
    const [recovered, setRecovered] = useState();
    const [deaths, setDeaths] = useState();

    useEffect(() => {
        fetch("https://covid-api.mmediagroup.fr/v1/cases?country=Philippines")
            .then((response) => response.json())
            .then((data) => {
                const allData = data["All"];
                setCountry(allData["country"]);
                setConfirmed(allData["confirmed"]);
                setRecovered(allData["recovered"]);
                setDeaths(allData["deaths"]);
            });
    }, []);

    return (
        <>
            <h1>{country}</h1>
            <br />
            <p>Confirmed: {confirmed}</p>
            <br />
            <p>Recovered: {recovered}</p>
            <br />
            <p>Deaths: {deaths}</p>
        </>
    );
}
