<template>
  <div class="App">
    <amplify-authenticator
      v-if="authState !== 'signedin'"
      class="container"
      handle-submit="createNewUser"
    />

    <div
      v-if="authState === 'signedin' && authUser"
      class="h-screen flex overflow-hidden bg-gray-100"
    >
      <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
      <div v-show="showSidebar" class="md:hidden">
        <div class="fixed inset-0 flex z-40">
          <!--
        Off-canvas menu overlay, show/hide based on off-canvas menu state.

              Entering: "transition-opacity ease-linear duration-300"
                From: "opacity-0"
                To: "opacity-100"
              Leaving: "transition-opacity ease-linear duration-300"
                From: "opacity-100"
                To: "opacity-0"
            -->
          <div class="fixed inset-0" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
          </div>
          <!--
        Off-canvas menu, show/hide based on off-canvas menu state.

        Entering: "transition ease-in-out duration-300 transform"
          From: "-translate-x-full"
          To: "translate-x-0"
        Leaving: "transition ease-in-out duration-300 transform"
          From: "translate-x-0"
          To: "-translate-x-full"
         -->
          <div
            class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-purple-800"
          >
            <div class="absolute top-0 right-0 -mr-12 pt-2">
              <button
                class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                @click="closeSidebar"
              >
                <span class="sr-only">Close sidebar</span>
                <!-- Heroicon name: outline/x -->
                <svg
                  class="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <!-- TODO: replace with official logo -->
            <div class="flex-shrink-0 flex items-center px-4">
              <img
                class="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg"
                alt="Workflow"
              />
            </div>
            <div class="mt-5 flex-1 h-0 overflow-y-auto">
              <nav class="px-2 space-y-1">
                <!-- Current: "bg-indigo-800 text-white", Default: "text-purple-100 hover:bg-purple-600" -->
                <nuxt-link
                  to="/"
                  class="text-purple-100 hover:bg-purple-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                >
                  <svg
                    class="mr-4 h-6 w-6 text-purple-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  Inbox
                </nuxt-link>
                <nuxt-link
                  to="/focus"
                  class="text-purple-100 hover:bg-purple-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                >
                  <!-- Heroicon name: outline/users -->
                  <svg
                    class="mr-4 h-6 w-6 text-purple-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  Focus
                </nuxt-link>

                <nuxt-link
                  to="/matrix"
                  class="text-purple-100 hover:bg-purple-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                >
                  <svg
                    class="mr-4 h-6 w-6 text-purple-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                    />
                  </svg>
                  Prioritize
                </nuxt-link>
                <nuxt-link
                  to="/calendar"
                  class="text-purple-100 hover:bg-purple-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                  ><svg
                    class="mr-4 h-6 w-6 text-purple-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Calendar</nuxt-link
                >
              </nav>
              <div class="flex-1">
                <list-select />
              </div>
            </div>
          </div>
          <div class="flex-shrink-0 w-14" aria-hidden="true">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </div>

      <!-- Static sidebar for desktop -->
      <div class="hidden bg-purple-800 md:flex md:flex-shrink-0">
        <div class="flex flex-col w-64">
          <!-- Sidebar component, swap this element with another sidebar if you like -->
          <div class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <div class="flex items-center flex-shrink-0 px-4">
              <img
                class="h-12 w-auto"
                src="~/assets/logo/logo.svg"
                alt="I Need A Name"
              />
              <h1></h1>
            </div>
            <div class="mt-5 flex-1 flex flex-col justify-between">
              <nav class="px-2 space-y-3">
                <!-- Current: "bg-indigo-800 text-white", Default: "text-purple-100 hover:bg-purple-600" -->
                <nuxt-link
                  to="/"
                  class="text-purple-100 hover:bg-purple-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <svg
                    class="mr-3 h-6 w-6 text-purple-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  Inbox
                </nuxt-link>

                <nuxt-link
                  to="/focus"
                  class="text-purple-100 hover:bg-purple-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <svg
                    class="mr-3 h-6 w-6 text-purple-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Focus
                </nuxt-link>

                <nuxt-link
                  to="/matrix"
                  class="text-purple-100 hover:bg-purple-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  @click.native="setCurrentList('default')"
                >
                  <svg
                    class="mr-3 h-6 w-6 text-purple-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                    />
                  </svg>
                  Prioritize
                </nuxt-link>
                <nuxt-link
                  to="/calendar"
                  class="text-purple-100 hover:bg-purple-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  ><svg
                    class="mr-3 h-6 w-6 text-purple-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Calendar</nuxt-link
                >
              </nav>
              <div class="flex-1">
                <list-select />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-0 flex-1 overflow-hidden">
        <div class="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            @click="openSidebar"
          >
            <span class="sr-only">Open sidebar</span>
            <!-- Heroicon name: outline/menu-alt-2 -->
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          <div class="flex-1 px-4 flex justify-between">
            <div class="flex-1 flex">
              <form class="w-full flex md:ml-0" action="#" method="GET">
                <label for="search_field" class="sr-only">Search</label>
                <div
                  class="relative w-full text-gray-400 focus-within:text-gray-600"
                >
                  <div
                    class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                  >
                    <!-- Heroicon name: solid/search -->
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="search_field"
                    class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search"
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>
            <div class="ml-4 flex items-center md:ml-6">
              <button
                class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="sr-only">View notifications</span>
                <!-- Heroicon name: outline/bell -->
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              <!-- Profile dropdown -->
              <div class="ml-3 relative">
                <div>
                  <button
                    type="button"
                    class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                    @click="toggleMenu"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=gFvaPyW7Q7&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>

                <!--
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
                <div
                  v-show="showMenu"
                  class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div class="px-4 py-3" role="none">
                    <p class="text-sm" role="none">
                      Signed in as
                    </p>
                    <p
                      class="text-sm font-medium text-gray-900 truncate"
                      role="none"
                    >
                      {{ authUser.attributes.email }}
                    </p>
                  </div>
                  <div class="py-1" role="none">
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      >Account settings</a
                    >
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                      @click="clearLocalData"
                      >Clear data</a
                    >
                  </div>
                  <div class="py-1" role="none">
                    <form method="POST" action="#" role="none">
                      <button
                        type="submit"
                        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                        @click="signOut"
                      >
                        Sign out
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main
          class="flex-1 relative overflow-y-auto focus:outline-none"
          tabindex="0"
        >
          <div class="py-6">
            <!-- <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div> -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div class="flex flex-col items-start mt-8">
                <!-- <p v-show="!isOnline">
                  You are offline
                </p>
                <p v-show="isSynced">
                  Data synced!
                </p> -->
                <div
                  v-if="todos && this.$route.name === 'index'"
                  class="w-full md:w-1/2"
                >
                  <todo-input />
                  <todo-list class="mx-4 mt-4" :todos="defaultTodos" />
                </div>
                <NuxtChild :user="currentUser" :todos="todos" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import { Auth, Hub, DataStore }  from 'aws-amplify';
import ListSelect from "~/components/lists/ListSelect.vue";
import TodoList from "~/components/todos/TodoList.vue";
import TodoInput from "~/components/todos/TodoInput.vue";

export default {
  key(route) {
    return route.fullPath
  },
  name: 'App',
  components: {
    ListSelect,
    TodoList,
    TodoInput
  },
  data() {
    return {
      isOnline: false,
      isSynced: false,
      showMenu: false,
      showSidebar: false
    }
  },
  watch: {
    currentUser: function() {
      if (this.currentUser) {
        this.loadTodos()
        this.loadLists();
      }
    }
  },
  computed: {
    ...mapState({
      authState: state => state.auth.authState,
      authUser: state => state.auth.user,
      currentUser: state => state.user.user,
      todos: state => state.todos.todos
    }),
    ...mapGetters('auth', ['isSignedIn']),
    ...mapGetters('todos', ['defaultTodos'])
  },
  created() {
    this.checkAuthState();
    Hub.listen('datastore', (data) => {
      if (data.payload.event === 'networkStatus') {
        this.isOnline = data.payload.data.active;
        if (!data.payload.data.active) {
          this.isSynced = false;
        }
      }
      if (data.payload.data?.isDeltaSync) {
       this.isSynced = data.payload.data.isDeltaSync
      }
    })
  },
  beforeDestroy() {
    return this.checkAuthState();
  },
  methods: {
    ...mapActions('auth', ['checkAuthState']),
    ...mapActions('user', ['loadUser']),
    ...mapActions('todos', ['loadTodos']),
    ...mapActions('lists', ['loadLists']),
    ...mapMutations("lists", ["setCurrentList"]),
    signOut: async () => Auth.signOut(),
    async clearLocalData() {
      await DataStore.clear();
    },
    toggleMenu() {
      return this.showMenu = !this.showMenu;
    },
    openSidebar() {
      this.showSidebar = true;
    },
    closeSidebar() {
      this.showSidebar = false;
    }
  }
}
</script>
<style>
amplify-authenticator {
  width: 50%;
}
</style>
