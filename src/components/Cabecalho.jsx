import "./Cabecalho.css"

function Cabecalho({ nome }) {
    return(
        <header className="cabecalho">
            <div className="div1">
                <h1>Chamados IFRN</h1>
                <p>Sistema de chamados de manutenção</p>
            </div>

            <div>
                <h1>Olá, {nome || "usuário"}!</h1>
            </div>
        </header>
    )
}   

export default Cabecalho;