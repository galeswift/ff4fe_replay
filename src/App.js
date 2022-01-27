import logo from './logo.svg';
import './App.css';
import ffmap_overworld from './images/ff4map_overworld.png';
import ffmap_underworld from './images/ff4map_underworld.png';
import ffmap_moon from './images/ff4map_moon.png';
import './styles/ff4fe_replay.css';
import { MapInteractionCSS } from 'react-map-interaction';
import { useEffect,useState } from 'react';

function Main()
{
  const [mapIndex, setMapIndex] = useState(0);

  const fnOnKeyDown = (event) =>
  {
    console.log(`Key: ${event.key} with keycode ${event.keyCode} has been pressed`);
    setMapIndex(mapIndex => (mapIndex+1) % 3);
  };

  useEffect(()=>
  {
    document.addEventListener('keydown', fnOnKeyDown);

    return function cleanup(){
      document.removeEventListener('keydown',fnOnKeyDown);
    }
  },[]);

  var mapName = "";
  switch (mapIndex)
  {
    case 0:
      mapName = ffmap_overworld;
      break;
    case 1:
      mapName = ffmap_underworld;
      break;
    case 2:
      mapName = ffmap_moon;
      break;
  }

  return <MapInteractionCSS>
      <div className="InReplayRoot">
        <img className="OverworldMap" src={mapName} alt=""></img>
      </div>
      </MapInteractionCSS>;

}

function App()
{
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
