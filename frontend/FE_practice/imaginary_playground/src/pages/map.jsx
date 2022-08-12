import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/map.css";

import MapLion from '../components/map/Lion'
import MapDolphin from '../components/map/Dolphin'

const Map = () => {
  const navigate = useNavigate();

  // 캔버스 각 맵에서 생성된거 맵에서 없애도록 구현
  useEffect(() => {
    var canvasNode = document.querySelectorAll("canvas");
    var canvas = Array.prototype.slice.call(canvasNode);
    if (canvas) {
      canvas.forEach(function (element) {
        // element.style.display = 'none'
        element.remove();
      });
    }
  }, []);

  return (
    <div className="Map">

      <iframe
        title="배경음악"
        src="/assets/audio/map/map.mp3"
        allow="autoplay;"
        className="audio"
      ></iframe>
      <button
        onClick={() => navigate("/jungle")}
        style={{ backgroundColor: "green" }}
        className="jungle-button"
      >
        정글맵
      </button>
      <button
        onClick={() => navigate("/jungle-intro")}
        style={{ background: "yellow" }}
        className="jungle-intro-button"

      >
        정글 인트로
      </button>
      <button
        onClick={() => navigate("/ocean-intro")}
        style={{ backgroundColor: "skyblue" }}
        className="ocean-real-button"

      >
        언더더씨최적화
      </button>
      <button
        onClick={() => navigate("/universe-intro")}
        style={{ backgroundColor: "yellowgreen" }}
        className="universe-intro-button"
        
      >
        우주 인트로
      </button>
      <button
        onClick={() => navigate("/universe")}
        style={{ backgroundColor: "gray" }}
        className="universe-button"
      >
        우주
      </button>

      {/* <MapLion id={`lion_map`}></MapLion>
      <MapDolphin id={`dolphin_map`}></MapDolphin> */}


      {/* 클릭 대체할 div 태그 */}

      <div className="ocean-click" onClick={() => navigate("/ocean-intro")}></div>
      <div className="jungle-click" onClick={() => navigate("/jungle")}></div>
      <div className="christmas-click" onClick={()=> navigate("/christmas")} ></div>
      <div className="universe-click" onClick={() => navigate("/universe")}></div>

      {/* 배경화면 사진 요소 */}
      <img src="/assets/map/banner.png" alt="" className="map-banner"/>

      <img src="/assets/map/mini-banner.png" alt="" className="jungle-banner"/>
      <img src="/assets/map/mini-banner.png" alt="" className="ocean-banner"/>
      <img src="/assets/map/mini-banner.png" alt="" className="universe-banner"/>
      <img src="/assets/map/mini-banner.png" alt="" className="christmas-banner"/>

      <img src="/assets/map/foot.png" alt="" className="map-foot"/>

      {/* 바다맵 구역 이미지 */}
      <img src="/assets/map/dolphin.png" alt="" className="map-dolphin"/>
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