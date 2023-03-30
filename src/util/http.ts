import axios from "axios";

const BACKEND_URL =
  "https://react-native-to-do-d5d86-default-rtdb.firebaseio.com";

export const storeExpense = async (expenseData: {
  description: string;
  amount: number;
  date: Date;
}) => {
  return await axios.post(`${BACKEND_URL}/expense.json`, expenseData);
};

export const fetchExpense = async () => {
  try {
    console.log("API GET ");
    const response = await axios.get(`${BACKEND_URL}/expense.json`);
    return Object.keys(response.data).map((key) => {
      return {
        id: key,
        amount: response.data[key].amount,
        description: response.data[key].description,
        date: new Date(response.data[key].date),
      };
    });
  } catch (error) {
    console.log({ error });
  }
};

export const updateExpense = (
  id: string,
  expenseData: {
    description: string;
    amount: number;
    date: Date;
  }
) => {
  console.log({ id });
  return axios.put(`${BACKEND_URL}/expense/${id}.json`, expenseData);
};

export const deleteExpense = (id: string) => {
  return axios.delete(`${BACKEND_URL}/expense/${id}.json`);
};
