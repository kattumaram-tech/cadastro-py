import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

// Imagens importadas corretamente
import imgColetados from "../src/img/coletados.png";
import imgColetando from "../src/img/coletando.png";
import imgNaoColetados from "../src/img/nao-coletados.png";
import imgOutro from "../src/img/outros.png";

// Página Principal
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="app">
      <h1>Cadastro</h1>
      <img src="./img/OIP.jpg" alt="GIF animado" className="gif" />
      <button className="navigate-button" onClick={() => navigate("/formulario-dante")}>
        Formulário do Dante
      </button>
      <button className="navigate-button" onClick={() => navigate("/mapa-casa-amarela")}>
        Ver Mapa de Casa Amarela
      </button>
    </div>
  );
};

// Página de Lore
const LoreArtorias = () => {
  const navigate = useNavigate();

  return (
    <div className="app">
      <h1>Lore de Artorias</h1>
      <p>Aqui você pode colocar toda a história do lendário cavaleiro Artorias.</p>
      <button className="navigate-button" onClick={() => navigate("/")}>
        Voltar para Home
      </button>
    </div>
  );
};

// Formulário temático do Dante
const FormularioDante = () => {
  const navigate = useNavigate();

  return (
    <div className="form-dante">
      <h2>Cadastro do Caçador de Demônios</h2>
      <form className="formulario">
        <input type="text" placeholder="Nome" />
        <input type="number" placeholder="Idade" />
        <input type="text" placeholder="CPF" />
        <input type="text" placeholder="Endereço" />
        <input type="text" placeholder="CEP (for responsável)" />
        <input type="email" placeholder="Email" />
        <input type="tel" placeholder="Telefone" />
        <input type="password" placeholder="Senha" />
        <input type="password" placeholder="Confirmar Senha" />
        <button type="submit">Cadastrar</button>
      </form>
      <button className="navigate-button" onClick={() => navigate("/")}>
        Voltar para Home
      </button>
    </div>
  );
};

// Página com o Mapa de Casa Amarela
const MapaCasaAmarela = () => {
  const navigate = useNavigate();

  const [imagemAtual, setImagemAtual] = useState("coletados");

  const imagens: Record<string, string> = {
    coletados: imgColetados,
    coletando: imgColetando,
    naoColetados: imgNaoColetados,
    outro: imgOutro,
  };

  return (
    <div className="app">
      <h1>Visualização Interativa - Casa Amarela</h1>
      <div className="imagem-container">
        <img src={imagens[imagemAtual]} alt="Visualização" />
      </div>
      <div className="botoes-status">
        <button className="botao-verde" onClick={() => setImagemAtual("coletados")}>✅ Coletados</button>
        <button className="botao-amarelo" onClick={() => setImagemAtual("coletando")}>⏳ Coletando</button>
        <button className="botao-vermelho" onClick={() => setImagemAtual("naoColetados")}>❌ Não Coletados</button>
        <button className="botao-cinza" onClick={() => setImagemAtual("todos")}>📍 todos</button>
      </div>
      <button className="navigate-button" onClick={() => navigate("/")}>Voltar para Home</button>
    </div>
  );
};

// Componente App com rotas
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lore-artorias" element={<LoreArtorias />} />
        <Route path="/formulario-dante" element={<FormularioDante />} />
        <Route path="/mapa-casa-amarela" element={<MapaCasaAmarela />} />
      </Routes>
    </Router>
  );
};

export default App;
