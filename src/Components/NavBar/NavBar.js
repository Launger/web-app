import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useStore } from "react-hookstore";
import firebase from "firebase/app";

import { updateFireStorePoints } from "../../Helpers";
import "./NavBar.css";

const NavBar = ({ Timer, Points, history }) => {
  const [theme, setTheme] = useStore("theme");
  const [loggedIn, setLoggedIn] = useStore("loggedIn");
  const [, setPoints] = useStore("points");
  const [sPoints, setSPoints] = useStore("sPoints");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      // eslint-disable-next-line
    } else if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
    // console.log("toggled theme");
  };

  const handleLogout = () => {
    const auth = firebase.auth();
    updateFireStorePoints(sPoints)
      .then(() => {
        sessionStorage.clear();
        // console.log(res);
        return auth.signOut();
      })
      .then(() => {
        // console.log(res2);
        setLoggedIn(false);
        localStorage.setItem("loggedIn", false);
        setSPoints(0);
        setPoints({ totalPoints: 0 });
        history.push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="NavBar">
      <nav className={`navbar navbar-expand-md navbar-${theme}`}>
        <Link to="/" className="navbar-brand">
          <svg id="logo" width="138" height="42" viewBox="0 0 138 42" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="105.5" y="9.5" width="32" height="13" rx="2.5" stroke="#838383"/><path d="M109.775 20C109.602 20 109.462 19.96 109.355 19.88C109.255 19.8 109.205 19.7033 109.205 19.59V13.1C109.205 12.9667 109.265 12.8667 109.385 12.8C109.505 12.7267 109.635 12.69 109.775 12.69H111.715C112.055 12.69 112.379 12.74 112.685 12.84C112.992 12.9333 113.242 13.1067 113.435 13.36C113.629 13.6133 113.725 13.9767 113.725 14.45C113.725 14.8567 113.649 15.1967 113.495 15.47C113.342 15.7367 113.135 15.9267 112.875 16.04C113.182 16.16 113.429 16.3367 113.615 16.57C113.809 16.8033 113.905 17.17 113.905 17.67V17.88C113.905 18.4 113.815 18.8167 113.635 19.13C113.455 19.4367 113.215 19.66 112.915 19.8C112.615 19.9333 112.279 20 111.905 20H109.775ZM110.505 18.86H111.625C111.932 18.86 112.172 18.7733 112.345 18.6C112.519 18.4267 112.605 18.15 112.605 17.77V17.61C112.605 17.2167 112.519 16.9433 112.345 16.79C112.172 16.63 111.932 16.55 111.625 16.55H110.505V18.86ZM110.505 15.53H111.625C111.892 15.53 112.092 15.45 112.225 15.29C112.359 15.13 112.425 14.9233 112.425 14.67C112.425 14.41 112.352 14.2067 112.205 14.06C112.065 13.9067 111.869 13.83 111.615 13.83H110.505V15.53ZM116.891 20C116.751 20 116.621 19.9667 116.501 19.9C116.381 19.8267 116.321 19.72 116.321 19.58V13.1C116.321 12.9667 116.381 12.8667 116.501 12.8C116.621 12.7267 116.751 12.69 116.891 12.69H120.451C120.597 12.69 120.701 12.75 120.761 12.87C120.827 12.99 120.861 13.1167 120.861 13.25C120.861 13.41 120.824 13.5467 120.751 13.66C120.684 13.7733 120.584 13.83 120.451 13.83H117.621V15.83H119.141C119.274 15.83 119.374 15.8833 119.441 15.99C119.514 16.0967 119.551 16.2167 119.551 16.35C119.551 16.4633 119.517 16.5767 119.451 16.69C119.391 16.7967 119.287 16.85 119.141 16.85H117.621V18.86H120.451C120.584 18.86 120.684 18.9167 120.751 19.03C120.824 19.1433 120.861 19.28 120.861 19.44C120.861 19.5733 120.827 19.7 120.761 19.82C120.701 19.94 120.597 20 120.451 20H116.891ZM125.143 20C124.977 20 124.827 19.9667 124.693 19.9C124.56 19.8267 124.493 19.72 124.493 19.58V13.86H123.023C122.897 13.86 122.797 13.8033 122.723 13.69C122.65 13.57 122.613 13.43 122.613 13.27C122.613 13.13 122.647 13 122.713 12.88C122.78 12.7533 122.883 12.69 123.023 12.69H127.253C127.393 12.69 127.497 12.7533 127.563 12.88C127.63 13 127.663 13.13 127.663 13.27C127.663 13.43 127.627 13.57 127.553 13.69C127.487 13.8033 127.387 13.86 127.253 13.86H125.793V19.58C125.793 19.72 125.723 19.8267 125.583 19.9C125.45 19.9667 125.303 20 125.143 20ZM129.562 20C129.442 20 129.319 19.9767 129.192 19.93C129.066 19.8833 128.959 19.82 128.872 19.74C128.786 19.66 128.742 19.5667 128.742 19.46C128.742 19.44 128.746 19.4067 128.752 19.36L130.682 13.07C130.729 12.9233 130.832 12.8133 130.992 12.74C131.159 12.6667 131.336 12.63 131.522 12.63C131.709 12.63 131.882 12.6667 132.042 12.74C132.209 12.8133 132.316 12.9233 132.362 13.07L134.292 19.36C134.306 19.4067 134.312 19.44 134.312 19.46C134.312 19.5667 134.266 19.66 134.172 19.74C134.086 19.82 133.979 19.8833 133.852 19.93C133.726 19.9767 133.602 20 133.482 20C133.376 20 133.282 19.98 133.202 19.94C133.129 19.9 133.079 19.8333 133.052 19.74L132.672 18.41H130.372L130.002 19.74C129.976 19.8333 129.922 19.9 129.842 19.94C129.762 19.98 129.669 20 129.562 20ZM130.652 17.39H132.392L131.522 14.32L130.652 17.39Z" fill="#838383"/><path d="M6.984 36.196C5.304 35.788 4.056 34.384 3.24 31.984C3.216 31.84 3.204 31.552 3.204 31.12C3.204 30.52 3.228 29.932 3.276 29.356C3.324 28.756 3.384 28.408 3.456 28.312C3.528 28.264 3.564 28.12 3.564 27.88C3.54 27.736 3.624 27.34 3.816 26.692C3.984 26.26 4.032 25.888 3.96 25.576C3.984 25.528 4.02 25.444 4.068 25.324C4.14 25.204 4.224 25.084 4.32 24.964C4.44 24.844 4.5 24.724 4.5 24.604C4.524 24.46 4.524 24.364 4.5 24.316V24.28C4.5 24.184 4.524 24.064 4.572 23.92C4.644 23.752 4.716 23.62 4.788 23.524C4.86 23.452 4.92 23.356 4.968 23.236C5.04 23.116 5.088 23.032 5.112 22.984C5.136 22.816 5.316 22.288 5.652 21.4C6.012 20.488 6.252 19.936 6.372 19.744V19.672C6.468 19.432 6.6 19.18 6.768 18.916C6.816 18.58 6.984 18.112 7.272 17.512C7.824 16.288 8.592 14.884 9.576 13.3C10.584 11.692 11.376 10.612 11.952 10.06C12.576 9.34 13.14 8.98 13.644 8.98C13.908 8.98 14.148 9.088 14.364 9.304C14.532 9.472 14.664 9.712 14.76 10.024C14.88 10.336 14.94 10.612 14.94 10.852C14.94 11.188 14.844 11.368 14.652 11.392C14.412 11.56 14.04 12.052 13.536 12.868C13.056 13.684 12.408 14.836 11.592 16.324L11.052 17.332C10.74 18.004 10.464 18.568 10.224 19.024C10.008 19.48 9.864 19.78 9.792 19.924L9.648 20.248C9.072 21.472 8.532 22.792 8.028 24.208C7.908 24.352 7.824 24.508 7.776 24.676C7.752 24.82 7.74 24.916 7.74 24.964C7.692 24.94 7.644 25.012 7.596 25.18C7.572 25.324 7.536 25.456 7.488 25.576C7.32 25.72 7.236 26.068 7.236 26.62C7.02 27.196 6.828 27.916 6.66 28.78C6.492 29.644 6.408 30.352 6.408 30.904C6.408 31.432 6.492 31.864 6.66 32.2C6.852 32.536 7.14 32.788 7.524 32.956C8.1 33.244 8.532 33.388 8.82 33.388C8.988 33.412 9.24 33.4 9.576 33.352C9.936 33.304 10.344 33.244 10.8 33.172H10.764C10.884 33.148 11.544 33.004 12.744 32.74C13.32 32.668 13.8 32.56 14.184 32.416C14.376 32.368 14.64 32.296 14.976 32.2C15.336 32.08 15.6 32.02 15.768 32.02C15.936 31.996 16.056 32.008 16.128 32.056C16.272 32.2 16.404 32.404 16.524 32.668C16.668 32.908 16.704 33.124 16.632 33.316C16.584 33.436 16.332 33.688 15.876 34.072C15.42 34.48 14.916 34.864 14.364 35.224C13.812 35.584 13.332 35.824 12.924 35.944C12.108 36.304 10.932 36.484 9.396 36.484C8.316 36.484 7.512 36.388 6.984 36.196ZM19.7921 33.244C19.7201 33.1 19.5161 32.908 19.1801 32.668C18.8441 32.428 18.6761 32.284 18.6761 32.236C18.6761 32.14 18.6161 32.008 18.4961 31.84C18.4001 31.648 18.3041 31.48 18.2081 31.336C18.0161 31.144 18.1481 30.52 18.6041 29.464C19.0601 28.408 19.6721 27.16 20.4401 25.72C20.5841 25.576 20.7641 25.324 20.9801 24.964C21.2201 24.604 21.3761 24.4 21.4481 24.352C21.4481 24.256 21.4841 24.172 21.5561 24.1C21.6281 24.004 21.7121 23.956 21.8081 23.956L22.0961 23.38C22.1921 23.164 22.6601 22.648 23.5001 21.832C24.3401 21.016 25.0001 20.464 25.4801 20.176C25.9361 19.864 26.4281 19.708 26.9561 19.708C27.5321 19.708 28.0241 19.876 28.4321 20.212L29.4041 21.04C30.1241 21.64 30.5321 21.988 30.6281 22.084L31.9601 23.272L31.3481 25.072C31.1321 25.72 31.0241 26.332 31.0241 26.908C31.0241 27.82 31.2761 28.672 31.7801 29.464C31.9001 29.728 32.0561 29.932 32.2481 30.076C32.4641 30.22 32.7401 30.316 33.0761 30.364C33.6041 30.46 33.8681 30.724 33.8681 31.156C33.8681 31.684 33.7721 32.08 33.5801 32.344C33.3881 32.608 33.1601 32.776 32.8961 32.848C32.5121 32.896 32.2481 32.92 32.1041 32.92C31.4081 32.92 30.7721 32.74 30.1961 32.38C29.6201 32.02 29.1161 31.408 28.6841 30.544C28.5881 30.4 28.4561 30.136 28.2881 29.752C28.1441 29.368 28.0601 29.104 28.0361 28.96C27.8681 29.2 27.5921 29.512 27.2081 29.896C24.7361 32.392 22.7321 33.64 21.1961 33.64C20.6681 33.64 20.2001 33.508 19.7921 33.244ZM21.7721 30.256C22.1561 30.304 22.9001 29.872 24.0041 28.96C24.1241 28.864 24.2561 28.756 24.4001 28.636C24.5441 28.492 24.7001 28.348 24.8681 28.204C25.5401 27.652 26.0561 27.196 26.4161 26.836C26.8001 26.452 27.1841 25.996 27.5681 25.468L28.3601 24.172C28.1201 23.644 27.9041 23.296 27.7121 23.128C27.5201 22.936 27.3281 22.84 27.1361 22.84C26.6561 22.84 26.0561 23.272 25.3361 24.136C24.6161 24.976 23.7521 26.26 22.7441 27.988C22.4801 28.42 22.2641 28.876 22.0961 29.356C21.9281 29.812 21.8201 30.112 21.7721 30.256ZM43.7425 34.216C43.5745 34.312 43.3465 34.276 43.0585 34.108C42.7945 33.94 42.5305 33.688 42.2665 33.352C42.0745 33.04 41.9425 32.74 41.8705 32.452C41.7985 32.14 41.7625 31.696 41.7625 31.12L41.7985 30.292C41.7985 30.076 41.7625 29.968 41.6905 29.968C41.6185 29.968 41.4505 30.088 41.1865 30.328C40.9465 30.544 40.6345 30.832 40.2505 31.192C39.5305 31.888 38.9185 32.428 38.4145 32.812C37.9345 33.172 37.5385 33.34 37.2265 33.316C36.9625 33.316 36.5905 33.088 36.1105 32.632C35.6305 32.152 35.3065 31.696 35.1385 31.264C35.0665 30.976 35.0305 30.652 35.0305 30.292C35.0305 29.188 35.2705 27.844 35.7505 26.26C36.2305 24.676 36.7945 23.308 37.4425 22.156C38.0905 20.98 38.6305 20.416 39.0625 20.464C39.4465 20.512 39.7825 20.704 40.0705 21.04C40.3825 21.352 40.6345 21.736 40.8265 22.192C40.8985 22.336 40.9345 22.456 40.9345 22.552C40.9345 22.72 40.8385 22.888 40.6465 23.056C40.2865 23.536 39.8305 24.328 39.2785 25.432C38.7265 26.512 38.2825 27.508 37.9465 28.42C37.6105 29.308 37.5265 29.752 37.6945 29.752C38.0305 29.752 38.3305 29.668 38.5945 29.5C38.8825 29.332 39.2545 29.032 39.7105 28.6C40.5745 27.736 41.4145 26.632 42.2305 25.288C43.2385 23.68 43.7905 22.744 43.8865 22.48L44.2825 21.76C44.5225 21.28 44.7025 20.968 44.8225 20.824C44.9425 20.656 45.0865 20.548 45.2545 20.5H46.0825C46.2265 20.524 46.3945 20.632 46.5865 20.824C46.8025 20.92 47.0065 21.052 47.1985 21.22C47.3905 21.388 47.4865 21.532 47.4865 21.652L46.9105 22.984L46.5865 23.74C45.9385 25.18 45.4465 26.332 45.1105 27.196C44.7745 28.036 44.5225 28.912 44.3545 29.824C44.3305 29.944 44.3185 30.148 44.3185 30.436C44.3185 31.156 44.3905 31.66 44.5345 31.948C44.7505 32.38 44.9665 32.692 45.1825 32.884C45.3745 33.028 45.3745 33.208 45.1825 33.424C44.9905 33.616 44.7145 33.796 44.3545 33.964C44.0185 34.132 43.8145 34.216 43.7425 34.216ZM60.6308 33.136C59.1188 33.088 58.3628 32.236 58.3628 30.58C58.3628 30.124 58.3988 29.68 58.4708 29.248C58.5188 28.72 58.5428 28.348 58.5428 28.132V27.952V27.556C58.4708 27.076 58.3148 26.836 58.0748 26.836C57.6428 26.836 56.8388 27.256 55.6628 28.096C54.5108 28.912 53.2988 29.896 52.0268 31.048C51.6428 31.456 51.3188 31.84 51.0548 32.2C50.8148 32.512 50.6348 32.704 50.5148 32.776C50.3948 32.848 50.2028 32.884 49.9388 32.884C49.6028 32.836 49.2188 32.584 48.7868 32.128C48.3548 31.672 48.0668 31.264 47.9228 30.904C47.9228 30.232 48.0428 29.596 48.2828 28.996C48.5228 28.372 48.8828 27.592 49.3628 26.656C49.5788 25.936 49.8548 25.216 50.1908 24.496C50.5508 23.656 50.8028 23.02 50.9468 22.588C51.1148 22.132 51.2228 21.664 51.2708 21.184C51.2708 21.16 51.2588 21.148 51.2348 21.148C51.2348 21.052 51.2708 20.968 51.3428 20.896C51.4148 20.824 51.4988 20.788 51.5948 20.788C51.6428 20.716 51.7868 20.68 52.0268 20.68C52.6508 20.68 53.1908 20.848 53.6468 21.184C54.1028 21.52 54.3308 22.036 54.3308 22.732C54.3308 23.092 54.2588 23.44 54.1148 23.776C53.9948 24.088 53.7548 24.616 53.3948 25.36L52.9988 26.152C52.9268 26.296 52.8188 26.512 52.6748 26.8C52.5308 27.064 52.4588 27.232 52.4588 27.304C53.0588 26.896 53.7668 26.356 54.5828 25.684C55.7828 24.724 56.7668 23.98 57.5348 23.452C58.3028 22.924 58.8668 22.66 59.2268 22.66C59.5388 22.66 59.9708 22.84 60.5228 23.2C61.0988 23.536 61.4348 23.848 61.5308 24.136C61.5308 24.304 61.5068 24.556 61.4588 24.892C61.4348 25.228 61.4108 25.528 61.3868 25.792L61.4228 26.908C61.4468 27.1 61.4588 27.388 61.4588 27.772C61.4588 28.54 61.4108 29.08 61.3148 29.392C61.3388 29.416 61.3628 29.452 61.3868 29.5C61.4108 29.548 61.4228 29.584 61.4228 29.608L61.3868 29.68C61.4108 29.92 61.5428 30.304 61.7828 30.832C62.0228 31.36 62.1428 31.648 62.1428 31.696C62.1428 31.96 61.9628 32.26 61.6028 32.596C61.2668 32.908 60.9428 33.088 60.6308 33.136ZM67.9022 41.02C67.2062 41.02 66.5102 40.828 65.8142 40.444C65.1182 40.084 64.5422 39.628 64.0862 39.076C63.6302 38.524 63.4022 38.02 63.4022 37.564C63.4022 37.108 63.4982 36.772 63.6902 36.556C63.8822 36.364 64.1222 36.268 64.4102 36.268C64.6262 36.268 64.8542 36.352 65.0942 36.52C65.3342 36.712 65.6102 36.976 65.9222 37.312C66.2342 37.624 66.5102 37.864 66.7502 38.032C66.9902 38.224 67.2182 38.32 67.4342 38.32C68.2502 38.32 68.8742 37.804 69.3062 36.772C69.7382 35.74 70.1822 34.276 70.6382 32.38L71.1422 30.22L71.2142 29.968C71.2142 29.944 71.2022 29.944 71.1782 29.968C71.1542 29.968 71.1302 29.956 71.1062 29.932C70.7222 30.22 69.9662 30.544 68.8382 30.904C67.7102 31.264 66.7622 31.444 65.9942 31.444C65.5382 31.444 65.1302 31.204 64.7702 30.724C64.4342 30.244 64.2662 29.62 64.2662 28.852V28.636C64.3142 28.54 64.5902 27.82 65.0942 26.476C65.5982 25.132 65.9702 24.484 66.2102 24.532C66.2822 24.532 66.3902 24.4 66.5342 24.136C66.7022 23.848 66.7862 23.656 66.7862 23.56C66.8102 23.488 66.9422 23.356 67.1822 23.164C67.4462 22.948 67.6502 22.78 67.7942 22.66L68.7302 21.94C69.5942 21.148 70.3622 20.56 71.0342 20.176C71.7062 19.768 72.3182 19.54 72.8702 19.492L73.2302 19.528C73.3022 19.528 73.4342 19.54 73.6262 19.564C73.8422 19.564 74.2142 19.66 74.7422 19.852C75.2702 20.068 75.8102 20.596 76.3622 21.436C76.9142 22.276 77.2142 23.008 77.2622 23.632C77.2142 24.184 77.0942 24.724 76.9022 25.252C76.7102 25.756 76.5182 26.008 76.3262 26.008C75.9902 26.008 75.7382 26.092 75.5702 26.26C75.4022 26.428 75.2462 26.704 75.1022 27.088C74.8382 27.64 74.6582 27.976 74.5622 28.096L73.9862 30.868L73.4822 33.172C73.1942 34.3 72.8942 35.26 72.5822 36.052C72.4622 36.916 72.1382 37.72 71.6102 38.464C71.1062 39.232 70.5062 39.844 69.8102 40.3C69.1382 40.756 68.5022 40.996 67.9022 41.02ZM67.7942 28.6C68.2502 28.6 68.9342 28.42 69.8462 28.06C70.7822 27.676 71.3582 27.328 71.5742 27.016C71.6942 26.872 71.9222 26.56 72.2582 26.08C72.6182 25.576 73.0142 25.192 73.4462 24.928C73.5902 24.856 73.7222 24.724 73.8422 24.532C73.9862 24.34 74.0582 24.16 74.0582 23.992V23.92C74.0342 23.824 73.9622 23.656 73.8422 23.416C73.7222 23.176 73.5422 22.948 73.3022 22.732C73.0862 22.516 72.8342 22.408 72.5462 22.408C72.3062 22.456 71.7422 22.888 70.8542 23.704C69.9902 24.52 69.1742 25.384 68.4062 26.296C67.6622 27.208 67.2902 27.844 67.2902 28.204C67.2902 28.468 67.4582 28.6 67.7942 28.6ZM80.3675 33.676C79.5755 33.364 78.9875 32.884 78.6035 32.236C78.2435 31.564 78.0635 30.7 78.0635 29.644C78.0635 29.404 78.0875 28.972 78.1355 28.348C78.1595 28.156 78.1715 27.928 78.1715 27.664C78.1715 27.256 78.1235 26.956 78.0275 26.764C77.9315 26.548 77.7635 26.332 77.5235 26.116C77.4515 26.044 77.2835 25.888 77.0195 25.648C76.7555 25.408 76.6355 25.228 76.6595 25.108V25C76.6595 24.832 76.6955 24.652 76.7675 24.46C76.8635 24.244 76.9475 24.112 77.0195 24.064C77.0915 24.04 77.2355 23.968 77.4515 23.848C77.6675 23.728 77.8355 23.692 77.9555 23.74C78.0515 23.74 78.1955 23.8 78.3875 23.92C78.6035 24.04 78.7115 24.148 78.7115 24.244C78.8555 24.532 79.2275 24.064 79.8275 22.84C80.1635 22.336 80.6195 21.844 81.1955 21.364C81.7715 20.86 82.2995 20.476 82.7795 20.212C82.9475 20.14 83.3195 20.044 83.8955 19.924C84.4955 19.78 84.9635 19.708 85.2995 19.708C85.6835 19.708 86.1275 19.864 86.6315 20.176C87.1595 20.488 87.5915 20.824 87.9275 21.184C88.4315 21.544 88.6835 22.228 88.6835 23.236C88.6835 23.836 88.5875 24.352 88.3955 24.784C88.2995 25.144 87.8195 25.696 86.9555 26.44C86.1155 27.16 85.4315 27.628 84.9035 27.844C84.3755 27.964 83.7875 28.024 83.1395 28.024C82.4915 28.024 82.0475 27.964 81.8075 27.844C81.6395 27.748 81.4955 27.796 81.3755 27.988C81.2795 28.156 81.1955 28.552 81.1235 29.176L81.0875 29.536C81.0875 29.8 81.1475 30.052 81.2675 30.292C81.4355 30.58 81.5915 30.784 81.7355 30.904C81.8795 31.024 82.0955 31.084 82.3835 31.084L82.7075 31.048C82.9715 31.024 83.2475 30.892 83.5355 30.652C83.8475 30.412 84.2075 30.088 84.6155 29.68C85.0475 29.272 85.2995 29.032 85.3715 28.96C85.4915 28.72 85.8155 28.6 86.3435 28.6C86.5595 28.6 86.8355 28.636 87.1715 28.708C87.4115 28.9 87.5315 29.14 87.5315 29.428C87.5315 29.836 87.3395 30.388 86.9555 31.084C86.8355 31.324 86.4635 31.732 85.8395 32.308C85.2395 32.884 84.7595 33.28 84.3995 33.496C83.7515 33.856 83.0315 34.036 82.2395 34.036C81.6395 34.036 81.0155 33.916 80.3675 33.676ZM83.0315 25.576C83.6075 25.432 84.0515 25.264 84.3635 25.072C84.6995 24.856 85.0835 24.448 85.5155 23.848C85.7075 23.272 85.7435 22.924 85.6235 22.804C85.4795 22.66 85.3115 22.588 85.1195 22.588C84.8795 22.588 84.5915 22.72 84.2555 22.984C84.0155 23.056 83.6795 23.284 83.2475 23.668C82.8395 24.028 82.4915 24.388 82.2035 24.748C81.9155 25.084 81.8315 25.288 81.9515 25.36C81.9035 25.432 82.0235 25.492 82.3115 25.54C82.5995 25.564 82.8395 25.576 83.0315 25.576ZM91.0589 33.46C90.8909 33.46 90.6629 33.34 90.3749 33.1C90.1109 32.86 89.9549 32.644 89.9069 32.452C89.8829 32.404 89.8709 32.296 89.8709 32.128C89.8709 31.816 90.0149 31.204 90.3029 30.292L90.5549 29.14C90.7949 28.084 91.0109 27.196 91.2029 26.476C91.2749 26.332 91.4189 25.924 91.6349 25.252C91.7789 24.724 91.9709 24.208 92.2109 23.704C92.4989 22.624 92.9549 21.556 93.5789 20.5C93.6509 20.38 93.7709 20.236 93.9389 20.068C94.1069 19.9 94.2269 19.816 94.2989 19.816C94.4429 19.672 94.6469 19.6 94.9109 19.6C95.2949 19.6 95.6429 19.732 95.9549 19.996C96.2669 20.356 96.4229 20.74 96.4229 21.148C96.4229 21.604 96.2549 22.168 95.9189 22.84C95.7269 23.368 95.4149 24.04 94.9829 24.856C94.6469 25.456 94.4429 25.852 94.3709 26.044C94.6589 25.66 95.2829 24.94 96.2429 23.884C96.5309 23.572 96.8069 23.32 97.0709 23.128C97.3349 22.912 97.7309 22.636 98.2589 22.3C98.7869 21.916 99.2069 21.652 99.5189 21.508C99.8309 21.34 100.191 21.256 100.599 21.256C100.791 21.256 100.935 21.268 101.031 21.292C101.343 21.268 101.667 21.472 102.003 21.904C102.363 22.336 102.543 22.828 102.543 23.38C102.543 23.596 102.507 23.812 102.435 24.028C102.147 23.98 101.943 23.956 101.823 23.956C101.343 23.956 100.911 24.052 100.527 24.244C100.167 24.436 99.8669 24.628 99.6269 24.82C99.3869 24.988 99.2309 25.096 99.1589 25.144C98.3189 25.696 97.3229 26.44 96.1709 27.376C95.5949 27.856 95.1629 28.276 94.8749 28.636C94.5869 28.996 94.3589 29.38 94.1909 29.788C94.1429 29.932 93.9149 30.496 93.5069 31.48C93.0989 32.44 92.7869 33.004 92.5709 33.172C92.4509 33.436 92.1389 33.568 91.6349 33.568C91.3709 33.568 91.1789 33.532 91.0589 33.46Z" fill="var(--primary-text-color, black)"/></svg>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{color: "var(--primary-text-color, black)"}}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/browse" style={{color: "var(--primary-text-color)"}}>
                Browse
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {Timer && (
              <li className="nav-link">
                <Timer />
              </li>
            )}
            {Points && (
              <li className="points nav-link">
                <Points />
              </li>
            )}
            {loggedIn ? (
              <li className=" points nav-item">
                <Link className="nav-link" onClick={handleLogout} to="#" style={{color: "var(--primary-text-color)"}}>
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li className="points nav-item">
                  <Link to="/login" className="nav-link" id="login-btn" style={{color: "var(--primary-text-color)"}}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link" id="signup-btn">
                    Sign up
                  </Link>
                </li>
              </>
            )}
            <li
              className="nav-link actionable"
              onClick={toggleTheme}
              id="theme"
            >
              {theme === "light" ? (
                // <img
                //   src={DarkIcon}
                //   alt="Dark theme icon"
                //   className="theme-icon"
                // />
                <svg className="moon-icon" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* <circle cx="22" cy="22" r="22" fill="#C4C4C4"/> */}
                <circle cx="22" cy="22" r="22" fill="url(#moon0_linear)"/>
                <path d="M23.0369 20.6471L23.723 19.9196L23.723 19.9196L23.0369 20.6471ZM32.1159 19.4427C29.7717 21.9284 26.013 22.0792 23.723 19.9196L22.3508 21.3746C25.5081 24.3522 30.5304 24.0389 33.5709 20.8149L32.1159 19.4427ZM32.4781 20.3892C32.4926 20.6084 32.5 20.8296 32.5 21.0526H34.5C34.5 20.7854 34.4911 20.52 34.4737 20.2568L32.4781 20.3892ZM32.5 21.0526C32.5 26.5879 27.9277 31.1053 22.25 31.1053V33.1053C28.9987 33.1053 34.5 27.7257 34.5 21.0526H32.5ZM22.25 31.1053C16.5723 31.1053 12 26.5879 12 21.0526H10C10 27.7257 15.5013 33.1053 22.25 33.1053V31.1053ZM12 21.0526C12 15.5173 16.5723 11 22.25 11V9C15.5013 9 10 14.3795 10 21.0526H12ZM22.25 11C22.3879 11 22.5251 11.0027 22.6615 11.0079L22.7388 9.00943C22.5766 9.00316 22.4136 9 22.25 9V11ZM23.723 19.9196C21.433 17.76 21.3635 13.9988 23.7076 11.5132L22.2526 10.141C19.2121 13.365 19.1934 18.397 22.3508 21.3746L23.723 19.9196ZM22.6615 11.0079C22.3838 10.9972 22.1999 10.7948 22.1442 10.6243C22.0943 10.4714 22.1193 10.2823 22.2526 10.141L23.7076 11.5132C24.1173 11.0787 24.2037 10.4882 24.0453 10.0033C23.8812 9.50072 23.4191 9.03573 22.7388 9.00943L22.6615 11.0079ZM33.5709 20.8149C33.3975 20.9987 33.15 21.0422 32.9491 20.9829C32.7332 20.9192 32.4992 20.7077 32.4781 20.3892L34.4737 20.2568C34.4319 19.6267 33.9888 19.2045 33.5153 19.0647C33.057 18.9294 32.5035 19.0316 32.1159 19.4427L33.5709 20.8149Z" fill="white"/>
                <defs>
                <linearGradient id="moon0_linear" x1="22" y1="0" x2="22" y2="44" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFAE34"/>
                <stop offset="1" stopColor="#F94E83"/>
                </linearGradient>
                </defs>
                </svg>
              ) : (
                <svg className="sun-icon" width="43" height="44" viewBox="0 0 43 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle id="sun-circle" cx="22" cy="22" r="22" fill="var(--primary-bg, black)"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M22 28.1017C25.3699 28.1017 28.1017 25.3699 28.1017 22C28.1017 18.6301 25.3699 15.8983 22 15.8983C18.6301 15.8983 15.8983 18.6301 15.8983 22C15.8983 25.3699 18.6301 28.1017 22 28.1017ZM22 26.0678C24.2465 26.0678 26.0678 24.2465 26.0678 22C26.0678 19.7534 24.2465 17.9322 22 17.9322C19.7534 17.9322 17.9322 19.7534 17.9322 22C17.9322 24.2465 19.7534 26.0678 22 26.0678Z" fill="url(#sun0_linear)"/>
                <path d="M20.9831 11.1186C20.9831 10.5008 21.4839 10 22.1017 10C22.7195 10 23.2204 10.5008 23.2204 11.1186V12.9492C23.2204 13.567 22.7195 14.0678 22.1017 14.0678C21.4839 14.0678 20.9831 13.567 20.9831 12.9492V11.1186Z" fill="url(#sun1_linear)"/>
                <path d="M28.9667 13.4351C29.4036 12.9982 30.1119 12.9982 30.5487 13.4351C30.9856 13.872 30.9856 14.5803 30.5487 15.0171L29.2544 16.3115C28.8175 16.7483 28.1092 16.7483 27.6724 16.3115C27.2355 15.8746 27.2355 15.1663 27.6724 14.7295L28.9667 13.4351Z" fill="url(#sun2_linear)"/>
                <path d="M31.0508 23.0169C30.433 23.0169 29.9322 22.5161 29.9322 21.8983C29.9322 21.2805 30.433 20.7796 31.0508 20.7796H32.8813C33.4992 20.7796 34 21.2805 34 21.8983C34 22.5161 33.4992 23.0169 32.8813 23.0169H31.0508Z" fill="url(#sun3_linear)"/>
                <path d="M27.6724 29.2543C27.2355 28.8175 27.2355 28.1092 27.6724 27.6723C28.1092 27.2355 28.8175 27.2355 29.2544 27.6723L30.5487 28.9667C30.9856 29.4036 30.9856 30.1118 30.5487 30.5487C30.1119 30.9856 29.4036 30.9856 28.9667 30.5487L27.6724 29.2543Z" fill="url(#sun4_linear)"/>
                <path d="M14.8392 27.6805C15.2761 27.2436 15.9844 27.2436 16.4212 27.6805C16.8581 28.1173 16.8581 28.8256 16.4212 29.2625L15.1269 30.5568C14.69 30.9937 13.9817 30.9937 13.5449 30.5568C13.108 30.12 13.108 29.4117 13.5449 28.9748L14.8392 27.6805Z" fill="url(#sun5_linear)"/>
                <path d="M11.1186 23.0169C10.5008 23.0169 10 22.5161 10 21.8983C10 21.2805 10.5008 20.7796 11.1186 20.7796H12.9492C13.567 20.7796 14.0678 21.2805 14.0678 21.8983C14.0678 22.5161 13.567 23.0169 12.9492 23.0169H11.1186Z" fill="url(#sun6_linear)"/>
                <path d="M13.4682 15.0487C13.0131 14.6309 12.9828 13.9233 13.4006 13.4682C13.8184 13.013 14.526 12.9828 14.9811 13.4006L16.3296 14.6384C16.7848 15.0562 16.815 15.7639 16.3972 16.219C15.9794 16.6741 15.2718 16.7044 14.8167 16.2866L13.4682 15.0487Z" fill="url(#sun7_linear)"/>
                <path d="M20.9831 31.0508C20.9831 30.433 21.4839 29.9322 22.1017 29.9322C22.7195 29.9322 23.2204 30.433 23.2204 31.0508V32.8813C23.2204 33.4992 22.7195 34 22.1017 34C21.4839 34 20.9831 33.4992 20.9831 32.8813V31.0508Z" fill="url(#sun8_linear)"/>
                <defs>
                <linearGradient id="sunbg_linear" x1="22" y1="0" x2="22" y2="44" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFAE34"/>
                <stop offset="1" stopColor="#F94E83"/>
                </linearGradient>
                <linearGradient id="sun0_linear" x1="22" y1="10" x2="22" y2="34" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFAE34"/>
                <stop offset="1" stopColor="#F94E83"/>
                </linearGradient>
                <linearGradient id="sun1_linear" x1="22" y1="10" x2="22" y2="34" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFAE34"/>
                <stop offset="1" stopColor="#F94E83"/>
                </linearGradient>
                <linearGradient id="sun2_linear" x1="22" y1="10" x2="22" y2="34" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFAE34"/>
                <stop offset="1" stopColor="#F94E83"/>
                </linearGradient>
                <linearGradient id="sun3_linear" x1="22" y1="10" x2="22" y2="34" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFAE34"/>
                <stop offset="1" stopColor="#F94E83"/>
                </linearGradient>
                <linearGradient id="sun4_linear" x1="22" y1="10" x2="22" y2="34" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFAE34"/>
                <stop offset="1" stopColor="#F94E83"/>
                </linearGradient>
                <linearGradient id="sun5_linear" x1="22" y1="10" x2="22" y2="34" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFAE34"/>
                <stop offset="1" stopColor="#F94E83"/>
                </linearGradient>
                <linearGradient id="sun6_linear" x1="22" y1="10" x2="22" y2="34" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFAE34"/>
                <stop offset="1" stopColor="#F94E83"/>
                </linearGradient>
                <linearGradient id="sun7_linear" x1="22" y1="10" x2="22" y2="34" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFAE34"/>
                <stop offset="1" stopColor="#F94E83"/>
                </linearGradient>
                <linearGradient id="sun8_linear" x1="22" y1="10" x2="22" y2="34" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFAE34"/>
                <stop offset="1" stopColor="#F94E83"/>
                </linearGradient>
                </defs>
                </svg>
              )}
            </li>
          </ul>
        </div>
      </nav>
      {/* NavBar color accent */}
      {/* <svg
        width="1440"
        height="69"
        viewBox="0 0 1440 69"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1380 0H0V9H1380C1413.14 9 1440 35.8629 1440 69V60C1440 26.8629 1413.14 0 1380 0Z"
          fill="url(#paint0_linear)"
        />
        <path
          fill="var(--primary-bg, white)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1440 0H1380C1413.14 0 1440 26.8629 1440 60V0Z"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="0"
            y1="0"
            x2="1440"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F7E673" />
            <stop offset="1" stopColor="#F94E83" />
          </linearGradient>
        </defs>
      </svg> */}
      <div className="color-accent">
        <div className="gradient-accent"></div>
        <svg id="corner-piece" width="66" height="69" viewBox="0 0 66 69" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M0 0H6C39.1371 0 66 26.8629 66 60V69C66 35.8629 39.1371 9 6 9H0V0Z" fill="#F94E83"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M66 0H6C39.1371 0 66 26.8629 66 60V0Z" fill="var(--primary-bg, white)"/>
        </svg>
      </div>
    </div>
  );
};

export default withRouter(NavBar);
