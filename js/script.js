"use strict";

const retry = async (asyncFunction, { retries }) => {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await asyncFunction();
      return result;
    } catch (error) {
      console.error(`Attempt №${i + 1} failed: `, error);
      if (i === retries - 1) {
        throw error;
      }
    }
  }
};

const getUserInfo = async () => {
  const response = await fetch("/api/for/user");
  const userInfo = await response.json();

  return userInfo;
};

retry(getUserInfo, { retries: 5 })
  .then((userInfo) => {
    console.log("User info: ", userInfo);
  })
  .catch((error) => {
    console.error("All attempts failed: ", error);
  });
