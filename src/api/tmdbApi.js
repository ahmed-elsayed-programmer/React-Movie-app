import apiConfig from "./apiConfig";
import axiosClient from "./axioxClient";

export const categgory = {
  movie : 'movie' ,
  tv : 'tv'
}


export const movieType = {
  upcoming : 'upcoming',
  popular : 'popular' ,
  top_rated : 'top_rated'
}


export const tvType = {
  popular : 'popular' ,
  top_rated : 'top_rated',
  on_the_air : 'on_the_air' 
}

export const tmdbApi = {
  getMovieList : (type , params ) => {
    const url = 'movie/'+ movieType[type] ;
    return axiosClient.get(url , params )
  },
  getTvList :(type , params ) => {
    const url = 'tv/' + tvType[type] ;
    return axiosClient.get(url , params )
  }, 
  getVideos : (cate , id ) =>  {
    const url = categgory[cate] + '/' + id + '/videos'
    return axiosClient.get(url , {params : {api_key : apiConfig.apiKey}})
  },
  search : (cate , params) =>  {
    const url = 'search/' + categgory[cate] ;
    return axiosClient.get(url ,params )
  },
  detail : (cate , id , params) =>  {
    const url =   categgory[cate] + '/' + id  ;
    return axiosClient.get(url ,params )
  },
  credits : (cate , id ) =>  {
    const url =   categgory[cate] + '/' + id +'/credits' ;
    return axiosClient.get(url ,{params : {api_key : apiConfig.apiKey}} )
  },
  similar : (cate , id ) =>  {
    const url =   categgory[cate] + '/' + id +'/similar' ;
    return axiosClient.get(url ,{params :{api_key : apiConfig.apiKey}} )
  }


}

export default tmdbApi ;

