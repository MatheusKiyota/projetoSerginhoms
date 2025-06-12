import React, { useState } from 'react';

export default function CotacaoForm() {
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [dados, setDados] = useState(null);

  const buscarCotacao = async () => {
    if (!inicio || !fim) return alert("Preencha as duas datas!");

    const formatar = (data) => {
      const [ano, mes, dia] = data.split("-");
      return `${ano}${mes}${dia}`;
    };

    const url = `https://economia.awesomeapi.com.br/json/daily/USD-BRL/365?start_date=${formatar(inicio)}&end_date=${formatar(fim)}`;

    try {
      const resposta = await fetch(url);
      const json = await resposta.json();
      setDados(json);
    } catch (erro) {
      console.error("Erro ao buscar cotação:", erro);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial' }}>
      <h2>Buscar Cotação USD/BRL</h2>
      <label>Data Início:</label>
      <input type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} />
      <br />
      <label>Data Fim:</label>
      <input type="date" value={fim} onChange={(e) => setFim(e.target.value)} />
      <br /><br />
      <button onClick={buscarCotacao}>Buscar</button>

      {dados && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Resultados:</h3>
          <ul>
            {dados.map((item) => (
              <li key={item.timestamp}>
                {new Date(item.timestamp * 1000).toLocaleDateString()} - R$ {item.bid}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
