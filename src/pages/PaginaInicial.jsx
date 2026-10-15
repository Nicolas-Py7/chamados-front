    import { useEffect, useState } from "react";
    import api from "../services/api";
    import { Link } from "react-router-dom";
    import CardChamado from "../components/CardChamado.jsx"
    import "./PaginaInicial.css"
    import Cabecalho from "../components/Cabecalho.jsx";

    function PaginaInicial() {
        const [chamados, setChamados] = useState([]);
        const [usuario, setUsuario] = useState(null);
        const [busca, setBusca] = useState("");
        const [status, setStatus] = useState("");
        const [carregando, setCarregando] = useState(true);
        const [erro, setErro] = useState("");
        const [tipo, setTipo] = useState("");
        const [local, setLocal] = useState("");
        const [prioridade, setPrioridade] = useState("");
        const [tipos, setTipos] = useState([]);
        const [locais, setLocais] = useState([]);
        const [prioridades, setPrioridades] = useState([]);

        useEffect(() => {
            async function carregarDados() {
                try {
                    const [
                        respostaUsuario,
                        respostaChamados,
                        respostaTipos,
                        respostaLocais,
                        respostaPrioridades,
                        ] = await Promise.all([
                        api.get("/eu"),
                        api.get("/chamados"),
                        api.get("/tipos"),
                        api.get("/locais"),
                        api.get("/prioridades"),
                        ]);

                    setTipos(respostaTipos.data);
                    setLocais(respostaLocais.data);
                    setPrioridades(respostaPrioridades.data);                        
                    setUsuario(respostaUsuario.data);
                    
                    const dados = respostaChamados.data;
                    setChamados(
                        Array.isArray(dados) ? dados : dados.chamados ?? []
                    );
                } catch (erro) {
                    console.error(erro);
                    setErro("Não foi possível carregar os chamados.");
                } finally {
                    setCarregando(false);
                }
            }

            carregarDados();
        }, []);

        const chamadosFiltrados = chamados.filter((chamado) => {
            const texto =  busca.toLowerCase();

            const correspondeBusca = 
                chamado.titulo?.toLowerCase().includes(texto) || chamado.descricao?.toLowerCase().includes(texto);
            
            const correspondeStatus = 
                status === "" || chamado.status === status;

            const correspondeTipo = 
                tipo === "" || chamado.tipo === tipo;
            
            const correspondeLocal = 
                local === "" || chamado.local === local;

            const correspondePrioridade = 
                prioridade === "" || chamado.prioridade === prioridade;
            
            return (correspondeBusca && correspondeStatus && correspondeTipo && correspondeLocal && correspondePrioridade);
        });

        return(
            <main>
                <Cabecalho nome={usuario?.nome ?? "usuário"} />

                <section>
                    <div className="div-titulo">
                        <h2>Chamados de manutenção</h2>
                    
                        <Link className="botao-novo-chamado" to="/novo">+ Abrir chamado</Link>
                    </div>

                    <div className="filtros-chamados">
                        <input type="text" 
                        placeholder="Buscar por título ou descrição..." 
                        value={busca} 
                        onChange={(evento) => setBusca(evento.target.value)} />

                        <select value={status} onChange={(evento) => setStatus(evento.target.value)}>
                            <option value="">Todos os status</option>
                            <option value="aberto">Em aberto</option>
                            <option value="em andamento">Em andamento</option>
                            <option value="resolvido">Resolvido</option>
                        </select>

                        <select value={tipo} onChange={(evento) => setTipo(evento.target.value)}>
                            <option value="">Todos os tipos</option>
                            {tipos.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                        <select value={local} onChange={(evento) => setLocal(evento.target.value)}>
                            <option value="">Todos os locais</option>
                            {locais.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                        <select value={prioridade} onChange={(evento) => setPrioridade(evento.target.value)}>
                            <option value="">Todas as prioridades</option>
                            {prioridades.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    {carregando && <p>Carregando chamados...</p>}
                    {erro && <p>{erro}</p>}
                    {!carregando && !erro && chamadosFiltrados.length === 0 && (<p>Nenhum chamado encontrado.</p>)}

                    <div className="lista-chamados">
                        {chamadosFiltrados.map((chamado) => (
                            <CardChamado
                                key={chamado.id}
                                id={chamado.id}
                                titulo={chamado.titulo}
                                descricao={chamado.descricao}
                                status={chamado.status}
                                prioridade={chamado.prioridade}
                                tipo={chamado.tipo}
                                local={chamado.local}
                            />
                        ))}
                    </div>
                </section>
            </main>
        );
    }

    export default PaginaInicial;