import React from 'react'
import Header from '../components/Layout/Header'
import EventCard from '../components/Route/Events/EventCard'

const EventsPage = () => {
  return (
    <div>
        <Header/>
        <EventCard active={true}/>
        <EventCard active={true}/>
    </div>
  )
}

export default EventsPage