import React, { useEffect, useState, useRef } from 'react'

import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from "swiper/react";

import Button, { OutlineButton } from "../button/Button";
import Modal, { ModalContent } from "../modal/Modal";


import tmdbApi, { categgory, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";


import './hero-slide.scss'
import { useHistory } from 'react-router-dom';

const HeroSlide = props => {

  SwiperCore.use([Autoplay])

  const [movieitems, setMovieitems] = useState([])

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1, api_key: apiConfig.apiKey }
      try {
        const response = await tmdbApi.getMovieList(movieType.popular, { params })
        setMovieitems(response.results.slice(0, 6))
      } catch {
        console.log('error');
      }
    }

    getMovies();

  }, [])

  return (
    <div className='hero-slide' >
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
      // autoplay={{ delay: 4000 }}
      >
        {
          movieitems.map((item, i) => (
            <SwiperSlide key={i}>
              {({ isActive }) => (
                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
              )}
            </SwiperSlide>
          ))
        }

      </Swiper>
      {
        movieitems.map((item, i) => <TrailerModal key={i} item={item} />)
      }
    </div>
  )
}

const HeroSlideItem = props => {
  let history = useHistory()

  const item = props.item;

  const backgrund = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);
    const videos = await tmdbApi.getVideos(categgory.movie, item.id)

    if (videos.results.length > 0) {
      const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
      modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc);

    } else {

      modal.querySelector('.modal__content').innerHTML = 'No trailer';

    }
    modal.classList.toggle('active')
  }

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${backgrund})` }}
    >
      <div className="hero-slide__item__content containter">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview} </div>
          <div className="btns">
            <Button onClick={() => history.push('/movie/' + item.id)}>
              Watch now
            </Button>
            <OutlineButton onClick={setModalActive}>
              watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  )
}

const TrailerModal = props => {
  const item = props.item;

  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute('src', '')

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe src={iframeRef} width='100%' height='500px' title='trailer'></iframe>
      </ModalContent>
    </Modal>
  )
}

export default HeroSlide;