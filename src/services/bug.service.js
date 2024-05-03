import Axios from "axios";

var axios = Axios.create({
  withCredentials: true,
});
const BASE_URL = "http://localhost:3030/api/bug/";
// const BASE_URL = 'https://localhost/api/bug/'

import { storageService } from "./async-storage.service.js";
// import { utilService } from './util.service.js'

// const STORAGE_KEY = 'bugDB'

export const bugService = {
  query,
  getById,
  save,
  remove,
};

async function query(filterBy = {}) {
  let { data: bugs } = await axios.get(BASE_URL, { params: filterBy });

  return bugs;
}
async function getById(bugId) {
  const { data: bug } = await axios.get(BASE_URL + bugId);
  return bug;
}
function remove(bugId) {
  return axios.delete(BASE_URL + bugId);
}
async function save(bug) {
  console.log(bug);
  const method = bug._id ? "put" : "post";
  console.log(method);
  const { data: savedBug } = await axios[method](
    BASE_URL + (bug._id || ""),
    bug
  );
  return savedBug;
}
