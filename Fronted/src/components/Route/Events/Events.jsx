import React from "react";

import EventCard from "./EventCard";
import styles from "../../../styles/Styles";
import { useSelector } from "react-redux";
import Loader from "../../Layout/Loader";
const Events = () => {
  const { allEvents, isloading } = useSelector((state) => state.events);
  // console.log("allEvents", allEvents);

  return (
    <div>
      {isloading ? (
        <Loader />
      ) : (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>
          <div className="w-full grid">
            <EventCard data={allEvents && allEvents[0]} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
