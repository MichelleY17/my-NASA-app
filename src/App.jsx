import { useState, useEffect } from "react";
import { BiLoader } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import DateNavigation from "./components/DateNavigation";
// import { Menu } from "antd";


function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNasaData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${
            import.meta.env.VITE_MY_NASA_KEY
          }&date=${formatDate(currentDate)}`
        );
        if (!response.ok) {
          throw new Error(`Qualcosa è andato storto: ${response.status}`);
        }
        let responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNasaData();
  }, [currentDate]);

  return (
    <div className="test">
      <>
        <DateNavigation setCurrentDate={setCurrentDate} />
        <div>
          <AnimatePresence>
            {isLoading ? (
              <motion.div
                key={isLoading}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="loader-container"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    type: "tween",
                    ease: "linear",
                  }}
                  className="loader-wrapper"
                >
                  <BiLoader size={30} />
                </motion.div>
              </motion.div>
            ) : (
              <div className="content-container">
              <>
              <h2>{data.title}</h2>
              <img src={data.hdurl} alt={data.title} />
              <p>{data.explanation}</p>
              </>
            </div> 
            )}
          </AnimatePresence>
        </div>
      </>
    </div>
  );
}

export default App;

function formatDate(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month; // Adding leading zero for single digit months
  }
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day; // Adding leading zero for single digit days
  }
  return `${year}-${month}-${day}`;
}
