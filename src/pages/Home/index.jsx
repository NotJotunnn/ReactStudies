import React, { useEffect, useState } from 'react';

import './styles.css';

import { Card } from '../../components/Card/index';

export function Home() {

  const [studentName, setStudentName] = useState();
  const [student, setStudent] = useState([]);
  const [user, setUser] = useState({name: '', avata: ''})

  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleDateString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudent(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {
    fetch('https://api.github.com/users/notjotunnn')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    })
  },[])

  return (
    <div className='container'>

      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>

      <input 
      type="text" 
      placeholder="Digite o nome..." 
      onChange={e => setStudentName(e.target.value)}
      />

      <button type="button" onClick={handleAddStudent}>Adicionar</button>
      {
        student.map(student => <Card key={student.time} name={student.name} time={student.time}/>)
      }
    </div>
  )
}

