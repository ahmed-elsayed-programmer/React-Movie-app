import React from 'react';
import { Link } from 'react-router-dom';
import { OutlineButton } from '../components/button/Button';
import HeroSlide from '../components/hero-slide/HeroSlide';
import MovieList from '../components/movie-list/MovieList';

import { categgory, movieType, tvType } from '../api/tmdbApi';

function Home() {
  return <>
    <HeroSlide />
    <div className="container">
      <div className="section mb-3">
        <div className="section_header mb-2">
          <h2>Trending Movies </h2>
          <Link to='/movie'>
            <OutlineButton className='small'>View More</OutlineButton>
          </Link>
        </div>
        <MovieList categgory={categgory.movie} type={movieType.popular} />
      </div>
      <div className="section mb-3">
        <div className="section_header mb-2">
          <h2>to rate Movies </h2>
          <Link to='/movie'>
            <OutlineButton className='small'>View More</OutlineButton>
          </Link>
        </div>
        <MovieList categgory={categgory.movie} type={movieType.top_rated} />
      </div>

      <div className="section mb-3">
        <div className="section_header mb-2">
          <h2>Trending Tv </h2>
          <Link to='/movie'>
            <OutlineButton className='small'>View More</OutlineButton>
          </Link>
        </div>
        <MovieList categgory={categgory.tv} type={tvType.popular} />
      </div>

      <div className="section mb-3">
        <div className="section_header mb-2">
          <h2>to rate TV </h2>
          <Link to='/movie'>
            <OutlineButton className='small'>View More</OutlineButton>
          </Link>
        </div>
        <MovieList categgory={categgory.tv} type={tvType.top_rated} />
      </div>



    </div>
  </>;
}

export default Home;
