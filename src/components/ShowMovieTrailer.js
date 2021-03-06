import React, { useState, useEffect } from "react";
import facade from "../apiFacade";

export function ShowMovieTrailer({ title, apiKey }) {
    const [trailer, setTrailer] = useState();

    useEffect(() => {
        let shouldFetch = true;
        if (shouldFetch) {
            facade.getMovieTrailer(title, apiKey).then((data) => {
                let trailerId = data.items[0].id.videoId;
                setTrailer("https://www.youtube.com/embed/" + trailerId);
            });
        }
        return () => shouldFetch = false;
    }, [title, apiKey]);

    return (
        <iframe title={title} width="560" height="315" src={trailer} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
        </iframe>
    );
}