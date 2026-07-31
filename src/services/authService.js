import { fakeDelay } from "../api/fakeDelay";

// DUMMY ONLY: stands in for Cognito. Any username/password succeeds - the
// role picked on the login form decides which pages are shown.
//
// When Cognito is ready, replace the body of these two functions with
// real calls (e.g. Amplify's Auth.signIn / Auth.signUp), keeping the same
// function names and return shape - nothing outside this file changes.

export async function login({ username, role }) {
  if (!username) {
    throw new Error("Please enter a username.");
  }
  const user = { username, role, name: username };
  return fakeDelay(user, 400);
}

export async function register({ username, role }) {
  if (!username) {
    throw new Error("Please enter a username.");
  }
  const user = { username, role, name: username };
  return fakeDelay(user, 400);
}
