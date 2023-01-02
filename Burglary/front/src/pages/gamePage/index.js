import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './index.css';

function GamePage() {
    const navigate = useNavigate()

    const [showInitialGame, setShowInitialGame] = useState(true)
    const [valueInitialGame, setValueIntialGame] = useState(1)

    const [showBurglary, setShowBurglary] = useState(false)
    const [burglary, setBurglary] = useState([])
    const [burglaryAnswer, setBurglaryAnswer] = useState(0)

    const [endGame, setEndGame] = useState(false)
    const [tryAgain, setTryAgain] = useState(false)
    const [giveUp, setGiveUp] = useState(false)

    function handleChangeInputInitialGame(value) {
        setValueIntialGame(Number(value))
    }

    function handleInitialGame() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "total_itens": valueInitialGame })
        };
        fetch('http://localhost:8004/burglar', requestOptions)
            .then(response => response.json())
            .then(data => {
                const res = {
                    possiveisItens: data[0],
                    possiveisQuantidades: data[1],
                    totalRoubado: data[2],
                    todosItensArmazenados: data[3]
                }

                console.log(res)

                setBurglary(res)
                setShowBurglary(true)
                setShowInitialGame(false)
            });
    }

    function handleChangeBurglaryAnswer(value) {
        setBurglaryAnswer(Number(value))
    }

    function handleSubmitBurglaryAnswer() {
        if (burglary.possiveisQuantidades.includes(burglaryAnswer)) {
            setEndGame(true);
        } else {
            setTryAgain(true);
        }

        setShowBurglary(false)
    }

    function handleReset() {
        setShowInitialGame(true)
        setValueIntialGame(1)
        setShowBurglary(false)
        setBurglary([])
        setBurglaryAnswer(0)

        setEndGame(false)
        setTryAgain(false)
        setGiveUp(false)
    }

    function handleTryAgain() {
        setTryAgain(false)
        setShowBurglary(true)
        setBurglaryAnswer('')
    }


    function handleGiveUp() {
        setGiveUp(true)
        setTryAgain(false)
        setShowBurglary(false)
    }

    return (
        <>
            {showInitialGame && (
                <div className='value-content'>
                    <h2 className='begin-instruction'>
                        Selecione a quantidade de mercadorias para armazenar.
                    </h2>
                    <div className='value-form'>
                        <input onChange={(e) => handleChangeInputInitialGame(e.target.value)}
                            type="number"
                            min="1"
                            max="50"
                            value={valueInitialGame}
                            name="valueInitialGame"
                            className="input" />

                        <button className="button" onClick={handleInitialGame}>Iniciar</button>
                    </div>
                </div>
            )}

            {showBurglary && (
                <div className='value-content'>
                    <h2 className='begin-instruction'>
                        O ladrão veio a noite e roubou um total {burglary.totalRoubado} quilos.
                    </h2>
                    <h2 className='begin-instruction'>
                        O peso dos itens são (incluindo os roubados):
                    </h2>
                    <h2 className='begin-instruction'>
                        {burglary.todosItensArmazenados.join(', ')}
                    </h2>
                    <h2 className='begin-instruction'>
                        Quantos itens o ladrão roubou?
                        Se é impossível o ladrão ter roubado e a diferença de peso é um erro da maquina, envie 0.
                    </h2>

                    <div className='answer-content'>
                        <div className='value-form'>
                            <input onChange={(e) => handleChangeBurglaryAnswer(e.target.value)}
                                type="number"
                                min="0"
                                max="50"
                                value={burglaryAnswer}
                                name="burglaryAnswer"
                                className="input" />

                            <button className="button" onClick={handleSubmitBurglaryAnswer}>Enviar</button>
                            <button className="button-try-again" onClick={handleGiveUp}>Mostrar Resposta</button>
                        </div>
                    </div>
                </div>
            )}

            {endGame && (
                <div className='value-content'>
                    {burglary.possiveisItens.length === 1 ? (
                        <>
                            <h2 className='begin-instruction'>
                                Você acertou! O ladrão roubou {burglary.possiveisQuantidades} objeto(s)!
                            </h2>
                            <h2 className='begin-instruction'>
                                {burglary.possiveisQuantidades[0] === 0 ? 
                                `Houve um erro na pesagem do armazém.` 
                                : 
                                `Sendo ele(s): ${burglary.possiveisItens} `}
                            </h2>
                        </>
                    ) : (
                        <>
                            <h2 className='begin-instruction'>
                                Você acertou! O ladrão poderia ter roubado {burglaryAnswer} itens.
                            </h2>
                            <div className='container'>
                                <table>
                                    <tr>
                                        <th>Itens Possíveis</th>
                                    </tr>
                                    {burglary.possiveisItens?.map((item, index) =>
                                        <tr key={index}>
                                            <td>{item.join(', ')}</td>
                                        </tr>
                                    )}
                                </table>
                            </div>
                        </>
                    )}
                    <button className="button-try-again" onClick={handleReset}>Jogar Novamente</button>
                </div>
            )}

            {giveUp && (
                <div className='value-content'>
                    {burglary.possiveisItens.length === 1 ? (
                        <>
                            <h2 className='begin-instruction'>
                                O ladrão roubou {burglary.possiveisQuantidades} objeto(s)!
                            </h2>
                            <h2 className='begin-instruction'>
                                {burglary.possiveisQuantidades[0] === 0 ? 
                                `Houve um erro na pesagem do armazém.` 
                                : 
                                `Sendo ele(s): ${burglary.possiveisItens} `}
                            </h2>
                        </>
                    ) : (
                        <>
                            <h2 className='begin-instruction'>
                                O ladrão poderia ter roubado:
                            </h2>
                            <div className='container'>
                                <table>
                                    <tr>
                                        <th>Itens</th>
                                        <th>Quantidade</th>
                                    </tr>
                                    {burglary.possiveisItens?.map((item, index) =>
                                        <tr key={index}>
                                            <td>{item.join(', ')}</td>
                                            <td> {burglary.possiveisQuantidades[index]}</td>
                                        </tr>
                                    )}
                                </table>
                            </div>
                        </>
                    )}
                    <button className="button-try-again" onClick={handleReset}>Jogar Novamente</button>
                </div>
            )}

            {tryAgain && (
                <div className='value-content'>
                    {burglaryAnswer ?
                        <h2 className='begin-instruction'>
                            Você errou! O ladrão não roubou {burglaryAnswer} itens!
                        </h2>
                        :
                        <h2 className='begin-instruction'>
                            Você errou! O ladrão não roubou 0 itens!
                        </h2>
                    }
                    <div className='button-customize'>
                        <button className="button-try-again" onClick={handleTryAgain}>Tente Novamente</button>
                        <button className="button-try-again" onClick={handleGiveUp}>Mostrar Resposta</button>
                    </div>
                </div>
            )}

            {showInitialGame && <button className="button-return-game" onClick={() => navigate("/")}>Voltar</button>}
        </>
    )
}

export default GamePage;