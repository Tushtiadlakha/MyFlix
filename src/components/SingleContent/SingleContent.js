import { Badge } from "@material-ui/core";
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
      />
      {/* <img
        className="poster"
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      /> */}
      <div className="card">
          <div class="wrapper">
            <img 
            src={poster ? `${img_300}${poster}` : unavailable} 
            className="cover-image" 
            alt={title}
            />
          </div>
            <img 
            src={poster ? `${img_300}${poster}` : unavailable} 
            className="character" 
            alt={title}
            />
            
            
      </div>
      <b className="title">{title}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
    </ContentModal>
  );
};

export default SingleContent;
