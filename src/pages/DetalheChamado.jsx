import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Cabecalho from "../components/Cabecalho";
import CardDetalhado from "../components/CardDetalhado";
import "./DetalheChamado.css"
import mensagemErro from "../services/erros";

function DetalheChamado() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [chamado, setChamado] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [usuario, setUsuario] = useState(null);
    const [erroAcao, setErroAcao] = useState("");

    useEffect(() => {
        async function carregarChamado() {
            try {
                const [respostaChamado, respostaUsuario] = await Promise.all([
                    api.get(`/chamados/${id}`),
                    api.get("/eu"),
                ]);
                
                setUsuario(respostaUsuario.data);
                setChamado(respostaChamado.data);

            } catch(erro) {
                console.error(erro);
                setErro(mensagemErro(erro, "Não foi possível carregar este chamado."));
            } finally {
                setCarregando(false);
            }
        }

        carregarChamado();
    }, [id])

    async function iniciarChamado(responsavel) {
        setErroAcao("");
        try {

            await api.patch(`/chamados/${id}/iniciar`, {
                responsavel: responsavel,
            });

            const resposta = await api.get(`/chamados/${id}`);
            setChamado(resposta.data);
        } catch (erro) {
            console.error("Erro ao iniciar o chamado:", erro);
            setErroAcao(mensagemErro(erro, "Não foi possível iniciar o atendimento."));
        }
        
    }

    async function resolverChamado(solucao) {
        setErroAcao("");
        try {

            await api.patch(`/chamados/${id}/resolver`, {
                solucao: solucao,
            });

            const resposta = await api.get(`/chamados/${id}`);
            setChamado(resposta.data);
        } catch (erro) {
            console.error("Erro ao resolver o chamado:", erro);
            setErroAcao(mensagemErro(erro, "Não foi possível resolver o chamado."));
        }
    }

    async function excluirChamado() {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este chamado?"
        );

        if (!confirmar) return;

        setErroAcao("");
        try {

            await api.delete(`/chamados/${id}`);
            navigate("/");
        } catch (erro) {
            console.error("Erro ao excluir o chamado:", erro);
            setErroAcao(mensagemErro(erro, "Não foi possível excluir o chamado."));
        }
    }

    if (carregando) {
        return <p>Carregando chamado...</p>
    }

    if (erro) {
        return (
            <div>
                <Cabecalho nome={usuario?.nome ?? "usuário"} />
                <section>
                    <Link className="botao-voltar" to="/">← Voltar aos chamados</Link>
                    <p role="alert">{erro}</p>
                </section>
            </div>
        );
    }

    return (
        <div>
            <Cabecalho nome={usuario?.nome ?? "usuário"} />

            <section>
                <Link className="botao-voltar" to="/">← Voltar aos chamados</Link>

                {erroAcao && <p role="alert">{erroAcao}</p>}

                <CardDetalhado chamado={chamado} onIniciar={iniciarChamado} onResolver={resolverChamado} onExcluir={excluirChamado} />
            </section>
        </div>
    );
}

export default DetalheChamado;