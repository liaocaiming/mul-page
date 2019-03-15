interface IState {
  count: number
}

const initState:IState = {
  count: 0
}

export default {
  state: initState,
  mutations: {
    ADD (state: any, number:number) {
      state.count = number + state.count
    }
  },

  actions: {
    add (options: { commit: any})  {
      const { commit } = options;
      commit('ADD', 10)
    }
  }
}