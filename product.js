import {
  NewArrivalVariables,
  NewArrivalURLs,
  SaleItems,
  headers,
} from "./data.js";
const allNewArrivalProducts = {};
let allSaleProducts = [];
// Function to fetch and process products for a single category
async function fetchCategoryProductsUsingEndpoints(
  pageId,
  categoryId,
  category = ""
) {
  let products = [];
  const initialUrl = `https://api.hm.com/search-services/v1/en_CA/listing/resultpage?page=1&sort=RELEVANCE&pageId=${pageId}&page-size=36&categoryId=${categoryId}&filters=sale:false||oldSale:false||isNew:true&touchPoint=MOBILE&skipStockCheck=false`;

  try {
    // Fetch the first page to get the total number of pages
    const initialRes = await fetch(initialUrl, headers);
    if (!initialRes.ok) {
      console.error(
        `Error fetching initial data for category ${categoryId}:`,
        initialRes.statusText
      );
      return []; // Return an empty array if the request fails
    }

    const initialData = await initialRes.json();
    products = products.concat(initialData.plpList.productList);

    const totalPages = initialData.pagination?.totalPages || 1;

    if (totalPages > 1) {
      // Fetch all subsequent pages concurrently
      const pageFetchPromises = [];
      for (let i = 2; i <= totalPages; i++) {
        const url = `https://api.hm.com/search-services/v1/en_CA/listing/resultpage?page=${i}&sort=RELEVANCE&pageId=${pageId}&page-size=36&categoryId=${categoryId}&filters=sale:false||oldSale:false||isNew:true&touchPoint=MOBILE&skipStockCheck=false`;
        pageFetchPromises.push(fetch(url, headers));
      }

      try {
        // Wait for all promises to resolve
        const pageResponses = await Promise.all(pageFetchPromises);

        // Check for errors in any of the responses
        for (const [index, res] of pageResponses.entries()) {
          if (!res.ok) {
            console.error(
              `Error fetching data for category ${categoryId} on page ${
                index + 2
              }:`,
              res.statusText
            );
          }
        }

        // Parse the JSON responses
        const pageDataPromises = pageResponses
          .filter((res) => res.ok) // Filter out failed responses
          .map((res) => res.json());
        const pageDataArray = await Promise.all(pageDataPromises);

        // Concatenate all products from subsequent pages
        for (const pageData of pageDataArray) {
          products = products.concat(pageData.plpList.productList);
        }
      } catch (error) {
        console.error(
          `Error processing page data for category ${categoryId}:`,
          error
        );
      }
    }
  } catch (error) {
    console.error(
      `Error fetching initial data for category ${categoryId}:`,
      error
    );
  }
  if (category.length > 0) {
    allNewArrivalProducts[category] = products;
  } else {
    allSaleProducts = allSaleProducts.concat(products);
  }
  return products;
}

async function fetchCategoryProductsUsingURL(url, category) {
  try {
    const initialURL = `${url}&offset=${0}&page-size=36`;
    const res = await fetch(initialURL, headers);
    if (!res.ok) {
      console.error(
        `Error fetching data from URL ${initialURL}:`,
        res.statusText
      );
      return [];
    }
    const data = await res.json();
    let products = [];
    if (data.total > 36) {
      const allNewArrivalProductsURL = `${url}&offset=0&page-size=${data.total}`;
      try {
        const allNewArrivalProductsRes = await fetch(
          allNewArrivalProductsURL,
          headers
        );
        if (!allNewArrivalProductsRes.ok) {
          console.error(
            `Error fetching data from URL ${allNewArrivalProductsURL}:`,
            allNewArrivalProductsRes.statusText
          );
          return [];
        }
        const allNewArrivalProductsData = await allNewArrivalProductsRes.json();
        products = allNewArrivalProductsData.products;
      } catch (error) {
        console.error(
          `Error fetching all products from URL ${allNewArrivalProductsURL}:`,
          error
        );
        return [];
      }
    } else {
      products = data.products;
    }
    allNewArrivalProducts[category] = products;
    return data.productList;
  } catch (error) {
    console.error(`Error fetching data from URL ${url}:`, error);
    return [];
  }
}

async function fetchallNewArrivalProducts() {
  try {
    // Fetch products for all categories concurrently
    const fetchPromises = NewArrivalVariables.map(
      ({ pageId, categoryId, category }) =>
        fetchCategoryProductsUsingEndpoints(pageId, categoryId, category)
    );

    // // Wait for all categories to be processed
    await Promise.all(fetchPromises);

    const fetchURLPromises = NewArrivalURLs.map(({ url, category }) =>
      fetchCategoryProductsUsingURL(url, category)
    );
    await Promise.all(fetchURLPromises);
    return { ...allNewArrivalProducts };
  } catch (error) {
    console.error("Error fetching all products:", error);
  }
}

async function fetchAllSaleProducts() {
  try {
    // Fetch products for all categories concurrently
    const fetchPromises = SaleItems.map(({ pageId, categoryId }) => {
      return fetchCategoryProductsUsingEndpoints(pageId, categoryId);
    });

    // // Wait for all categories to be processed
    await Promise.all(fetchPromises);
    return [...allSaleProducts];
  } catch (error) {
    console.error("Error fetching all products:", error);
  }
}

export const fetchProducts = async () => {
  const newDrop = await fetchallNewArrivalProducts();
  const sale = await fetchAllSaleProducts();
  return {
    newDrop: { ...newDrop },
    sale: [...sale],
  };
};
