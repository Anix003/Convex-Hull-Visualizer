'use client'

import React, { useState, useRef } from 'react';
import { FaPlay, FaPause, FaStop, FaPlus, FaTimes, FaSpinner, FaRedo } from 'react-icons/fa';
import { IoReload } from 'react-icons/io5';

const ConvexHullVisualizer = () => {
  const [points, setPoints] = useState([]);
  const [hull, setHull] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentLine, setCurrentLine] = useState(null);
  const [analyzedPoints, setAnalyzedPoints] = useState([]);
  const [basePoint, setBasePoint] = useState(null);
  const [speed, setSpeed] = useState(200);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesabled, setIsDisabled] = useState(false);
  const [isClear, setIsClear] = useState(false);
  
  const clearRef = useRef({isClear: false});
  const pausePromiseResolveRef = useRef(null);
  const animationControlRef = useRef({
    isPaused: false,
    speed: 200
  });

  const audioContextRef = useRef(null);

  const playConnectionSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, context.currentTime);
    gainNode.gain.setValueAtTime(0.1, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.2);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.2);
  };

  const sleep = async () => {
    await new Promise(resolve => setTimeout(resolve, animationControlRef.current.speed));
    if (animationControlRef.current.isPaused) {
      await new Promise(resolve => {
        pausePromiseResolveRef.current = resolve;
      });
    }
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    animationControlRef.current.speed = newSpeed;
  };

  const handlePauseResume = () => {
    setIsClear(!isClear);
    console.log('isClear', isClear);
    const newPausedState = !isPaused;
    // setIsAnimating(!isPaused);
    setIsPaused(newPausedState);
    animationControlRef.current.isPaused = newPausedState;

    if (!newPausedState && pausePromiseResolveRef.current) {
      pausePromiseResolveRef.current();
      pausePromiseResolveRef.current = null;
    }

  };

  const isCounterClockwise = (p1, p2, p3) => {
    return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x) > 0;
  };

  const analyzePoints = async () => {
    setIsDisabled(true);
    setIsClear(true);

    if (points.length < 3) return;

    setIsAnimating(true);
    setHull([]);
    setAnalyzedPoints([]);
    animationControlRef.current.isPaused = false;
    animationControlRef.current.speed = speed;
    setIsPaused(false);

    const startPoint = points.reduce((min, p) =>
      p.x < min.x ? p : min, points[0]
    );

    setBasePoint(startPoint);
    await sleep();

    let currentPoint = startPoint;
    let hullPoints = [startPoint];

    do {
      let nextPoint = points[0] === currentPoint ? points[1] : points[0];

      for (let i = 0; i < points.length; i++) {
        if (points[i] === currentPoint) continue;

        setBasePoint(currentPoint);
        setCurrentLine({
          from: currentPoint,
          to: points[i]
        });
        await sleep();

        if (!analyzedPoints.includes(points[i])) {
          setAnalyzedPoints(prev => [...prev, points[i]]);
        }

        if (nextPoint === currentPoint || isCounterClockwise(currentPoint, nextPoint, points[i])) {
          nextPoint = points[i];
        }
      }

      await sleep();
      playConnectionSound();

      currentPoint = nextPoint;
      hullPoints.push(currentPoint);

      const fullHull = [...hullPoints];
      if (hullPoints.length > 2) {
        fullHull.push(startPoint);
      }
      setHull(fullHull);

      await sleep();

      if (currentPoint === startPoint || hullPoints.length >= points.length) {
        break;
      }

    } while (true);

    setIsDisabled(false);
    setCurrentLine(null);
    setBasePoint(null);
    setIsAnimating(false);
    setIsPaused(false);
    animationControlRef.current.isPaused = false;

  };

  const handleCanvasClick = (e) => {
    if (isAnimating) return;

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tooClose = points.some(point => {
      const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
      return distance < 20;
    });

    if (!tooClose) {
      setPoints([...points, { x, y }]);
      setHull([]);
      setAnalyzedPoints([]);
    }
  };

  const clearAll = () => {
    setPoints([]);
    setHull([]);
    setCurrentLine(null);
    setAnalyzedPoints([]);
    setBasePoint(null);
    setIsAnimating(false);
    setIsPaused(false);
    setIsDisabled(false);
    setIsClear(false);
  };

  const addRandomPoints = () => {
    const newPoints = Array.from({ length: 5 }, () => {
      let x, y, tooClose;
      do {
        x = Math.random() * 600;
        y = Math.random() * 370;
        tooClose = points.some(point => {
          const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
          return distance < 20;
        });
      } while (tooClose);
      return { x, y };
    });

    setPoints([...points, ...newPoints]);
    setHull([]);
    setAnalyzedPoints([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-black">
      <h1 className="text-2xl font-bold text-center mb-6">
        Convex Hull Visualizer
      </h1>

      <div
        className="relative w-full h-96 bg-gray-100 rounded-lg cursor-crosshair border border-gray-200 shadow-inner"
        onClick={handleCanvasClick}
      >
        {points.map((point, index) => (
          <div
            key={index}
            className={`absolute w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-200
              ${point === basePoint ? 'bg-green-500' :
                analyzedPoints.includes(point) ? 'bg-gray-400' : 'bg-blue-500'}`}
            style={{ left: point.x, top: point.y }}
          />
        ))}

        {currentLine && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line
              x1={currentLine.from.x}
              y1={currentLine.from.y}
              x2={currentLine.to.x}
              y2={currentLine.to.y}
              className="stroke-yellow-500 stroke-2"
              strokeDasharray="4"
            />
          </svg>
        )}

        {/* Hull */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {hull.map((point, index) => {
            if (index === hull.length - 1) return null;
            const nextPoint = hull[index + 1];
            return (
              <line
                key={index}
                x1={point.x}
                y1={point.y}
                x2={nextPoint.x}
                y2={nextPoint.y}
                className="stroke-red-500 stroke-2"
              />
            );
          })}
        </svg>
      </div>

      <div className="w-full flex items-center mt-6">
          <input
            type="range"
            name="speed"
            id="hullSpeed"
            className="w-1/2"
            min={100}
            max={1000}
            step={10}
            value={speed}
            onChange={(e) => handleSpeedChange(parseInt(e.target.value, 10))}
          />
          <span className='ml-2'>Speed: {speed}ms</span>
        </div>

      <div className="flex gap-4 mt-6 justify-end items-center">
        {/* <button 
          onClick={addRandomPoints}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-300 flex items-center gap-2"
          disabled={isAnimating}
        >
          <FaPlus /> Random Points
        </button> */}
        
        {!isClear && <button
          onClick={clearAll}
          disabled={points.length < 1}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <FaTimes /> Clear
        </button>}        
        {isDesabled && (
          <button
            onClick={analyzePoints}
            disabled={points.length < 3 || !isAnimating}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <FaRedo /> Restart
          </button>
        )}
        {isAnimating && (
          <button
            onClick={handlePauseResume}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isPaused ? <><FaPlay /> Resume</> : <><FaPause /> Pause</>}
          </button>
        )}
        {!isAnimating && (
          <button
            onClick={analyzePoints}
            disabled={points.length < 3 || isAnimating}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <FaPlay /> Start
          </button>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p className='font-bold text-xl'>Click on the canvas to add points. Colors indicate:</p>
        <ul className="mt-2 space-y-1">
          <li className="text-blue-500">Blue: Unanalyzed points</li>
          <li className="text-gray-500">Gray: Analyzed points</li>
          <li className="text-green-500">Green: Current base point</li>
          <li className="text-yellow-500">Yellow: Line being analyzed</li>
          <li className="text-red-500">Red: Convex hull edges</li>
        </ul>
      </div>
    </div>
  );
};

export default ConvexHullVisualizer;