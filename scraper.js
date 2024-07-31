import { fetchProducts } from "./product.js";
import { sendMail } from "./mail.js";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

// Prepare Data to be pushed to Database
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
          category: key || "N/A",
          product_external_id: product.id || "N/A",
          name: product.productName || "N/A",
          price: price || "N/A",
          colors: colors || "N/A",
          stock: product?.availability?.stockState || "N/A",
          coming_soon: product.availability?.comingSoon || false,
          url: product.url || "N/A",
        });
      } catch (error) {
        console.log(error);
      }
    });
  });

  sale.forEach((product) => {
    preparedSale.push({
      category: product.category || "N/A",
      product_external_id: product.id || "N/A",
      name: product.productName || "N/A",
      price:
        product.prices
          .filter((obj) => obj.priceType === "redPrice")
          .join(" | ") ||
        product.prices
          .filter((obj) => obj.priceType === "whitePrice")
          .join(" | ") ||
        "N/A",
      colors: product.swatches.map((obj) => obj.colorName).join(" | ") || "N/A",
      stock: product.availability.stockState || "N/A",
      coming_soon: product.availability.comingSoon,
      url: product.url,
    });
  });
  return { preparedNewDrop, preparedSale };
};

// Push Data to Database
const pushToDB = async (preparedNewDrop, preparedSale) => {
  try {
    const newDropPromises = preparedNewDrop.map((pro) => {
      return db.newDrop.create({
        data: {
          name: pro.name.slice(0, 100),
          price: pro.price.slice(0, 100),
          colors: pro.colors.slice(0, 100),
          category: pro.category.slice(0, 100),
          stock: pro.stock.slice(0, 100),
          coming_soon: pro.coming_soon,
          url: pro.url,
          external_id: pro.product_external_id.slice(0, 100),
        },
      });
    });
    const salePromises = preparedSale.map((pro) => {
      return db.sale.create({
        data: {
          name: pro.name.slice(0, 100),
          price: pro.price.slice(0, 100),
          colors: pro.colors.slice(0, 100),
          category: pro.category.slice(0, 100),
          stock: pro.stock.slice(0, 100),
          coming_soon: pro.coming_soon || false,
          url: pro.url,
          external_id: pro.product_external_id.slice(0, 100),
        },
      });
    });
    await Promise.all(newDropPromises);
    await Promise.all(salePromises);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Main Function to execute the scraping process
export const main = async () => {
  console.log("Running the main function");
  const { newDrop, sale } = await fetchProducts();
  const { preparedNewDrop, preparedSale } = prepareData(newDrop, sale);
  const res = await pushToDB(preparedNewDrop, preparedSale);
  if (res) {
    console.log("Data Pushed Successfully");
    const res = await sendMail();
    if (res) {
      console.log("Email Sent Successfully");
    } else {
      console.log("Error in Sending Email");
    }
  } else {
    console.log("Error in Pushing Data");
  }
};
