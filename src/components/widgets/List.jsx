"use client"
import React, { useEffect, useState } from "react";
import axios from 'axios';

const List = () => {
  const [assistants, setAssistants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(30); // 60 seconds countdown

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/assistants');
        if (res.status === 200) {
          setAssistants(res.data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
        setCountdown(30); // Reset countdown after data is fetched
      }
    };

    fetchData(); // Fetch data on component mount

    const intervalId = setInterval(() => {
      setCountdown((currentCountdown) => {
        if (currentCountdown <= 1) {
          fetchData(); // Fetch data when countdown reaches 0
          return 30; // Reset countdown
        } else {
          return currentCountdown - 1;
        }
      });
    }, 1000); // Update countdown every second

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, []);

  return (
    <div className="mt-5 bg-gray-800 rounded-lg w-80 border-2 border-white h-[500px]">
      <div className="flex items-center justify-center h-full overflow-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
          {/* Assuming you have a custom loader component or CSS */}
          <div className="loading loading-spinner"></div>
          <p className="mt-2 text-white">Cargando...</p> {/* Margin top for spacing */}
        </div>
        ) : (
          <table className="table w-full mt-10">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Asistente</th>
              </tr>
            </thead>
            <tbody>
              {assistants.map((assistant) => (
                <tr key={assistant.assistantId} className="hover">
                  <td className="hover:underline hover:text-white hover:cursor-pointer">{assistant.assistantName}</td>
                  <td>{assistant.assistantAssistance === true ? '✅' : '❌'}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2" className="text-center select-none">
                  Live Data || Next Update: {countdown} secs
                </td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </div>
  );
};

export default List;