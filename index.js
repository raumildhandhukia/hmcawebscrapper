import { fetchProducts } from "./product.js";
// Scrap Products

const prepareData = (newDrop, sale) => {
  const preparedNewDrop = [];
  const preparedSale = [];
  Object.keys(newDrop).forEach((key) => {
    const products = newDrop[key];
    products.forEach((product) => {
      let price;
      let colors;
      try {
        price =
          product.prices?.map((obj) => obj.price).join(" | ") ||
          product.price ||
          "N/A";
        colors = product.swatches?.map((obj) => obj.colorName).join(" | ");
        preparedNewDrop.push({
          category: key,
          product_external_id: product.id,
          name: product.productName,
          price,
          colors,
          stock: product?.availability?.stockState || "N/A",
          coming_soon: product.availability?.comingSoon || false,
          url: product.url,
        });
      } catch (error) {
        console.log(error);
      }
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
  const { newDrop, sale } = await fetchProducts();
  const { preparedNewDrop, preparedSale } = prepareData(newDrop, sale);
};

await main();

// Prepare Data

// Push Data to DB

// Send the email notification
