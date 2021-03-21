import { DataStore } from "aws-amplify";
import { User } from "../src/models";

export const state = () => ({
  user: undefined,
  loaded: false
});

export const mutations = {
  setUser(state, data) {
    state.user = data;
    state.loaded = true;
  }
};

export const actions = {
  async loadUser({ commit, dispatch }, authUser) {
    try {
      console.log(authUser);
      if (!state.loaded) {
        const user = await DataStore.query(User, u =>
          u.username("eq", authUser.username)
        );
        commit("setUser", user[0]);
        dispatch("todos/loadToDos", user[0].id, { root: true });
      }
    } catch (error) {
      console.log(error);
    }
  },
  async findOrCreateUser(_, authData) {
    try {
      await DataStore.save(new User({ username: authData.username }));
    } catch (error) {
      console.error(error);
    }
  }
};
