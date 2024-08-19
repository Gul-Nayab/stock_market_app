const API_KEY = "cplgg09r01qjtk549ht0cplgg09r01qjtk549htg";
const API_ENDPOINT = "https://finnhub.io/api/v1";

export const fetchQuote = async (symbol) => {
  const response = await fetch(
    `${API_ENDPOINT}/quote?symbol=${symbol}&token=${API_KEY}`
  );
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
  console.log(data);
};
