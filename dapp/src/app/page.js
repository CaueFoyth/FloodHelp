"use client"

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getOpenRequests } from "@/services/Web3Service";
import Request from "@/components/Request.js";


export default function Home() {
  const [requests, setRequests] = useState([])
  useEffect(() => {
    loadRequests(0)
  }, [])

  async function loadRequests(lastId){
    try{
      const result = await getOpenRequests(lastId)
      if(lastId===0){
        setRequests(result)
      }else{
        requests.push(...result)
        setRequests(requests)
      }
    }
    catch(err){
      console.error(err)
      alert(err.message)
    }
  }

  return (
    <>
    <Header />
    <div className="container">
      <div className="row ps-5">
        <p className="lead m-4">Help the victims of floods and other natural disasters.</p>
        <div className="p-4 mx-5">
          <div className="list-group">
            {
              requests && requests.length
              ? requests.map(rq => <Request key={rq.id} data={rq} />)
              : <>Connect your MetaMask wallet to the “Login” button to help or ask for help.</>
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
}
