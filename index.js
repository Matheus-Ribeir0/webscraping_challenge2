const puppeteer = require("puppeteer");
const fs = require("fs");

const webscrapeLinks = async () => {
  categories = ["https://mercado.carrefour.com.br/bebidas?page="];

  const browser = await puppeteer.launch({ headless: false });
  let allLinks = []; 

  for (let i = 0; i <= 21; i++) {
    const page = await browser.newPage();
    await page.goto(categories[0] + i, { waitUntil: "networkidle2" });
    await page.waitForSelector('[data-testid="product-link"]');

    const links = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll('[data-testid="product-link"]')
      ).map((a) => ({
        text: a.innerText.trim(),
        href: a.href,
      }));
    });

    allLinks.push(...links);
    await page.close();
  }

  await browser.close(); 
  return allLinks;
};

const filter = async () => {
    webscrapeLinks()
      .then((result) => {
        console.log(`Total de links coletados: ${result.length}`);
  
        const categories = {
          Refrigerante: ["Refrigerante", "Coca-Cola", "Guaraná", "Schweppes"],
          Cerveja: ["Cerveja", "Chopp"],
          Agua: ["Água", "Mineral"],
          Laticinios: ["Láctea"],
          Destilados: ["Whisky", "Vodka", "Gin", "Campari", "Jack Daniels", "Smirnoff", "Drink", "Aperitivo", "Ice", "Rum", "Tequila", "Licor", "Conhaque", "Absolut", "Ballantines", "Baileys", "Beefeater", "Bombay", "Chivas", "Dewars", "Drambuie", "Glenfiddich", "Glenlivet", "Gordons", "Havana", "Jagermeister", "Jameson", "Johnnie Walker", "Jose Cuervo", "Kahlua", "Martini", "Metaxa", "Molotov", "Montilla", "Olmeca", "Pernod", "Pitu", "Red Label", "Sagatiba", "Sambuca", "Sauza", "Southern Comfort", "Stolichnaya", "Tia Maria", "White Horse", "Wild Turkey", "Ypioca", "Zaconey", "Zwack", "Cointreau", "Cynar", "Fernet", "Jagermeister","Cachaça"],
          Vinho: ["Vinho", "Espumante", "Champagne"],
          Sucos: ["Suco"],
          Energético: ["Energético"],
          Cafe: ["Café"],
          Cha: ["Chá"],
        };
        const produtosPorCategoria = { Outros: [] };
  
        Object.keys(categories).forEach((categoria) => {
          produtosPorCategoria[categoria] = [];
        });
  
        // Filtra os produtos e os adiciona na categoria correspondente
        result.forEach((item) => {
          const title = item.text.toLowerCase();
          let encontrado = false;
  
          Object.entries(categories).forEach(([categoria, palavras]) => {
            if (palavras.some((produto) => title.includes(produto.toLowerCase()))) {
              produtosPorCategoria[categoria].push({
                text: item.text,
                href: item.href,
              });
              encontrado = true;
            }
          });
  
          // Se não encontrou em nenhuma categoria, adiciona em "Outros"
          if (!encontrado) {
            produtosPorCategoria.Outros.push({
              text: item.text,
              href: item.href,
            });
          }
        });
        Object.entries(produtosPorCategoria).forEach(([categoria, produtos]) => {
          console.log(`${categoria}: ${produtos.length} produtos`);
        });
  
        fs.writeFileSync("output.json", JSON.stringify(produtosPorCategoria, null, 2));
  
        console.log("Produtos filtrados salvos com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao coletar links:", error);
      });
  };
  
  filter();