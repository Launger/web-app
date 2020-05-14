import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useStore } from "react-hookstore";
import { EmailShareButton, EmailIcon, FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, RedditShareButton, RedditIcon, TwitterShareButton, TwitterIcon } from "react-share";

import Feature from "./Feature/Feature";
import GiveFeedback from "../../../Components/Widgets/9005d84E32Ffb03b188EaDe0B772B132/Card";
import signUpBannerIllustration from "./signUpBannerIllustration.svg";
import Navbar from "../../../Components/NavBar/NavBar";

import logoBeta from "../logo(beta).svg";
import "./BufferPage.css";


const IndexPage = ({ history }) => {
  const [loggedIn] = useStore("loggedIn");

  return (
    <div className="BufferPage">
      <Navbar />
      <div className="page-content">
        <input type="button" value="Go To Widgets" onClick={() => history.push("/browse")} className="Go-to-widgets"/>
        <section className="signup-share-banner">
          {loggedIn ? (
            <>
              <div className="left">
                <h1>Enjoying Launger?</h1>
                <h2>Share it with your friends:</h2>
                <div className="share-buttons">
                  <FacebookShareButton url="https://launger.com">
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>
                  <WhatsappShareButton url="https://launger.com">
                    <WhatsappIcon size={40} round />
                  </WhatsappShareButton>
                  {/* <FacebookMessengerShareButton url="https://launger.com">
                    <FacebookMessengerIcon size={40} round />
                  </FacebookMessengerShareButton> */}
                  <RedditShareButton url="https://launger.com">
                    <RedditIcon size={40} round bgStyle={{fill: "red"}}/>
                  </RedditShareButton>
                  <TwitterShareButton url="https://launger.com">
                    <TwitterIcon size={40} round />
                  </TwitterShareButton>
                  <EmailShareButton url="https://launger.com">
                    <EmailIcon size={40} round bgStyle={{fill: "orange"}}/>
                  </EmailShareButton>
                </div> 
                <h1>You think it can be better?</h1>
                <h2>Consider giving us feedback.</h2>
                <h3>Get 300 points per minute as a reward!</h3>
              </div>
              <div className="right">
                <GiveFeedback />
                <div className="feedbackIllustration">
                  <img src={signUpBannerIllustration} alt="Woman on a Giant Clock" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="left">
                <h1>Sign up for Launger.</h1>
                <p>All accounts are FREE!</p>
                <ul>
                  <li>Keep all your points.</li>
                  <li>Enjoy more widgets.</li>
                  <li>Get notified to work everyday.</li>
                </ul>
                <div className="signup">
                  <Link to="/signup">
                    Sign up
                  </Link>
                </div>
                <p className="have-an-account">Already have an account? <strong><Link to="/login">Log in</Link></strong></p>
              </div>
              <div className="right">
                <img src={signUpBannerIllustration} alt="Woman on a Giant Clock" />
              </div>
            </>
          )
          }
        </section>
        <section className="Features">
          <h1>Discover New Features</h1>
          <Feature
            title="Reddit Widgets"
            description={
              <>
                <ul>
                  <li>
                    <>r/memes</>
                  </li>
                  <li>
                    <>r/funny</>
                  </li>
                  <li>
                    <>r/AdviceAnimals</>
                  </li>
                  <li>
                    <>And more...</>
                  </li>
                </ul>
                <h5>Try Reddit Widgets now. (No account needed)</h5>
              </>
            }
            illustration={
              <img
                src="https://i.imgur.com/utDqY2D.gif"
                alt="illustration of timer modes"
                width="100%"
              />
            }
            right
            newLabel
          />
          <Feature
            title="Timer Modes"
            description={
              <ul>
                <li>
                  <strong>Pomodoro: </strong>Focus on your work for 25 minutes
                  and then take a 5 minute break.
                </li>
                <li>
                  <strong>Time Tracker: </strong>Track the amount you spend on
                  each of your tasks.
                </li>
                <li>
                  <strong>Speedrun: </strong> Set time limits on each task, and
                  try to finish them ASAP.
                </li>
              </ul>
            }
            illustration={
              <img
                src="https://i.imgur.com/KMYsDco.gif"
                alt="illustration of timer modes"
                width="100%"
              />
            }
            newLabel
          />
          <Feature
            title="To-do list"
            description={
              <p>
                <strong>Focus</strong> even more by writing down what you are
                working on. <br />
                <span style={{ fontWeight: "100", fontSize: "0.9em" }}>
                  <strong>Tip: </strong>Breaking down your work helps keeps
                  things organized and less stressful.
                </span>
                <br />
                <span style={{ fontWeight: "100", fontSize: "0.9em" }}>
                  <strong>Bonus: </strong>The to-do list will also keep track of
                  how much time you spend on each task.
                </span>
              </p>
            }
            illustration={
              <img
                src="https://i.imgur.com/15dNzra.gif"
                alt="illustration of todos feature"
                width="100%"
              />
            }
            right
            newLabel
          />
          <Feature 
            title="Dark Mode"
            description={
              <p>
                You can enjoy Launger in dark mode. Try it now!
                <br/>
                <span style={{ fontWeight: "100", fontSize: "0.9em" }}>
                  Work day and night without straining your eyes.
                </span>
              </p>
            }
            illustration={
              <img
                src="https://i.imgur.com/2ZUulWG.gif"
                alt="illustration of todos feature"
                width="100%"
              />
            }
          />
          <Feature
            title="More widgets"
            description={
              <p>
                You can use your points to <strong>GET</strong> more widgets.
                <br />
                If you're not sure about getting it, maybe <strong>
                  TRY
                </strong>{" "}
                it first
              </p>
            }
            illustration={
              <img
                src="https://i.imgur.com/Kd9aroh.gif"
                alt="illustration of try get feature"
                width="100%"
              />
            }
            right
          />
        </section>
        {/* <section className="Coming-soon">
          <h1>Coming Soon</h1>
          <Feature 
            title="Google docs"
            description={
              <p>
                Edit your Google Documents (Docs, Slides, Sheets, etc.)
                directly within Launger.
              </p> 
            }
            illustration={
              <img src="https://i.imgur.com/wX52f6r.png" alt="google docs feature illustration" />
            }
          />
          <h2>More coming soon...</h2>
        </section> */}
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <img src={logoBeta} id="logo" alt="Launger logo" />
              </div>
              <ul id="column1" className="columns col-md-3">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/browse">Explore</Link>
                </li>
                <li>
                  <Link to="/about">About us</Link>
                </li>
              </ul>
              <ul id="column2" className="columns col-md-3">
                <li>
                  <Link to="/">Learn more</Link>
                </li>
                <li>
                  <Link to="/">FAQ</Link>
                </li>
                <li>
                  <Link to="/contact-us">Contact us</Link>
                </li>
              </ul>
              <ul id="column3" className="columns col-md-3">
                <li>
                  <Link to="/terms">Terms of service</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy policy</Link>
                </li>
                <li>
                  <Link to="/cookies">Cookies Policy</Link>
                </li>
              </ul>
              <span>&copy; 2020 Launger</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default withRouter(IndexPage);
