import { Octokit } from "octokit";

const octokit = new Octokit({ auth: process.env.REACT_APP_ACCESS_TOKEN });
console.log(process.env.REACT_APP_ACCESS_TOKEN);

export const GET_USERNAME = (username: any) => {
  return new Promise((resolve, reject) => {
    octokit.rest.search
      .users({ q: username, per_page: 5 })
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
};

export const GET_REPOSITORY = (username: any, page: number) => {
  return new Promise((resolve, reject) => {
    octokit.rest.repos
      .listForUser({ username, per_page: 5, page, sort: "created" })
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
};

export const GET_LIMIT_INFO = () => {
  return new Promise((resolve, reject) => {
    octokit.rest.rateLimit
      .get()
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
};
