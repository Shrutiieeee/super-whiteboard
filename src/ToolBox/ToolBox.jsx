import React, { useState } from 'react'
import "../ToolBox/ToolBox.css"
import { FaPen } from "react-icons/fa";
import { RiText } from "react-icons/ri";
import { TbSlash } from "react-icons/tb";
import { RiRectangleLine } from "react-icons/ri";
import { IoEllipseOutline, IoColorPaletteOutline } from "react-icons/io5";
import { GrSelect } from "react-icons/gr";
import { CiEraser } from "react-icons/ci";
import { GiLaserBurst } from "react-icons/gi";
import { HiCursorClick } from "react-icons/hi";

const tools = [
  { name: "Pen", icon: FaPen, type: 1 },
  { name: "Text", icon: RiText, type: 2 },
  { name: "Line", icon: TbSlash, type: 4 },
  { name: "Rectangle", icon: RiRectangleLine, type: 8 },
  { name: "Ellipse", icon: IoEllipseOutline, type: 16 },
  { name: "Select", icon: GrSelect, type: 32 },
  { name: "Eraser", icon: CiEraser, type: 64 },
  { name: "Laser", icon: GiLaserBurst, type: 128 },
  { name: "Pointer", icon: HiCursorClick, type: 256 },
];

// Color palette options
const colors = [
  "#FF0000", "#FF8C00", "#FFD700", "#32CD32", 
  "#1E90FF", "#9370DB", "#FF1493", "#000000", "#FFFFFF"
];

const ToolBox = ({ onClick, currentTool, onColorChange, currentColor }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div id='tool-box'>
      <ul className="tools-container">
        {tools.map((tool, index) => {
          const IconComponent = tool.icon;
          return (
            <li 
              title={tool.name} 
              className={`tool ${currentTool === tool.type ? "active" : ""}`}
              onClick={() => onClick(tool)} 
              key={index}
            >
              <IconComponent />
            </li>
          );
        })}
        
        {}
        <li 
          title="Color Picker"
          className={`tool ${showColorPicker ? "active" : ""}`}
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          <IoColorPaletteOutline />
        </li>
        
        {}
        {showColorPicker && (
          <li className="color-panel">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`color-option ${currentColor === color ? "selected" : ""}`}
                style={{ backgroundColor: color, border: color === "#FFFFFF" ? "1px solid #ccc" : "none" }}
                onClick={() => {
                  onColorChange(color);
                  setShowColorPicker(false);
                }}
                title={color}
              />
            ))}
          </li>
        )}
      </ul>
    </div>
  );
};

export default ToolBox;