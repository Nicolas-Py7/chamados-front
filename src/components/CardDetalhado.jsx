import "./CardDetalhado.css";
import { useState } from "react";
import { Link } from "react-router-dom"

function CardDetalhado({ chamado, onIniciar, onResolver, onExcluir }) {
    const [solucao, setSolucao] = useState("");
    const [mostrarSolucao, setMostrarSolucao] = useState(false);
    const [responsavel, setResponsavel] = useState("");
    const [mostrarResponsavel, setMostrarResponsavel] = useState(false);

    return (
        <article className="card-detalhado">
            <div className="card-detalhado__topo">
                <span className="card-detalhado__identificador">
                    Chamado #{chamado.id}
                </span>

                <span className="card-detalhado__status">
                    {chamado.status}
                </span>
            </div>

            <h1 className="card-detalhado__titulo">
                {chamado.titulo}
            </h1>

            <p className="card-detalhado__descricao">
                {chamado.descricao}
            </p>

            <div className="card-detalhado__informacoes">
                <div className="card-detalhado__campo">
                    <span>Tipo</span>
                    <p>{chamado.tipo}</p>
                </div>

                <div className="card-detalhado__campo">
                    <span>Local</span>
                    <p>{chamado.local}</p>
                </div>

                <div className="card-detalhado__campo">
                    <span>Prioridade</span>
                    <p>{chamado.prioridade}</p>
                </div>

                
                <div className="card-detalhado__campo">
                    <span>Responsável</span>
                    <p>{chamado.responsavel || "Não atribuído"}</p>
                </div>

                <div className="card-detalhado__campo">
                    <span>Aberto em</span>
                    <p>{chamado.data_abertura}</p>
                </div>

                {chamado.status === "resolvido" && (
                    <>
                        <div className="card-detalhado__campo">
                            <span>Solução</span>
                            <p>{chamado.solucao}</p>
                        </div>

                        <div className="card-detalhado__campo">
                            <span>Resolvido em</span>
                            <p>{chamado.data_resolucao}</p>
                        </div>
                    </>
                )}

            </div>

            <div className="card-detalhado__acoes">
                {chamado.status === "aberto" && (
                    <>
                        {!mostrarResponsavel ? (
                            <button
                                type="button"
                                onClick={() => setMostrarResponsavel(true)}
                            >
                                Iniciar atendimento
                            </button>
                        ) : (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    onIniciar(responsavel.trim());
                                }}
                            >
                                <label htmlFor="responsavel">
                                    Nome do responsável
                                </label>

                                <input
                                    id="responsavel"
                                    type="text"
                                    placeholder="Digite o nome do responsável"
                                    value={responsavel}
                                    onChange={(e) => setResponsavel(e.target.value)}
                                    required
                                />

                                <div>
                                    <button type="submit">
                                        Confirmar responsável
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setMostrarResponsavel(false)}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        )}
                    </>
                )}


                {chamado.status === "em andamento" && (
                <>
                    {!mostrarSolucao ? (
                    <button
                        type="button"
                        onClick={() => setMostrarSolucao(true)}
                    >
                        Resolver chamado
                    </button>
                    ) : (   
                    <form
                        onSubmit={(e) => {
                        e.preventDefault();
                        onResolver(solucao.trim());
                        }}
                    >
                        <textarea
                        placeholder="Descreva como o problema foi resolvido..."
                        value={solucao}
                        onChange={(e) => setSolucao(e.target.value)}
                        required
                        />
                        
                        <div>
                            <button type="submit">Confirmar resolução</button>

                            <button
                            type="button"
                            onClick={() => setMostrarSolucao(false)}
                            >
                            Cancelar
                            </button>
                        </div>
                    </form>
                    )}
                </>
                )}

                {chamado.status !== "resolvido" && (
                    <Link className="botao-editar" to={`/editar/${chamado.id}`}>Editar</Link>
                )}

                <button type="button" onClick={onExcluir}>
                Excluir chamado
                </button>
            </div>
        </article>
    );
}

export default CardDetalhado;
