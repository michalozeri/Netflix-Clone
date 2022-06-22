import "./App.css";
import {Row} from './cmps/Row';
import{Banner} from './cmps/Banner'
import {Navbar} from './cmps/Navbar'
import requests from './services/requests.service'



function App() {
  return (
    <div className="app">
      <Navbar/>
      <Banner/>
      <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documetaries" fetchUrl={requests.fetchDocumantaries} />

    </div>
  );
}

export default App;
