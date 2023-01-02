import './index.css';

function Instruction() {
    return(
        <>
            <h2 className='instruction-text'>
                Um comerciante muito rico sempre guarda suas mercadorias em um armazém de confiança até elas serem vendidas. 
                O armazém tem uma tecnológia especial que mostra o peso total das mercadorias que estão guardadas nele, por segurança 
                o comerciante confere todas as manhãs esse peso.
                Em uma manhã, no dia posterior ao que ele recebeu uma nova remessa de marcadorias, o comerciante percebe que o peso mostrado pelo
                armazém está menor que na manhã que recebeu os itens. 
            </h2>
            <h2 className='instruction-text'>
                Comece o jogo como o comerciante escolhendo a quantidade de mercadorias que quer guardar no armazém. Em seguida o ladrão veio
                e roubou uma certa quantidade de itens, você terá a disposição o peso total que foi roubado e o peso de todos os itens antes do roubo, 
                seu trabalho é descobrir a quantidade de itens que foi roubada. 
                Ainda há a possibilidade de o armazém apresentar um defeito na pesagem e apresentar erroneamente que algum peso foi perdido.
            </h2>
        </>
    )
}

export default Instruction;

