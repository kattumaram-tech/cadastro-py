import sqlite3

class CadastroBanco:
    def __init__(self):
        self.conexao = sqlite3.connect('usuarios.db')
        self.criar_tabelas()

    def criar_tabelas(self):
        cursor = self.conexao.cursor()

        # Tabela de depositantes
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS depositores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                idade INTEGER NOT NULL,
                cpf TEXT UNIQUE NOT NULL,
                endereco TEXT,
                email TEXT UNIQUE,
                telefone TEXT,
                senha TEXT NOT NULL
            );
        """)

        # Tabela de coletores
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS coletores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                idade INTEGER NOT NULL,
                cpf TEXT UNIQUE NOT NULL,
                endereco TEXT,
                email TEXT UNIQUE,
                telefone TEXT,
                senha TEXT NOT NULL
            );
        """)

        # Tabela de responsáveis (com campo de CEP)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS responsaveis (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                idade INTEGER NOT NULL,
                cpf TEXT UNIQUE NOT NULL,
                cep TEXT,
                endereco TEXT,
                email TEXT UNIQUE,
                telefone TEXT,
                senha TEXT NOT NULL
            );
        """)

        self.conexao.commit()
        cursor.close()

    def salvar_no_banco(self, nome, idade, cpf, endereco, email, telefone, senha, tipo='depositores', cep=None):
        cursor = self.conexao.cursor()
        try:
            if tipo == 'responsaveis':
                cursor.execute("""
                    INSERT INTO responsaveis (nome, idade, cpf, cep, endereco, email, telefone, senha)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
                """, (nome, int(idade), cpf, cep, endereco, email, telefone, senha))
            elif tipo in ['depositores', 'coletores']:
                query = f"""
                    INSERT INTO {tipo} (nome, idade, cpf, endereco, email, telefone, senha)
                    VALUES (?, ?, ?, ?, ?, ?, ?);
                """
                cursor.execute(query, (nome, int(idade), cpf, endereco, email, telefone, senha))
            else:
                raise ValueError("Tipo de usuário inválido. Use 'depositores', 'coletores' ou 'responsaveis'.")

            self.conexao.commit()
            print(f"Dados salvos no banco com sucesso na tabela '{tipo}'!")
        except sqlite3.IntegrityError as e:
            print(f"Erro ao salvar no banco de dados: {e}")
        except Exception as e:
            print(f"Ocorreu um erro: {e}")
        finally:
            cursor.close()

    def fechar(self):
        self.conexao.close()

