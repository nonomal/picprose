"use client";
import React from "react";
import {
  Listbox,
  ListboxItem,
  Chip,
  ScrollShadow,
  Avatar,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { LeftResourcePanel } from "./LeftResourcePanel";
import { RightPropertyPanel } from "./RightPropertyPanel";
import { users } from "./data";
import { ImageEditor } from "./ImageEditor";
import { ImageEditorToolbar } from "./ImageEditorToolbar";
import { PicproseProvider } from "./PicproseContext";
import { ComponentToImg } from "./ComponentToImg";

// 定义编辑器状态类型
type EditorElements = {
  title: { x: number; y: number; visible: boolean };
  author: { x: number; y: number; visible: boolean };
  icon: { x: number; y: number; visible: boolean };
  image: { x: number; y: number };
};

export default function Home() {
  const [selectedImage, setSelectedImage] = React.useState({});
  
  // 提升所有状态到最顶层组件
  const [isDragMode, setIsDragMode] = React.useState(false);
  const [elements, setElements] = React.useState<EditorElements>({
    title: { x: 0, y: 0, visible: true },
    author: { x: 0, y: 0, visible: true },
    icon: { x: 0, y: 0, visible: true },
    image: { x: 0, y: 0 }
  });
  
  // 初始化历史记录，包含初始状态
  const initialElements = {
    title: { x: 0, y: 0, visible: true },
    author: { x: 0, y: 0, visible: true },
    icon: { x: 0, y: 0, visible: true },
    image: { x: 0, y: 0 }
  };
  const [history, setHistory] = React.useState<EditorElements[]>([initialElements]);
  const [historyIndex, setHistoryIndex] = React.useState(0);

  // 添加对 ComponentToImg 的引用
  const componentToImgRef = React.useRef(null);
  
  // 修改下载图片的方法
  const handleDownload = (format: string) => {
    console.log(`Downloading image as ${format}`);
    // 调用 ComponentToImg 的下载方法
    if (componentToImgRef.current) {
      componentToImgRef.current.downloadImage(format);
    }
  };

  // 重置所有编辑器状态
  const handleResetLayout = () => {
    const resetElements = {
      title: { x: 0, y: 0, visible: true },
      author: { x: 0, y: 0, visible: true },
      icon: { x: 0, y: 0, visible: true },
      image: { x: 0, y: 0 }
    };
    setElements(resetElements);
    setHistory([resetElements]);
    setHistoryIndex(0);
    setIsDragMode(false);
  };

  // 保存历史记录
  const saveHistory = (currentElements: EditorElements) => {
    setHistory(prev => [...prev.slice(0, historyIndex + 1), {...currentElements}]);
    setHistoryIndex(prev => prev + 1);
  };

  return (
    <PicproseProvider onDownload={handleDownload}>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-12 h-screen max-h-screen">
        <div className="lg:col-span-3 h-screen overflow-hidden">
          <LeftResourcePanel />
        </div>
        <div className="lg:col-span-6 flex flex-col bg-white dark:bg-gray-900 h-screen max-h-screen overflow-hidden relative">
            <div className="flex-1 flex justify-center items-center">
            <ComponentToImg ref={componentToImgRef}>
              <ImageEditor 
                isDragMode={isDragMode}
                elements={elements}
                setElements={setElements}
                saveHistory={saveHistory}
              />
              </ComponentToImg>
            </div>
         
          
          {/* 工具栏浮动在上方 */}
          <ImageEditorToolbar 
            isDragMode={isDragMode}
            setIsDragMode={setIsDragMode}
            handleResetLayout={handleResetLayout}
            history={history}
            historyIndex={historyIndex}
            setElements={setElements}
            setHistoryIndex={setHistoryIndex}
          />
        </div>
        <div className="lg:col-span-3 h-screen overflow-hidden">
          <RightPropertyPanel />
        </div>
      </div>
    </PicproseProvider>
  );
}
