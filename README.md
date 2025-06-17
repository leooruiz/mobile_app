# 📱 Assessor Virtual de Investimentos – MVP React Native

Projeto desenvolvido como parte da **Challenge XP 2025** para a disciplina de **Mobile Development & IoT**, curso de **Engenharia de Software – FIAP**.

---

## 🧑‍💻 Integrantes do Grupo

- **Leonardo de Oliveira Ruiz** – RM98901
- **Bruno Venturi Lopes Vieira** – RM99431
- **Guilherme Alves de Lima** – RM550433
- **Pedro Guerra** – RM99526

---

## 🎯 Objetivo do Projeto

Criar um aplicativo mobile funcional que simula um **assessor virtual de investimentos**, capaz de:

- Coletar informações do perfil do investidor
- Gerar recomendações de carteira baseadas nesse perfil
- Explicar as recomendações com base em lógica de IA explicável (XAI)
- Armazenar e exibir histórico de recomendações
- Garantir controle do usuário sobre seus dados (simulando LGPD)

---

## 🧩 Telas Implementadas

### 1. Login/Cadastro

- Autenticação simulada por nome
- Persistência local com `AsyncStorage`

### 2. Perfil do Investidor

- Coleta: idade, objetivo, horizonte de investimento, tolerância a risco, valor disponível
- Validação com Formik + Yup

### 3. Recomendação de Carteira

- Lógica local baseada no perfil de risco
- Tipos de ativo distribuídos por perfil: conservador, moderado ou agressivo

### 4. Explicação da Recomendação (XAI)

- Geração de explicação textual sobre os motivos da carteira
- Simulação de técnicas como SHAP/LIME

### 5. Histórico de Recomendações

- Armazenamento cumulativo de perfil + carteira por data/hora
- Exibição em lista scrollável

### 6. Preferências e LGPD

- Visualização dos dados armazenados localmente
- Botão para apagar dados (perfil + histórico)

---

## 🛠️ Tecnologias Utilizadas

- **React Native (via Expo)**
- **TypeScript**
- **React Navigation**
- **AsyncStorage**
- **Formik & Yup**
- **Styled Components** (opcional)
- **ArchiMate + Archi** (modelagem anterior para TOGAF)

---

## 📁 Estrutura do Projeto

src/
├── navigation/            # Stack Navigator
├── screens/               # Todas as telas
├── storage/               # Persistência com AsyncStorage
├── components/            # Componentes reutilizáveis(opcional)
└── App.tsx

---

## 📦 Como executar

1. Instale as dependências:

   ```bash
   npm install

2. Inicie o projeto:

    ```bash
    npx expo start
