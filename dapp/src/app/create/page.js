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
        alert("Iniciando processo de salvamento...")
        openRequest(request)
            .then(result => {
                alert("Pedido enviado com sucesso. Em alguns minutos estará disponível na página inicial.");
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
                <div className="lead">Preencha todos os campos a baixo para nos dizer o que precisa.</div>
            </div>
            <div className="col-6">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="title" maxLength={150} value={request.title} onChange={onInputChange}/>
                    <label htmlFor="title">Resumo do que precisa: </label>
                </div>
            </div>
            <div className="col-6">
                <div className="form-floating mb-3">
                    <textarea className="form-control" id="description" style={{height: "100px"}} value={request.description} onChange={onInputChange}></textarea>
                    <label htmlFor="description">Escreva em detalhes o que precisa e onde você está (para entregas presenciais): </label>
                </div>
            </div>
            <div className="col-6">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="contact" maxLength={150} value={request.contact} onChange={onInputChange}/>
                    <label htmlFor="contact">Contato (telefone ou e-mail): </label>
                </div>
            </div>
            <div className="col-6">
                <div className="form-floating mb-3">
                    <input type="number" className="form-control" id="goal" maxLength={150} value={request.goal} onChange={onInputChange}/>
                    <label htmlFor="goal">Meta em BNB (deixe em branco caso não deseje receber doação em cripto): </label>
                </div>
            </div>
            <div className="row">
                <div className="col-1 mb-3">
                    <a href="/" className="btn btn-outline-dark col-12 p-3">Voltar</a>
                </div>
                <div className="col-5 mb-3">
                    <button type="button" className="btn btn-dark col-12 p-3" onClick={btnSaveClick}>Enviar Pedido</button>
                </div>
            </div>
            
        </div>
        <Footer />
      </div>
      </>
    );
  }
  