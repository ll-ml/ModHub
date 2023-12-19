import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      const res = await fetch("/webapp/session");

      if(res.status !== 200) {
        this.user = null;
      }else {
        const user = await res.json();
        this.user = user;
      }
    },
    async signUp(username, email,  password) {
      const res = await fetch("/webapp/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email,  password }),
      });
      if(res.status !== 200) {
        this.user = null;
      }else {
        const user = await res.json();
        this.user = user;
      }
    },
    async signIn(username, password) {
      const res = await fetch("/webapp/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if(res.status !== 200) {
        this.user = null;
      }else {
        const user = await res.json();
        this.user = user;
      }
    },
  async signOut() {
    const res = await fetch("/webapp/signout");

    if(res.status !== 200) {
      console.log("backend error");
    }else {
      this.user = null;
    }
  },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getRole(state) {
      return state.user.role;
    }
  },
});