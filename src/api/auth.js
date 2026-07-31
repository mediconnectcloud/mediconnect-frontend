import { fakeDelay } from "./fakeDelay";

// DUMMY ONLY: this file stands in for Cognito.
// Any username/password combination succeeds - the role picked on the
// login form decides which pages are shown. Once Cognito is wired up,
// only this file changes; pages that use login()/register() do not.

export async function login({ username, role }) {
  if (!username) {
    throw new Error("Please enter a username.");
  }
  const user = {
    username,
    role, // "patient" | "provider" | "admin"
    name: username,
  };
  return fakeDelay(user, 400);
}

export async function register({ username, role }) {
  if (!username) {
    throw new Error("Please enter a username.");
  }
  const user = { username, role, name: username };
  return fakeDelay(user, 400);
}
