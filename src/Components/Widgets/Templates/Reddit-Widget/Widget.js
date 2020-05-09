import React from "react";
import PropTypes from "prop-types";

import "./Widget.css";

const RedditWidgetTemplate = ({listing}) => {
  /*
  post {
    title          
    permalink    // link for open in reddit
    created_utc  // time post was submitted
    author       // author.name if using snoowrap
    score        // num of upvotes
    num_comments 
    url          // link to image
  }
  */

  return (
    <div className="RedditWidgetTemplate">
      {listing.map(({title, permalink, url, created_utc, author, score, num_comments}) => {
        return (
          <a href={permalink} target="_blank" rel="noopener noreferrer">
            <div className="header">
              <h1 className="title">{title}</h1>
              {author || <h4>{author}</h4>}
            </div>
            <div className="body">
              {url || <img className="image" src={url} alt={`${title}`} />}
            </div>
            <div className="footer">
              {score || <span className="score">{score}</span>}
              {num_comments || <span className="comments">{num_comments}</span>}
              {created_utc || <span className="date">{created_utc}</span>}
              <a href={permalink} target="_blank" rel="noopener noreferrer">Open in Reddit</a>
            </div>
          </a>
        )
      })}
    </div>
  );
};

RedditWidgetTemplate.propTypes = {
  listing: PropTypes.array,
}

export default RedditWidgetTemplate;
