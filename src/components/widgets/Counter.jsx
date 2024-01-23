"use client"
import React, { useEffect, useState } from "react";
import axios from 'axios';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [assistants, setAssistants] = useState(0);

  const handleRequest = () => {
    axios.get('/api/assistants').then((res) => {
      if (res.status === 200) {
        let trueCount = 0;
        let falseCount = 0;
        res.data.forEach((assistant) => {
          if (assistant.assistantAssistance === true) {
            trueCount++;
          } else if (assistant.assistantAssistance === false) {
            falseCount++;
          }
        });
        setAssistants(trueCount);
        setCount(falseCount);
      }
    });
  }

  useEffect(() => {
    handleRequest();
  }, [])
  return (
    <div className="pl-2 mt-5 bg-gray-800 rounded-lg w-80 border-2 border-white">
      <h2 className="font-bold">ASISTENTES:</h2>
      <div className="grid grid-cols-2 row-span-2 mb-2">
        <div>
          <p className="font-bold text-gray-500">Invitados:</p>
          <span className="text-2xl font-bold mb-5">{count}</span>
        </div>
        <div>
          <p className="font-bold text-gray-500">Asistentes:</p>
          <span className="text-2xl font-bold mb-5">{assistants}</span>
        </div>
      </div>
    </div>
  );
};

export default Counter;
