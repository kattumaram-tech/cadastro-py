import sys
import os

# Adiciona o caminho do diretório "banco de dados" para que o Python saiba onde procurar o arquivo "dadosusuario.py"
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'banco de dados')))

# Agora podemos importar diretamente o módulo
from dadosusuario import CadastroBanco

class Cadastroresponsaveis:
    def __init__(self):
        self.nome = ""
        self.idade = ""
        self.cpf = ""
        self.endereco = ""
        self.cep = ""
        self.email = ""
        self.telefone = ""
        self.senha = ""
        self.senha2 = ""
        self.db = CadastroBanco()

    def cadastrar(self):
        while True:
            print("=== Cadastro do Responsável ===")
            self.nome = input("Digite seu nome: ")
            self.idade = input("Digite sua idade: ")
            self.cpf = input("Informe seu CPF: ")
            self.endereco = input("Informe seu endereço: ")
            self.cep = input("Informe seu CEP da sua regiao: ")
            self.email = input("Informe seu email: ")
            self.telefone = input("Informe seu telefone: ")
            self.senha = input("Informe sua senha: ")
            self.senha2 = input("Confirme sua senha: ")

            if self.senha != self.senha2:
                print("As senhas não coincidem! Tente novamente.\n")
                continue

            self.confirmar_dados()
            resposta = input("As informações estão corretas? (S/N): ").strip().lower()
            if resposta == "s":
                self.db.salvar_no_banco(
                    self.nome, self.idade, self.cpf, self.endereco, self.cep,
                    self.email, self.telefone, self.senha
                )
                print("Seu cadastro foi realizado com sucesso!")
                break
            else:
                print("As informações não estão corretas, vamos tentar novamente!\n")

    def confirmar_dados(self):
        print("\n=== Confirmação de Dados ===")
        print(f"Nome: {self.nome}")
        print(f"Idade: {self.idade}")
        print(f"CPF: {self.cpf}")
        print(f"Endereço: {self.endereco}")
        print(f"CEP: {self.cep}")
        print(f"Email: {self.email}")
        print(f"Telefone: {self.telefone}")
        print(f"Senha: {'*' * len(self.senha)}\n")  # Esconde a senha

# Executar o cadastro
if __name__ == "__main__":
    cadastro_responsaveis = Cadastroresponsaveis()
    cadastro_responsaveis.cadastrar()
