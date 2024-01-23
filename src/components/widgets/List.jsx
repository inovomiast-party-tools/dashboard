"use client"
import React, { useEffect, useState } from "react";
import axios from 'axios';

const List = () => {
  const [assistants, setAssistants] = useState([]);

  useEffect(() => {
    axios.get('/api/assistants').then((res) => {
      if (res.status === 200) {
        setAssistants(res.data); // Assuming the response data is the array of assistants
      }
    });
  }, []); // Empty dependency array to fetch data on component mount

  return (
    <div className="mt-5 bg-gray-800 rounded-lg w-80 border-2 border-white h-[450px]">
      <table className="table overflow-y-visible">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Asistente</th>
          </tr>
        </thead>
        <tbody>
          {assistants.map((assistant) => (
            <tr key={assistant.assistantId} className="hover"> {/* Assuming each assistant has a unique 'id' */}
              <td>{assistant.assistantName}</td>
              <td>{assistant.assistantAssistance === true ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2" className="text-center">
              Live Data
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default List;