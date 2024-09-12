import React from "react";

import CountDown from "./CountDown.jsx" 
import styles from "../../../styles/Styles.jsx";

const EventCard = ({active}) => {
  return (
    <div className={`w-full bg-white block rounded-lg ${active ? "unset":"mb-12"} lg:flex p-2 `}>
      <div className="w-full lg:w-[50%] m-auto">
        <img src="https://a.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>Iphone 14Pro max 8/256gb</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum
          natus numquam, quod autem maxime, fuga inventore ad nulla eius
          eligendi quia animi tempora, ea labore nesciunt nostrum voluptates
          eos. Ad? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Dolorum natus numquam, quod autem maxime, fuga inventore ad nulla eius
          eligendi quia animi tempora, ea labore nesciunt nostrum voluptates
          eos. Ad?
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              1099$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              1000$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            120 sold
          </span>
        </div>
        <CountDown  />
        <br />
      </div>
    </div>
  );
};

export default EventCard;
