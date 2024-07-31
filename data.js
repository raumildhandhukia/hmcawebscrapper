// Description: This file contains the data for the application
// Variant 1
export const NewArrivalVariables = [
  {
    pageId: "/ladies/new-arrivals/clothes",
    categoryId: "ladies_newarrivals_clothes",
    category: "Women Clothes",
  },
  {
    pageId: "/ladies/new-arrivals/shoes-accessories",
    categoryId: "ladies_newarrivals_shoesacc",
    category: "Women Shoes & Accessories",
  },
  {
    pageId: "/sport/women/new-arrivals",
    categoryId: "sportswear_newarrivals_women",
    category: "Women Sports",
  },
  {
    pageId: "/ladies/new-arrivals/underwear-nightwear",
    categoryId: "ladies_newarrivals_underwear_nightwear",
    category: "Women Underwear & Nightwear",
  },
  {
    pageId: "/men/new-arrivals/clothes",
    categoryId: "men_newarrivals_clothes",
    category: "Men Clothes",
  },
  {
    pageId: "/men/new-arrivals/shoes",
    categoryId: "men_newarrivals_shoes",
    category: "Men Shoes",
  },
  {
    pageId: "/men/new-arrivals/accessories",
    categoryId: "men_newarrivals_accessories",
    category: "Men Accessories",
  },
  {
    pageId: "/men/new-arrivals/sportswear",
    categoryId: "men_newarrivals_sportswear",
    category: "Men Sportswear",
  },
  {
    pageId: "/kids/new-arrivals/2-8-years",
    categoryId: "kids_girls_boys_newarrivals",
    category: "Kids 2-8 Years",
  },
  {
    pageId: "/kids/new-arrivals/9-14-years",
    categoryId: "kids_olderkids_newarrivals",
    category: "Kids 9-14 Years",
  },
];

// Variant 2
export const NewArrivalURLs = [
  {
    url: "https://www2.hm.com/en_ca/baby/new-in/baby/_jcr_content/main/productlisting.display.json?sort=stock&image-size=small&image=stillLife",
    category: "Baby",
  },

  {
    url: "https://www2.hm.com/en_ca/baby/new-in/newborn/_jcr_content/main/productlisting.display.json?sort=newProduct&image-size=small&image=stillLife",
    category: "Newborn",
  },
];

export const SaleItems = [
  {
    pageId: "/men/sale/view-all",
    categoryId: "men_all",
  },
  {
    pageId: "/ladies/sale/view-all",
    categoryId: "ladies_all",
  },
];

export const headers = {
  headers: {
    accept: "application/json",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    pragma: "no-cache",
    priority: "u=1, i",
    "sec-ch-ua":
      '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": '"Android"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "x-customer-key": "6534be1b-dd4f-47d7-96ca-af65f5e91db3",
    "x-session-key": "6534be1b-dd4f-47d7-96ca-af65f5e91db3",
    Referer: "https://www2.hm.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
  body: null,
  method: "GET",
};
