import React, {useState, useEffect} from "react";

import "./styles.css";

function Home() {
  const [ibge, setIBGE] = useState('')
  const [municipio, setMunicipio] = useState('')
  const [estado, setEstado]= useState('')
  const[novo, setNovo]= useState([])
  
  function handleAddnovo(event){
    event.preventDefault();
    const data={
      id: new Date().getTime(),
      ibge,
      municipio,
      estado,  
    }

    if(ibge === '' || estado === '' || municipio === '')
    {
    alert("Algum campo esta vazio!")
    return;
    }
    
    setNovo([...novo, data])
    setIBGE('')
    setMunicipio('')
    setEstado('')
   
  }

  function handleDelete(id){
    setNovo(novo.filter(novo=> novo.id !== id))
  }

  useEffect(()=>{
    function loadData(){
      const storageclients= localStorage.getItem('@cadIBGE:IBGE')
      if(storageclients){
        setNovo(JSON.parse(storageclients))
      }
    }
    loadData()

  }, [])

  useEffect(()=>{
    function saveData(){
      localStorage.setItem('@cadIBGE:IBGE',JSON.stringify(novo))
    }
    saveData()
  }, [novo])



  return (
    <div className="page">
      <form className="cadastro" onSubmit={handleAddnovo}>

      <label className="form-tittle">Código IBGE</label>
      <input
          name="ibge"
          type="number"
          placeholder="Digite o código do IBGE"
          value={ibge}
          onChange={(event) => setIBGE(event.target.value)}
          
      />
      
      <label className="form-tittle">Município</label>
      <input
          name="municipio"
          type="text"
          placeholder="Digite o município"
          value={municipio}
          onChange={(event) => setMunicipio(event.target.value)}
          
         
      />

      <label className="form-tittle">Estado</label>
      <input
          name="estado"
          type="text"
          placeholder="Digite o estado"
          value={estado}
          onChange={(event) => setEstado(event.target.value)}
        
      />

        <button type="submit">Enviar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Cod.IBGE</th>
            <th>Município</th>
            <th>Estado</th>
            <th colSpan={2}>Gerenciamento</th>
          </tr>
        </thead>
        <tbody>
       
          
          {novo.map(novo =>(
            <tr key={novo.id}>
              <td>{novo.ibge} </td>
              <td>{novo.municipio}</td>
              <td>{novo.estado}</td>
             
              <td>
                <button 
                className="Excluir"
                onClick={()=> handleDelete(novo.id)}
                >
                  Excluir
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



export { Home };
