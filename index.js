import { fetchAllSaleProducts, fetchallNewArrivalProducts } from "./product.js";
// Scrap Products
const scrapHMProducts = async () => {
  const newDrop = await fetchallNewArrivalProducts();
  const sale = await fetchAllSaleProducts();
  return { newDrop, sale };
};

const prepareData = (newDrop, sale) => {
  const preparedNewDrop = [];
  const preparedSale = [];
  Object.keys(newDrop).forEach((key) => {
    const products = newDrop[key];
    products.forEach((product) => {
      preparedNewDrop.push({
        category: key,
        product_external_id: product.id,
        name: product.productName,
        price: product.prices.map((obj) => obj.price).join(" | "),
        colors: product.swatches.map((obj) => obj.colorName).join(" | "),
        stock: product.availability.stockState,
        coming_soon: product.availability.comingSoon,
        url: product.url,
      });
    });
  });

  sale.forEach((product) => {
    preparedSale.push({
      category: product.category,
      product_external_id: product.id,
      name: product.productName,
      price:
        product.prices
          .filter((obj) => obj.priceType === "redPrice")
          .join(" | ") ||
        product.prices
          .filter((obj) => obj.priceType === "whitePrice")
          .join(" | "),
      colors: product.swatches.map((obj) => obj.colorName).join(" | "),
      stock: product.availability.stockState,
      coming_soon: product.availability.comingSoon,
      url: product.url,
    });
  });
  return { preparedNewDrop, preparedSale };
};

const main = async () => {
  const { newDrop, sale } = await scrapHMProducts();
  const { preparedNewDrop, preparedSale } = prepareData(newDrop, sale);

  console.log(newDrop);
};

await main();

// Prepare Data

// Push Data to DB

// Send the email notification
