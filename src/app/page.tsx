'use client'
import React from "react";
import { Listbox, ListboxItem, Chip, ScrollShadow, Avatar, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { LeftResourcePanel } from "./LeftResourcePanel";
import { RightPropertyPanel } from "./RightPropertyPanel";
import { users } from "./data";
import { ImageEditor } from "./ImageEditor";
import { ComponentToImg } from "./ComponentToImg";

export default function Home() {
  const child1Ref = React.useRef(null);
  const [message, setMessage] = React.useState({});

    const [propertyInfo, setPropertyInfo] = React.useState({
      font: "",
      title: "",
      subTitle: "",
      author: "",
      icon: "",
      color: "",
      aspect: "",
      blur: 0
    });

  const onChildData = (data: {}) => {
    setMessage(data)
  }
  const onImageDowloadClick = (imgFormat: string) => {
    child1Ref.current.downloadImage(imgFormat)
  }

  const onPropInfoChange = (propInfo) => {
    setPropertyInfo(propInfo)
  }


  return (
    <div className="flex">
      <div className="w-80">
        <LeftResourcePanel onData={onChildData} />
      </div>
      <div className="flex-1 bg-gray-100" >
        <ComponentToImg ref={child1Ref}  >
          <ImageEditor message={message} propertyInfo={propertyInfo}/>
        </ComponentToImg>

      </div>
      <div className="w-80">
        <RightPropertyPanel onImageDowloadClick={onImageDowloadClick} onPropInfoChange={onPropInfoChange}/>
      </div>

    </div>
  );
}

