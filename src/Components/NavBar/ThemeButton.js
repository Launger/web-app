import React from "react";
import { useLocalStore } from "../../Utils/Hooks";

const ThemeButton = () => {
  const [theme] = useLocalStore("theme");

  if(theme === "light") 
    return (
      <svg className="moon-icon" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="22" fill="blue"/>
      <circle cx="22" cy="22" r="22" fill="url(#moon0_linear)"/>
      <path d="M23.0369 20.6471L23.723 19.9196L23.723 19.9196L23.0369 20.6471ZM32.1159 19.4427C29.7717 21.9284 26.013 22.0792 23.723 19.9196L22.3508 21.3746C25.5081 24.3522 30.5304 24.0389 33.5709 20.8149L32.1159 19.4427ZM32.4781 20.3892C32.4926 20.6084 32.5 20.8296 32.5 21.0526H34.5C34.5 20.7854 34.4911 20.52 34.4737 20.2568L32.4781 20.3892ZM32.5 21.0526C32.5 26.5879 27.9277 31.1053 22.25 31.1053V33.1053C28.9987 33.1053 34.5 27.7257 34.5 21.0526H32.5ZM22.25 31.1053C16.5723 31.1053 12 26.5879 12 21.0526H10C10 27.7257 15.5013 33.1053 22.25 33.1053V31.1053ZM12 21.0526C12 15.5173 16.5723 11 22.25 11V9C15.5013 9 10 14.3795 10 21.0526H12ZM22.25 11C22.3879 11 22.5251 11.0027 22.6615 11.0079L22.7388 9.00943C22.5766 9.00316 22.4136 9 22.25 9V11ZM23.723 19.9196C21.433 17.76 21.3635 13.9988 23.7076 11.5132L22.2526 10.141C19.2121 13.365 19.1934 18.397 22.3508 21.3746L23.723 19.9196ZM22.6615 11.0079C22.3838 10.9972 22.1999 10.7948 22.1442 10.6243C22.0943 10.4714 22.1193 10.2823 22.2526 10.141L23.7076 11.5132C24.1173 11.0787 24.2037 10.4882 24.0453 10.0033C23.8812 9.50072 23.4191 9.03573 22.7388 9.00943L22.6615 11.0079ZM33.5709 20.8149C33.3975 20.9987 33.15 21.0422 32.9491 20.9829C32.7332 20.9192 32.4992 20.7077 32.4781 20.3892L34.4737 20.2568C34.4319 19.6267 33.9888 19.2045 33.5153 19.0647C33.057 18.9294 32.5035 19.0316 32.1159 19.4427L33.5709 20.8149Z" fill="white"/>
      <defs>
      <linearGradient id="moon0_linear" x1="22" y1="0" x2="22" y2="44" gradientUnits="userSpaceOnUse">
      <stop stopColor="#FFAE34"/>
      <stop offset="1" stopColor="#F94E83"/>
      </linearGradient>
      </defs>
      </svg>
    )
  else 
    return (
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
    )
}

export default ThemeButton;