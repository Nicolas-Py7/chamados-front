
import { Link } from "react-router-dom";
import "./CardChamado.css";

function CardChamado({ id, titulo, descricao, status, prioridade, tipo, local }) {
  const statusClasse = status
    ?.toLowerCase()
    .replaceAll(" ", "-");

  const prioridadeClasse = prioridade
    ?.toLowerCase()
    .replaceAll(" ", "-");

  return (
    <article className="card-chamado">
      <div className="card-chamado__topo">

        <span className={`status status--${statusClasse}`}>
          {status}
        </span>
      </div>

      <h2 className="card-chamado__titulo">{titulo}</h2>

      <p className="card-chamado__descricao">
        {descricao}
      </p>

      <p className="card-chamado__tipo">Tipo: {tipo}</p>

      <p className="card-chamado__local">Local: {local}</p>

      <div className="card-chamado__rodape">
        <span className="card-chamado__prioridade">
          <span className={`prioridade prioridade--${prioridadeClasse}`} />
          Prioridade {prioridade}
        </span>

        <Link className="card-chamado__link" to={`/chamado/${id}`}>
          Ver detalhes
          <span aria-hidden="true"> →</span>
        </Link>
      </div>
    </article>
  );
}

export default CardChamado;
