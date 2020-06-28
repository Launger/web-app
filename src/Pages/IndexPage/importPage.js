import React from "react";
import { Link } from "react-router-dom";

import Classic from "Components/Widgets/d27154EFDbCa05654074E41a8d542b53/Card";
import Trending from "Components/Widgets/Ee0Dff7436cD4009676a908cEfD6cd5C/Card";
import Random from "Components/Widgets/1d9fE1cfbEE45b15edba3fBd5b528F7B/Card";
import Navbar from "Components/NavBar/NavBar";

import logoWhite from "./logo-white.svg";
import logoBeta from "./logo(beta).svg";
import pointSystem from "./point-system.svg";
import step1 from "./step-1-image.svg";
import step2 from "./step-2-image.svg";
import step3 from "./step-3-image.svg";
import welcomeScreen from "./welcome-screen.svg";
import launch from "./Launch.png";
import YouTube from "./YouTube.png";
import TikTok from "./TikTok.svg";
import Reddit from "./Reddit.svg";
import config from "Utils/RemoteConfig";
import "./IndexPage.css";

const IndexPage = () => {
  return (
    <div className="IndexPage">
      <Navbar />
      <div className="page-content">
        <div className="container">
          <section id="welcome" className="row">
            <div id="welcome-box" className="col-lg-6">
              <h1>
                {config
                  .getValue("welcomeText")
                  .asString()
                  .split("\n")
                  .map((item, key) => {
                    return (
                      <span key={key}>
                        {item}
                        <br />
                      </span>
                    );
                  })}
              </h1>
              <p>
                {config.getValue("welcomeSubText").asString()} <Link to="/signup">Sign up,</Link> it's free!
              </p>
              <a id="try-btn" href="#try-now" className="btn">
                Start now
              </a>
            </div>
            <img src={welcomeScreen} id="illustration" className="col-lg-6" alt="Person happy infront of a computer" />
          </section>
        </div>
        <section id="how-it-works">
          <div className="container">
            <div className="logos">
              <img className="YouTube" src={YouTube} alt="YouTube Logo" />
              <img className="TikTok" src={TikTok} alt="TikTok Logo" />
              <img className="Reddit" src={Reddit} alt="Reddit Logo" />
              <span className="more">MORE...</span>
            </div>
            <div className="content">
              <h1>How it works</h1>
              <p>
                It’s simple, your work is split up into multiple sessions with breaks in between. You first work 25 minutes, then have a 5-minute
                break where you can enjoy all kinds of entertainment on Youtube, TikTok, Instagram, Facebook, and much more.
              </p>
            </div>
          </div>
          <div id="steps">
            <div className="container">
              <div className="row">
                <div className="col-md-4" id="step1">
                  <div className="steps">
                    <h3>Step 1</h3>
                    <p>
                      Choosing time! <br />
                      Choose your mode of work, and go on to step 2.
                    </p>
                    <img src={step1} alt="step 1 illustration" />
                  </div>
                </div>
                <div className="col-md-4 mx-0" id="step2">
                  <div className="steps">
                    <h3>Step 2</h3>
                    <p>
                      Working time! <br />
                      You have 25 minutes to complete all you can and earn points.
                    </p>
                    <img src={step2} alt="step 1 illustration" />
                  </div>
                </div>
                <div className="col-md-4" id="step3">
                  <div className="steps">
                    <h3>Step 3</h3>
                    <p>
                      Breaking time! <br />
                      You have 5 minutes to splurge on the content you choose on step 1.
                    </p>
                    <img src={step3} alt="step 1 illustration" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-7 point-system">
                  <h1>Launger Points</h1>
                  <p>
                    You EARN points for every minute you spend working on your work.
                    <br />
                    <br />
                    These points can then be redeemed for more widgets, such as being able to play a custom YouTube playlist.
                    <br />
                    <br />
                    You can find out how many points a widget costs and how many points per minute (PPM) it will give you, by hoverying over the
                    feature.
                  </p>
                </div>
                <img src={pointSystem} className="col-md-5" alt="Illustration of the point system" />
              </div>
            </div>
          </div>
        </section>
        <div className="logo-seperator">
          <img src={logoWhite} alt="Launger logo" />
          <span> The more productive you are, the better your rewards</span>
        </div>
        <div className="container">
          <section id="try-now">
            <div className="right-text">
              <h1>Try it out</h1>
              <h2>Choose your mode</h2>
              <span>Hover of a feature to get more information</span> <Link to="/browse">More here!</Link>
            </div>
            <div className="widgets">
              <div className="widget">
                <Classic alreadyGot />
              </div>
              <div className="widget">
                <Trending alreadyGot />
              </div>
              <div></div>
              <div className="widget">
                <Random alreadyGot />
              </div>
            </div>
            <img src={launch} className="superman" alt="Superman-like figure launching himself" />
          </section>
        </div>
        <div className="seperator">
          <div className="container">
            <h1>More coming soon...</h1>
          </div>
        </div>
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

export default IndexPage;
