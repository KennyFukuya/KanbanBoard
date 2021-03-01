# Projeto: Kanban Board

Este projeto foi realizado como desafio técnico para a vaga de Desenvolvedor Frontend para a Let's Code.

O desafio consiste na implementação de um frontend para um Kanban Board.

## Demonstração

![Alt Text](https://media1.giphy.com/media/mfrAPBCacFkHBJbO17/giphy.gif)

## Funcionalidades e Levantamentos

- O sistema permite ao usuário cadastrar e manusear tarefas de forma visual e simples.
- O sistema possui interface responsiva por meio do componente *Grid* do *Material UI*.
- O usuário pode criar, editar, visualizar e deletar tarefas a qualquer momento.
- A interface permite ao usuário atualizar a categoria da tarefa de forma simples por meio do *Drag-And-Drop*. 
- O usuário pode realizar o filtro das tarefas pelo seu título.
- O conteúdo do *Card* aceita tanto texto padrão, como também HTML e Markdown.
- As regras utilizadas quanto a espaçamento foram as seguintes: ```Vertical: Múltiplos de 4px, Horizontal: Múltiplos de 6px```
- Para lidar com *feedback* ao usuário, foi considerado o *layout* da tela, a cor dos componentes e também foi adicionado respostas visuais como Toaster de notificação e constraste de cor para representar o *Drag-And-Drop*.
- Tratamentos de erros foram considerados no decorrer da execução do programa.
- Os testes unitários foram realizados utilizando *enzyme* e *jest*. Por limitações de tempo e problemas pessoais, apenas uma parte dos testes foram implementados, logo não há *coverage* completo.
- O Linter utilizado foi o ESLint.
- A ordenação dos cards não persiste após a atualização da tela por limitações quanto ao backend.

## Estruturação do repositório

Ambiente testado: 
```
    Ubuntu 20.04
```


Versões utilizadas:
```
    > node => v10.24.0
    > npm => 6.14.11
    > react => 17.0.1
```

```
    > ./BACK => Backend em Nodejs providênciado previamente pela empresa
    > ./front => Frontend em ReactJs implementado pelo autor
```

## Como executar

Seguir o passo a passo fornecido nesse repositório para obter o Backend:

```
> https://gitlab.com/gabriel.militello1/desafio-tecnico-frontend
```
OBS: :eyes: :eyes: :eyes: :eyes: :eyes:
```console
> Tentei colocar um cópia do backend neste repositório, porém ele não estava funcionando a geração do token de autenticação. 
> Por esse motivo, baixe o backend pelo repositório original!
```

Em seguida suba o Frontend como descrito a seguir:

```console
> cd front
> npm install
> npm start
```

Para executar os testes unitários:

```console
> cd front
> npm run test
```

## Hierarquia de arquivos

Os arquivos estão organizados nas seguintes pastas:

```console
> ./components => Todos os componentes criados
> ./components/tests => Testes unitários para alguns componentes (Coverage não foi realizado 100%)
> ./constants => Arquivos de constantes utilizadas
> ./helpers => Arquivos de helpers
> ./styles => Arquivos de estilização
```

## Requisitos Realizados

- [x] A API que provemos deve ser usada para persistência dos cards (ela trabalha com persistência em memória) e não deve ser alterada.

- [x] A interface gráfica será apenas uma tela, nela deve haver três colunas chamadas "To do", "Doing" e "Done". 

- [x] Os cards deve ser listados nessas colunas de acordo com o valor do campo `lista` presente no card. Os valores de `lista` devem ser "ToDo", "Doing" e "Done", respectivamente. 

- [x] Deve haver um local que permita criar um card passando valores para o `titulo` e `conteudo`, deve haver um botão para adicionar o card. 

- [x] Um novo card deve sempre cair na lista "To Do" após persistido na API.

- [x] O card deverá ter dois modos: Visualização e Edição.

- [x] No modo de visualização o card terá um cabeçalho com seu título, o conteúdo e 4 botões.

- [x] O `conteudo` do card pode ser markdown, utilize uma biblioteca para renderizá-lo no modo de visualização (recomendamos uma combinação de `dompurify` e `marked`). Lembre-se de estilizar o html resultante do parse do markdown... [Se quiser usar highlight para campos de código no markdown será um diferencial].

- [x]  Um dos botões do card deverá excluí-lo (persistindo pela API), outro colocá-lo em modo de edição.

- [x] Os dois outros botões devem mudar o card para a lista anterior (se houver) ou para a lista seguinte (se houver). A decisão de desabilitar, esconder ou apenas não gerar o evento desses botões quando não houver a proxima lista ou a anterior é sua.

- [x] No modo de edição, o card conterá um input para o `titulo`, um textarea para o `conteudo` e dois botões.

- [x] No modo de edição, um dos botões cancela a edição, quando precionado os campos devem ser resetados para o valor atual e voltar o card ao modo de visualização.

- [x] O outro botão salva o card, persistindo as informações pela API. Também volta ao modo de visualização em seguida.

- [x] Toda decisão de visual, de UI e UX é sua. Apenas utilize uma única tela. 

- [x] Se estiver usando REACT priorize componentes funcionais e hooks.

- [x] O projeto deve ser colocado em um repositório GITHUB ou equivalente, estar público, e conter um readme.md que explique em detalhes qualquer comando ou configuração necessária para fazer o projeto rodar.

- [x] A entrega será apenas a URL para clonarmos o repositório.

- [x] Qualidade visual levando em conta práticas de UI e UX será considerado um diferencial. Bem como a instalação e bom uso de bibliotecas como styled-components e react-icons ou seus equivalentes para Angular se aplicável.

- [x] Arquiteturas que separem responsabilidades, de baixo acoplamento e alta-coesão são preferíveis, sobretudo usando dependências injetadas, que permitam maior facilidade para testes unitários e de integração.

- [x] Avaliaremos se o código é limpo (com boa nomenclatura de classes, variáveis, métodos e funções) e dividido em arquivos bem nomeados, de forma coesa e de acordo com boas práticas. Bem como práticas básicas como tratamento de erros.

- [x] (Parcialmente) Desacoplar e testar os componentes e serviços com testes unitários será considerado um diferencial.

- [ ] O uso de typescript (se não for obrigatório) acompanhado das devidas configurações e tipagens bem feitas, bem como uso de técnicas de abstração usando interfaces (especialmente da lógica de persistência) serão consideradas um deferencial.

- [x] O uso de Linter será considerado um diferencial.

- [ ] A criação de um docker-compose e de dockerfiles que ao rodar `docker-compose up` subam o sistema por completo (front e back) será considerado um diferencial.
