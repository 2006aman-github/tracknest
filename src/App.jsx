import { useEffect, useState } from 'react'
import './App.css'
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseconfig";


function App () {
 

  useEffect(() => {
    const fetchData = async () => {
      try {
     const querySnapshot = await getDocs(collection(db, "courses"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };
    fetchData()
    return () => {
      // Cleanup if necessary
    }

}, []);


  

  return (
    <>
     hey lets get started
    </>
  )
}

export default App;
