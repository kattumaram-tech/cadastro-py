import { useState } from 'react';

function CadastroDepositor() {
  const [form, setForm] = useState({
    nome: '',
    idade: '',
    cpf: '',
    endereco: '',
    email: '',
    telefone: '',
    senha: '',
    senha2: '',
  });

  const [confirmar, setConfirmar] = useState(false);
  const [erroSenha, setErroSenha] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.senha !== form.senha2) {
      setErroSenha('As senhas não coincidem!');
      return;
    }
    setErroSenha('');
    setConfirmar(true);
  };

  const enviarCadastro = () => {
    // Aqui você enviaria os dados para o backend com fetch ou axios
    console.log("Dados enviados:", form);
    alert("Cadastro realizado com sucesso!");
    setConfirmar(false);
  };

  if (confirmar) {
    return (
      <div>
        <h2>Confirmação de Dados</h2>
        <p><strong>Nome:</strong> {form.nome}</p>
        <p><strong>Idade:</strong> {form.idade}</p>
        <p><strong>CPF:</strong> {form.cpf}</p>
        <p><strong>Endereço:</strong> {form.endereco}</p>
        <p><strong>Email:</strong> {form.email}</p>
        <p><strong>Telefone:</strong> {form.telefone}</p>
        <p><strong>Senha:</strong> {'*'.repeat(form.senha.length)}</p>
        <button onClick={enviarCadastro}>Confirmar</button>
        <button onClick={() => setConfirmar(false)}>Voltar</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro de Depositante</h2>
      <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
      <input name="idade" placeholder="Idade" value={form.idade} onChange={handleChange} required />
      <input name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} required />
      <input name="endereco" placeholder="Endereço" value={form.endereco} onChange={handleChange} required />
      <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
      <input name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} required />
      <input name="senha" placeholder="Senha" type="password" value={form.senha} onChange={handleChange} required />
      <input name="senha2" placeholder="Confirmar Senha" type="password" value={form.senha2} onChange={handleChange} required />

      {erroSenha && <p style={{ color: 'red' }}>{erroSenha}</p>}

      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default CadastroDepositor;
