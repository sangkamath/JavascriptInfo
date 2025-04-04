import React, { useState } from "react";

const FetchDataComponent = () => {
  // State for managing loading, data, and error for each button
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);
  
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null);
  const [error3, setError3] = useState(null);

  // Async function for fetching data
  const fetchData = async (url, setData, setLoading, setError) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => fetchData('https://api.example1.com/data', setData1, setLoading1, setError1)}>
        {loading1 ? "Loading..." : "Fetch Data 1"}
      </button>
      {error1 && <p>Error: {error1}</p>}
      {data1 && <pre>{JSON.stringify(data1, null, 2)}</pre>}

      <button onClick={() => fetchData('https://api.example2.com/data', setData2, setLoading2, setError2)}>
        {loading2 ? "Loading..." : "Fetch Data 2"}
      </button>
      {error2 && <p>Error: {error2}</p>}
      {data2 && <pre>{JSON.stringify(data2, null, 2)}</pre>}

      <button onClick={() => fetchData('https://api.example3.com/data', setData3, setLoading3, setError3)}>
        {loading3 ? "Loading..." : "Fetch Data 3"}
      </button>
      {error3 && <p>Error: {error3}</p>}
      {data3 && <pre>{JSON.stringify(data3, null, 2)}</pre>}
    </div>
  );
};

export default FetchDataComponent;