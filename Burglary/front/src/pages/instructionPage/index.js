import React from 'react';
import { useNavigate } from 'react-router-dom'
import Instruction from '../../components/instructions';
import './index.css';

function InstructionPage() {
  const navigate = useNavigate()
  return (
      <div className='instruction'>
          <Instruction/>
          <button className="button" onClick={() => navigate("/")}>Voltar</button>
      </div>
  );
}

export default InstructionPage;
