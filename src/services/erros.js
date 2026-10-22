function mensagemErro(erro, padrao) {
  if (erro.response?.status === 401) {
    return "Chave de API inválida. Verifique sua chave.";
  }
  const detail = erro.response?.data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((d) => d.msg).join("; ");
  return padrao;
}

export default mensagemErro;