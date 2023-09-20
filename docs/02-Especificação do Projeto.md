# Especificações do Projeto

## Personas

>### Andrea Gomes
Andrea Gomes, 40 anos, é supervisora de RH e sócio-proprietária de uma distribuidora de bebidas na região de BH.

**Motivações**
- Aumentar sua renda;
- Ser dona do próprio negócio;
- Ter algum sistema básico que auxilie no controle de estoque e vendas, mesmo que não integre a gestão contábill

**Frustrações**
- Devido pouco tempo, não consegue participar efetivamente na gestão do estoque;
- Também devido pouco tempo, não consegue participar na gestão de vendas.


>### Vitor Pereira
Vitor Pereira, 32 anos, proprietário de uma distribuidora de bebidas em Betim. Empreendedor desde os 28 anos.

**Motivações**
- Desejo de se tornar o maior vendedor da região,
- No seu ponto de vista alcançar estabilidade financeira,
- Atender as demadnas dos clientesl

**Frustrações**

- Não é um bom administrador,
- Problemas com estoque furado;
- Compras desnecessárias;
- Falta de produtos.

>### Carlos Augusto
Carlos Augusto, 26 anos, trabalha como gerente de uma distribuidora de bebidas em Contagem, região metropolitana de Belo Horizonte.

**Motivações**
- Ele busca soluções no mercado para melhorar a gestão de processos na sua empresa,
- Melhorar a qualidade do tempo dele na empresa para aumentar o tempo com a família;

**Frustrações**

- Funcionários/Auxiliares desviaram produtos do estoque;
- Relatórios pobres e inexatos;

>### Camila Torres
Camila Torres, 23 anos, trabalha como estoquista em uma distribuidora de bebidas em Contagem.  Estudante de administração, ela estuda os processos necessários para abrir uma distribuidora de bebidas. Com pouca experiência e capital, busca conhecer as principais falhas na gestão desse tipo de empreendimento para conseguir alcançar seu objetivo de dominar as ferramentas de gestão e ter sucesso financeiro.

**Motivações**
- Por conhecer processos administrativos prospécta a abertura de uma distribuidora de bebidas;
- Quer ser empreendedora.

**Frustrações**
- Não vê como possibilidade de fazer controle de estoque e venda tradicionais com papéis ou planilhas simples;
- Dificuldade de encontrar sistemas simples de emissão de relatórios de vendas e estoque.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Andrea Gomes|Controlar acesso de funcionários aos relatórios de estoque e vendas da empresa|Manter os dados atuais e confiáveis|
|Andrea Gomes|Gerenciar produtos oferecidos pela loja (cadastrar, remover, incluir e visualizar dados)|Acompanhar a dinâmica de vendas e realizar compras de acordo com o estoque, evitando gastos desnecessários|
|Vitor Pereira|Emitir relatórios de estoque|Fazer a reposição do estoque em tempo hábil para garantir o atendimento ao cliente|
|Vitor Pereira|Emitir relatórios de vendas|Acompanhar quais produtos estão sendo mais vendidos e elaborar estratégia de vendas para os que não têm boa saída|
|Camila Torres |Registrar as mercadorias que chegam para o estoque|Ter sempre atualizados os dados e quantidades das mercadorias para auxiliar nas tarefas do setor de vendas|
|Camila Torres |Emitir relatório de estoque|Garantir que o próprio estoque seja renovado corretamente (controle de gastos)|
|Vendedor|Registrar venda dos produtos|Facilitar ao gestor da empresa obter visão de negócio para tomada de decisões|
|Carlos Augusto|Gerenciar funcionários do estabelecimento|Manter o quadro de funcionários ativo e atualizado|


## Modelagem do Processo de Negócio 

### Análise da Situação Atual

Apresente aqui os problemas existentes que viabilizam sua proposta. Apresente o modelo do sistema como ele funciona hoje. Caso sua proposta seja inovadora e não existam processos claramente definidos, apresente como as tarefas que o seu sistema pretende implementar são executadas atualmente, mesmo que não se utilize tecnologia computacional. 

### Descrição Geral da Proposta

Apresente aqui uma descrição da sua proposta abordando seus limites e suas ligações com as estratégias e objetivos do negócio. Apresente aqui as oportunidades de melhorias.

### Processo 1 – Emissão de relatório de estoque

Processo BPMN Emissão de relatório de estoque

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t4-pmv-ads-2023-2-e3-proj-mov-t4-time5-ce/assets/111437215/73c6d225-ea5b-4347-a308-f22488f2749d)


### Processo 2 – Venda de bebida

Processo BPMN de venda de bebida

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t4-pmv-ads-2023-2-e3-proj-mov-t4-time5-ce/assets/111437215/e311616f-b980-4817-ace0-68510df5cb1d)



## Indicadores de Desempenho


![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t4-pmv-ads-2023-2-e3-proj-mov-t4-time5-ce/assets/111437215/a1efd081-6c84-490b-8b50-f5677c90d0a7)



## Requisitos

O escopo funcional do projeto é definido por meio dos requisitos funcionais que descrevem as possibilidades de interação dos usuários, bem como os requisitos não funcionais que descrevem os aspectos que o sistema deverá apresentar de maneira geral. Estes requisitos são apresentados a seguir.

### Requisitos Funcionais

A tabela a seguir apresenta os requisitos do projeto, identificando a prioridade em que os mesmos devem ser entregues.

|ID       | Descrição do Requisito  | Prioridade |
|---------|-----------------------------------------|----|
|RF-01| O sistema deve permitir  emitir relatórios. | ALTA | 
|RF-02| O sistema deve permitir cadastrar, editar e remover vendedores (usuários). | ALTA |
|RF-03| O sistema deve permitir cadastrar, visualizar e remover os produtos da loja. | ALTA | 
|RF-04| O sistema deve permitir cadastrar entrada no estoque da empresa.| MÉDIA |
|RF-05| O sistema deve permitir emitir relatório de vendas da empresa. | MÉDIA | 
|RF-06| O sistema deve permitir registrar as vendas realizadas.| MÉDIA |
|RF-07| O sistema deve permitir cadastrar, visualizar e remover vendas | ALTA | 
|RF-08| O sistema deve permitir o usuário entrar no sistema com login e senha | ALTA |


### Requisitos não Funcionais

A tabela a seguir apresenta os requisitos não funcionais que o projeto deverá atender.

|ID        | Descrição do Requisito  |Prioridade |
|--------|-------------------------|----|
|RNF-01| O site deve ser publicado em um ambiente acessível publicamente na Internet| ALTA | 
|RNF-02| O site deve ser responsivo permitindo a visualização em um celular de forma adequada |  ALTA | 
|RNF-03| O site deve ter bom nível de contraste entre os elementos da tela | MÉDIA | 
|RNF-04| O site deve ser compatível com os principais navegadores do mercado (Google Chrome, Firefox, Microsoft Edge) |  ALTA | 
|RNF-05| O site deve suportar acessos simultâneos |  MÉDIA |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID   | Restrição                                             |
|-----|-------------------------------------------------------|
|RE-01| O projeto deverá ser entregue no final do semestre letivo, não podendo extrapolar a data de 04/12/2023.|
|RE-02| O aplicativo deve se restringir às tecnologias básicas da Web no Front-end e Back-end.|
|RE-03| A equipe não pode subcontratar o desenvolvimento do trabalho.|

## Diagrama de Casos de Uso

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t4-pmv-ads-2023-2-e3-proj-mov-t4-time5-ce/assets/111437215/511fdb1c-fad8-48a7-8871-41dd8c25420f)



# Matriz de Rastreabilidade

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t4-pmv-ads-2023-2-e3-proj-mov-t4-time5-ce/assets/111437215/af32f184-e39b-403f-9177-df726ecd051a)


# Gerenciamento de Projeto

Gráfico de Gantti (CONTROLE DE ESTOQUE E VENDAS)

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t4-pmv-ads-2023-2-e3-proj-mov-t4-time5-ce/assets/111437215/c078a17b-edd5-41d4-8a5c-91ed8f86fb54)


## Gerenciamento de Equipe

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t4-pmv-ads-2023-2-e3-proj-mov-t4-time5-ce/assets/111437215/f73ab229-1729-45ec-813f-4a6f0ae15678)


## Gestão de Orçamento

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e3-proj-mov-t4-pmv-ads-2023-2-e3-proj-mov-t4-time5-ce/assets/111437215/c4fdb11b-2ae1-401c-9454-9805b765a745)


