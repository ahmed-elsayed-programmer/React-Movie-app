import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import './movie-list.scss'

import { Swiper, SwiperSlide } from "swiper/react";

import MovieCard from '../movie-card/MovieCard'


import tmdbApi, { categgory } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';


const MovieList = props => {

  const [items, setItem] = useState([])

  useEffect(() => {
    const getList = async () => {

      let response = null;
      const params = { api_key: apiConfig.apiKey }


      if (props.type !== 'similar') {
        switch (props.categgory) {
          case categgory.movie :
            response = await tmdbApi.getMovieList(props.type, { params })
            break;
          default:
            response = await tmdbApi.getTvList(props.type, { params })

        }
      } else {
        response = await tmdbApi.similar(props.categgory, props.id)
      }

      setItem(response.results)
    }

    getList()

  },[] )


  return (
    <div className='movie-list'>
      <Swiper
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={'auto'}
      >
        {
          items.map((item, i) => (
            <SwiperSlide key={i}>
            <MovieCard item={item} categgory={props.categgory}/>
            </SwiperSlide>
          ))
        }
      </Swiper>

    </div>
  )
}

MovieList.propTypes = {
  categgory: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,

}

export default MovieList