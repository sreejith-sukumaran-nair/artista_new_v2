import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import axios from "axios";

function Drawing() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const getWorks = async () => {
      try {
        const res = await axios.get("/api/v1/post/getPosts", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res);
        const data = res.data || [];
        setWorks(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    getWorks();
  }, []);
  return (
    <>
      <div className="container-fluid px-5">
        <h3>Magnus opums</h3>
        {works.length ? (
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-2 g-lg-3 mt-2">
            {works.map((work, index) => (
              <Card key={index} work={work} />
            ))}
          </div>
        ) : <h5>No artistics works to show</h5>}
      </div>
    </>
  );
}

export default Drawing;
