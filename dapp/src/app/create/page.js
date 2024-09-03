"use client"

import { useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { openRequest } from "@/services/Web3Service";
export default function Create() {
    const [request, setRequest] = useState({
        title: "",
        description: "",
        contact: "",
        goal: 0
    }, [])

    function onInputChange(evt){
        setRequest(prevState => ({...prevState, [evt.target.id]: evt.target.value}))
    }

    function btnSaveClick(){
        alert("Starting the saving process...")
        openRequest(request)
            .then(result => {
                alert("Order sent successfully. It will be available on the home page in a few minutes.");
                window.location.href = "/"
            })
            .catch(err => {
                console.error(err)
                alert(err.message)
            })
    }
    return (
      <>
      <Header />
      <div className="container">
        <div className="ps-5">
            <div className="row my-3">
                <div className="lead">Fill in all the fields below to tell us what you need.</div>
            </div>
            <div className="col-6">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="title" maxLength={150} value={request.title} onChange={onInputChange}/>
                    <label htmlFor="title">Summary of what you need: </label>
                </div>
            </div>
            <div className="col-6">
                <div className="form-floating mb-3">
                    <textarea className="form-control" id="description" style={{height: "100px"}} value={request.description} onChange={onInputChange}></textarea>
                    <label htmlFor="description">Write down in detail what you need and where you are (for in-person deliveries): </label>
                </div>
            </div>
            <div className="col-6">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="contact" maxLength={150} value={request.contact} onChange={onInputChange}/>
                    <label htmlFor="contact">Contact (phone or e-mail): </label>
                </div>
            </div>
            <div className="col-6">
                <div className="form-floating mb-3">
                    <input type="number" className="form-control" id="goal" maxLength={150} value={request.goal} onChange={onInputChange}/>
                    <label htmlFor="goal">Target in ETH (leave blank if you don't want to receive donations in crypto): </label>
                </div>
            </div>
            <div className="row">
                <div className="col-1 mb-3">
                    <a href="/" className="btn btn-outline-dark col-12 p-3">Back</a>
                </div>
                <div className="col-5 mb-3">
                    <button type="button" className="btn btn-dark col-12 p-3" onClick={btnSaveClick}>Send Request</button>
                </div>
            </div>
            
        </div>
        <Footer />
      </div>
      </>
    );
  }
  