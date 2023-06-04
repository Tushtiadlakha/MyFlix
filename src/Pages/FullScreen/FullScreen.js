import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Carousel from "../../components/Carousel/Carousel";
import axios from "axios";
import "../../components/ContentModal/ContentModal.css";
import {
    img_500,
    unavailable,
    unavailableLandscape,
  } from "../../config/config";



  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      width: "90%",
      height: "80%",
      backgroundColor: "#39445a",
      border: "1px solid #282c34",
      borderRadius: 10,
      color: "white",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 1, 3),
    },
  }));

const FullScreen = () => {
  const {media_type,id} =useParams()
  const classes = useStyles();
  const [content, setContent] = useState({});
  const [video, setVideo] = useState({});
 


  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
    console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);
    return (
        <>
        <div>
        <div className={classes.paper}>
        <div className="ContentModal">
          <img
            src={
              content.poster_path
                ? `${img_500}/${content.poster_path}`
                : unavailable
            }
            alt={content.name || content.title}
            className="ContentModal__portrait"
          />
          <img
            src={
              content.backdrop_path
                ? `${img_500}/${content.backdrop_path}`
                : unavailableLandscape
            }
            alt={content.name || content.title}
            className="ContentModal__landscape"
          />
          <div className="ContentModal__about">
            <span className="ContentModal__title">
              {content.name || content.title} (
              {(
                content.first_air_date ||
                content.release_date ||
                "-----"
              ).substring(0, 4)}
              )
            </span>
            {content.tagline && (
              <i className="tagline">{content.tagline}</i>
            )}

            <span className="ContentModal__description">
              {content.overview}
            </span>

            <div>
              <Carousel id={id} media_type={media_type} />
            </div>
            <iframe width="500" height="250" src={`https://www.youtube-nocookie.com/embed/${video}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
        </div>
        
      </div>
     </div>
      </>
  )
}

export default FullScreen;