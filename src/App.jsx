
import { ZegoSuperBoardManager } from 'zego-superboard-web';
import { ZegoExpressEngine } from 'zego-express-engine-webrtc'
import { useEffect, useState } from 'react';
import ToolBox from './ToolBox/ToolBox';

function App() {
  const [currentTool, setCurrentTool] = useState(null);
  const [currentColor, setCurrentColor] = useState("#FF0000");
  const [zegoSuperBoard, setZegoSuperBoard] = useState(null);
  
  const appID = parseInt(import.meta.env.VITE_ZEGO_APP_ID),
  serverUrl = import.meta.env.VITE_ZEGO_SERVER_URL,
  userID = "12345",
  roomID = "11604",
  userName = "Shrutika",
  token = "04AAAAAGi7KZcADMIGszGQaKw1fmqCDACu2lbf9hrLJQo4ZemPZHuoPEFLPIbcX+EHnKEwbGi14/xBBlTaXd+FnL0R3nGHV6FiehSKIGSAjUWzMqNsLlPjIHvgIy0utyFF7Wmau7DlNegakSxIsE4XjEqiY+lwHpGo4safpuWYVoJmazMG9m/E9n1Svso6LH5xMGxzIQfPJl8sSb6WepDwayzB2nW9WeWYg3Gf+G3XN1loCJOTsAm+8d/tRFTx1v8gNu2LSUSfAQ==";

  const zg = new ZegoExpressEngine(appID, serverUrl);
  
  const initSuperBoard = async () => {
    const superBoard = ZegoSuperBoardManager.getInstance();
    setZegoSuperBoard(superBoard);
    
    await superBoard.init(zg, {
      parentDomID: 'superboard', 
      appID, 
      userID, 
      token
    });
    
   
    console.log("Zego SuperBoard instance:", superBoard);
    console.log("Available methods:", Object.keys(superBoard).filter(key => typeof superBoard[key] === 'function'));
    
    setCurrentTool(superBoard.getToolType());
    await zg.loginRoom(roomID, token, {userID, userName}, {userUpdate: true});

    await superBoard.createWhiteboardView({
      name: 'my learning platform', 
      perPageWidth: 1600, 
      perPageHeight: 900, 
      pageCount: 1,
    });
    
   
    trySetColor(superBoard, currentColor);
  };

  // Function to try different color setting methods
  const trySetColor = (superBoard, color) => {
    if (typeof superBoard.setColor === 'function') {
      superBoard.setColor(color);
    } else if (typeof superBoard.setDrawColor === 'function') {
      superBoard.setDrawColor(color);
    } else if (typeof superBoard.setBrushColor === 'function') {
      superBoard.setBrushColor(color);
    } else if (typeof superBoard.setBrushStyle === 'function') {
      
      superBoard.setBrushStyle({ color });
    } else {
      console.warn("No color setting method found in Zego SuperBoard");
    }
  };

  useEffect(() => {
    initSuperBoard();
  }, []);

  // Handle tool change
  const handleToolChange = (tool) => {
    if (zegoSuperBoard) {
      zegoSuperBoard.setToolType(tool.type);
      setCurrentTool(tool.type);
      
     
      if (tool.type !== 64) { // Not eraser
        trySetColor(zegoSuperBoard, currentColor);
      }
    }
  };

  // Handle color change
  const handleColorChange = (color) => {
    setCurrentColor(color);
    if (zegoSuperBoard && currentTool !== 64) { // Not eraser
      trySetColor(zegoSuperBoard, color);
    }
  };

  return (
    <div className="app">
      <div id="superboard"></div>
      <ToolBox 
        currentTool={currentTool} 
        currentColor={currentColor}
        onClick={handleToolChange}
        onColorChange={handleColorChange}
      /> 
    </div>
  );
}

export default App;