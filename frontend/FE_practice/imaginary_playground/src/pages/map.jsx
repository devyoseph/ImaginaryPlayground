import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/map.css";

import MapLion from '../components/map/Lion.jsx'
import MapDolphin from '../components/map/Dolphin.jsx'
import MapRabbit from '../components/map/Rabbit.jsx'
import MapAlien from '../components/map/Alien.jsx'
import MapSanta from '../components/map/Santa.jsx'

const Map = () => {
  const navigate = useNavigate();

  // 캔버스 각 맵에서 생성된거 맵에서 없애도록 구현
  useEffect(() => {
    var canvasNode = document.querySelectorAll("canvas");
    var canvas = Array.prototype.slice.call(canvasNode);
    if (canvas) {
      canvas.forEach(function (element) {
        // element.style.display = 'none'
        if (element.id !== 'mapDolphin' && element.id !== 'mapLion' && element.id !== 'mapRabbit' && element.id !== "mapAlien" && element.id !== 'mapSanta') {
          element.remove();
        }
      });
    }
  }, []);

  const mapMoving =(site) => {
    var canvasNode = document.querySelectorAll("canvas");
    var canvas = Array.prototype.slice.call(canvasNode);
    if (canvas) {
      canvas.forEach(function (element) {
        // element.style.display = 'none'
        // if (element.id !== 'mapDolphin' && element.id !== 'mapLion' && element.id !== 'mapRabbit') {
          element.remove();
        // }
      });
    }
    navigate(site)
  }

  return (
    <div className="Map">

      <iframe
        title="배경음악"
        src="/assets/audio/map/map.mp3"
        allow="autoplay;"
        className="audio"
      ></iframe>


    <MapRabbit id={'mapRabbit'}></MapRabbit>

    <MapDolphin id={'mapDolphin'}></MapDolphin>
    <MapLion id={'mapLion'}></MapLion>
    <MapAlien id={'mapAlien'}></MapAlien>
    <MapSanta id={'mapSanta'}></MapSanta>

      {/* 클릭 대체할 div 태그 */}

      <div className="ocean-click" onClick={() => mapMoving("/ocean-intro")}></div>
      <div className="jungle-click" onClick={() => mapMoving("/jungle-intro")}></div>
      <div className="christmas-click" onClick={()=> mapMoving("/christmas")} ></div>
      <div className="universe-click" onClick={() => mapMoving("/universe-intro")}></div>

      {/* 배경화면 사진 요소 */}
      <img src="/assets/map/main-banner.png" alt="" className="map-banner"/>

      <img src="/assets/map/jungle-banner.png" alt="" className="jungle-bbanner"/>
      <img src="/assets/map/ocean-banner.png" alt="" className="ocean-banner"/>
      <img src="/assets/map/universe-banner.png" alt="" className="universe-banner"/>
      <img src="/assets/map/christmas-banner.png" alt="" className="christmas-banner"/>

      <img src="/assets/map/foot.png" alt="" className="map-foot"/>

      {/* 바다맵 구역 이미지 */}
      {/* <img src="/assets/map/animal.png" alt="" className="map-animal"/> */}
      <img src="/assets/map/leaf.png" alt="" className="map-leaf"/>
      <img src="/assets/map/bubble.png" alt="" className="map-bubble"/>
      <img src="/assets/map/fish.png" alt="" className="map-fish"/>

      <img src="/assets/map/rocket.png" alt="" className="map-rocket"/>

      <img src="/assets/map/snow.png" alt="" className="map-snow"/>

      <img src="/assets/map/cloud1.png" alt="" className="map-cloud1"/>
      <img src="/assets/map/cloud2.png" alt="" className="map-cloud2"/>
      <img src="/assets/map/cloud3.png" alt="" className="map-cloud3"/>
      <img src="/assets/map/cloud4.png" alt="" className="map-cloud4"/>

      <img src="/assets/map/whole-background.png" alt=""  className="map-background"/>
    </div>
  );
};

export default Map;