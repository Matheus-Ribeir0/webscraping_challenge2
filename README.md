# Web Scraping de Produtos - Carrefour

Este projeto realiza a coleta de dados de produtos de uma página de catálogo do **Carrefour**, navegando por várias páginas e extraindo informações de produtos de diferentes categorias. O resultado final é armazenado em um arquivo `output.json`.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para o código.
- **Puppeteer**: Biblioteca para controlar o navegador e fazer scraping das páginas web.
- **FS (File System)**: Para salvar os dados coletados em um arquivo JSON.

## Descrição do Projeto

Este script navega pelas páginas de um catálogo online do Carrefour, realiza a extração dos produtos e os categoriza com base no nome. O script utiliza uma URL de catálogo para acessar várias páginas de produtos e filtrar os resultados em categorias específicas, como **Refrigerante**, **Cerveja**, **Água**, **Destilados**, e **Sucos**.

O resultado é um arquivo `output.json` que contém uma lista de objetos com o nome e o link de cada produto. Caso o produto não se encaixe em nenhuma categoria, ele será classificado como "outros".

### Funcionalidade do Código:

1. **Navegação entre páginas**: O código utiliza uma URL base e adiciona um número de página para navegar pelas páginas de produtos do catálogo.
2. **Filtragem de produtos**: O nome de cada produto é analisado e categorizado conforme palavras-chave presentes no título.
3. **Armazenamento dos resultados**: Todos os links de produtos categorizados são armazenados em um arquivo JSON (`output.json`).

## Desafios Enfrentados

Durante o desenvolvimento do projeto, alguns desafios foram identificados e superados:

- **Identificação do componente HTML**: Foi necessário identificar qual parte do código HTML das páginas seria mais adequada para a extração dos dados, considerando as boas práticas de scraping e o comportamento da página.
  
- **Identificação dos títulos das categorias**: A definição de quais títulos deveriam ser associados a cada categoria foi um desafio, pois os nomes dos produtos variam muito. Foi necessário criar uma lógica robusta para identificar os produtos em diferentes categorias, filtrando de acordo com o nome.

