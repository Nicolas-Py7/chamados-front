import "./Formulario.css"

function Formulario({ 
    id,
    titulo,
    setTitulo,
    descricao,
    setDescricao,
    tipo,
    setTipo,
    local,
    setLocal,
    prioridade,
    setPrioridade,
    dataAbertura,
    setDataAbertura,
    tipos,
    locais,
    prioridades,
    onSubmit, 
}) {
    return(
        <div>
            <h2 className="formulario-subtitulo">Dados da solicitação</h2>

            <form className="formulario-campos" onSubmit={onSubmit}>
                <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />

                <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                    <option value="">Selecione um tipo.</option>
                    {tipos.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <select value={local} onChange={(e) => setLocal(e.target.value)} required>
                    <option value="">Selecione um local.</option>
                    {locais.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)} required>
                    <option value="">Selecione a prioridade.</option>
                    {prioridades.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <input type="date" value={dataAbertura} onChange={(e) => setDataAbertura(e.target.value)} required />

                <textarea placeholder="Descrição..." value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
                
                <button type="submit">
                    {id ? "Salvar alterações" : "Abrir chamado"}
                </button>

            </form>
        </div>
    )
}

export default Formulario;  