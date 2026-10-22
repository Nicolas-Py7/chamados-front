import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Cabecalho from "../components/Cabecalho";
import Formulario from "../components/Formulario";
import "./FormularioChamado.css";
import mensagemErro from "../services/erros";

function FormularioChamado() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [usuario, setUsuario] = useState(null);
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState("");
    const [local, setLocal] = useState("");
    const [prioridade, setPrioridade] = useState("");
    const [dataAbertura, setDataAbertura] = useState("");
    const [tipos, setTipos] = useState([]);
    const [locais, setLocais] = useState([]);
    const [prioridades, setPrioridades] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [erroSalvamento, setErroSalvamento] = useState("");

    useEffect(() => {
        async function carregarDados() {
            try {
                const [
                    respostaUsuario,
                    respostaTipos,
                    respostaLocais,
                    respostaPrioridades,
                ] = await Promise.all([
                    api.get("/eu"),
                    api.get("/tipos"),
                    api.get("/locais"),
                    api.get("/prioridades"),
                ]);
                
                setUsuario(respostaUsuario.data);

                if (id) {
                    const respostaChamado = await api.get(`/chamados/${id}`);

                    const chamado = respostaChamado.data;

                    if (chamado.status === "resolvido") {
                        setErro("Chamados resolvidos não podem ser editados.");
                        return;
                    }

                    setTitulo(chamado.titulo);
                    setDescricao(chamado.descricao);
                    setTipo(chamado.tipo);
                    setLocal(chamado.local);
                    setPrioridade(chamado.prioridade);
                    setDataAbertura(chamado.data_abertura);
                }

                setTipos(respostaTipos.data);
                setLocais(respostaLocais.data);
                setPrioridades(respostaPrioridades.data);
            } catch (erro) {
                console.error(erro);
                setErro(mensagemErro(erro, "Não foi possível carregar os dados do formulário."));
            } finally {
                setCarregando(false);
            }
        }

        carregarDados();
    }, [id]);

    async function salvarChamado(e) {
        e.preventDefault();
        setErroSalvamento("");

        try {
            const novoChamado = {
                titulo: titulo.trim(),
                descricao: descricao.trim(),
                tipo: tipo,
                local: local,
                prioridade: prioridade,
                data_abertura: dataAbertura,
            };

            let resposta;
            if (id) {
                resposta = await api.put(`/chamados/${id}`, novoChamado);
            } else {
                resposta = await api.post("/chamados", novoChamado);
            }

            navigate(`/chamado/${id || resposta.data.id}`);
        } catch (erro) {
            console.error("Erro ao salvar chamado:", erro.response?.data ?? erro.message);
            setErroSalvamento(mensagemErro(erro, "Não foi possível salvar o chamado."));
        }
    } 

    return (
        <main>
            <Cabecalho nome={usuario?.nome ?? "usuário"} />

            <section className="formulario-chamado">
                <Link className="botao-voltar" to="/">← Voltar aos chamados</Link>

                <div className="formulario-intro">
                    <h1>{id ? "Editar chamado" : "Abrir chamado"}</h1>

                    <p>{id ? "Altere os dados da solicitação abaixo." : "Preencha os dados abaixo para registrar uma solicitação de manutenção."}</p>
                </div>

                {carregando && <p>Carregando formulário...</p>} 
                {erro && <p>{erro}</p>}

                {!carregando && !erro && ( 
                    <>
                        {erroSalvamento && <p>{erroSalvamento}</p>}
                        <Formulario id={id}
                            titulo={titulo}
                            setTitulo={setTitulo}
                            descricao={descricao}
                            setDescricao={setDescricao}
                            tipo={tipo}
                            setTipo={setTipo}
                            local={local}
                            setLocal={setLocal}
                            prioridade={prioridade}
                            setPrioridade={setPrioridade}
                            dataAbertura={dataAbertura}
                            setDataAbertura={setDataAbertura}
                            tipos={tipos}
                            locais={locais}
                            prioridades={prioridades}
                            onSubmit={salvarChamado} 
                        />
                    </>
                )}
            </section>
        </main>
    );
}

export default FormularioChamado;