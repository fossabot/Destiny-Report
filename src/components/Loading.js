/*
	by Jpanter
	https://codepen.io/jpanter/

	Granted permission to Destiny.report
*/

import React, { Component, useEffect, useState } from "react";
import "../../static/styles/Loading.scss";

const Loading = () => {
  const guardians = ["warlock", "titan", "hunter"];

  const [guardian, updateGuardian] = useState({
    class: "",
    current: 0
  });

  const updateClass = () => {
    updateGuardian(prev => ({
      class: guardians[prev.current],
      current: prev.current === 2 ? 0 : prev.current + 1
    }));
  };

  useEffect(() => {
    updateClass();
    const id = setInterval(updateClass, 1500);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="loading--wrapper">
      <div className={`the-cade-6-unit-dank-af-anmation ${guardian.class}`}>
        <span className="circle circle--1" />
        <span className="circle circle--2" />
        <span className="circle circle--3" />
        <span className="circle circle--4" />
        <div className="line-group line-group--1">
          <span className="line line--1" />
          <span className="line line--2" />
          <span className="line line--3" />
          <span className="line line--4" />
        </div>
        <div className="line-group line-group--2">
          <span className="line line--1" />
          <span className="line line--2" />
          <span className="line line--3" />
          <span className="line line--4" />
        </div>
        <div className="line-group line-group--3">
          <span className="line line--1" />
          <span className="line line--2" />
          <span className="line line--3" />
          <span className="line line--4" />
        </div>
        <div className="shape-group">
          <span className="shape shape--1" />
          <span className="shape shape--2" />
          <span className="shape shape--3" />
          <span className="shape shape--4" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
