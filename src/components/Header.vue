<template>
  <header>
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-toggle target="nav-collapse" @click="toggleNav"></b-navbar-toggle>
      <h2 class="page_title">{{ pageTitle }}</h2>

      <b-navbar-nav class="ml-auto user_dropdown">
        <span class="user_name">{{ userName }}</span>
        <b-dropdown right>
          <template #button-content>
            <user-icon size="22"></user-icon>
          </template>
          <b-dropdown-item href="#">
            <user-icon size="20"></user-icon>
            <span class="icon_txt">프로필</span>
          </b-dropdown-item>
          <b-dropdown-item @click="logout">
            <log-out-icon size="20"></log-out-icon>
            <span class="icon_txt">로그아웃</span>
          </b-dropdown-item>
        </b-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </header>
</template>

<script>
import { 
  UserIcon,
  LogOutIcon
} from 'vue-feather-icons';

export default {
  name: 'Header',
  components: {
    UserIcon,
    LogOutIcon
  },
  created() {
    this.$eventBus.$on('pageTitle', (title) => {
      this.pageTitle = title
    })
  },
  data() {
    return {
      pageTitle: ''
    }
  },
  computed: {
    userName() {
      return this.$store.getters['Auth/getUserInfo'].name
    }
  },
  methods: {
    logout () {
			this.$store.dispatch('Auth/logout').then(() => {
				this.$router.push('/login')
			}).catch(err => {
				console.log(err)
			})
    },
    toggleNav() {
      this.$emit('toggleNav')
    }
  }
}
</script>

<style lang="scss">
header {
  padding-bottom: 2rem;

  .navbar {
    padding: .5rem 1rem .5rem 1.5rem;
    border-radius: 0.428rem;
    background-color: $bg-purple;

    .navbar-toggler {
      border: 0;

      &:focus { outline: none; }
    }

    .page_title {
      font-weight: 600;
      color: #fff;
    }

    .user_dropdown {
      display: inline-block;

      .user_name {
        padding-right: 5px;
        font-weight: 500;  
      }

      .dropdown {
        .dropdown-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;

          &::after { display: none; }
        }
        .dropdown-menu {
          position: absolute;
          top: 53px;
          background-color: $bg-purple;
          box-shadow: 0 4px 24px 0 rgba(0,0,0,.24);

          .dropdown-item {
            padding: .65rem 1.28rem;
            color: $gray;

            &:hover {
              color: $primary-purple;
              background-color: rgba(115,103,240,.12);
            }
          }
        }
      }
    }
  }

  @media (max-width: 991px) {
    padding-bottom: 1.2rem;

    .navbar {
      padding: .5rem .7rem;

      .page_title { padding-left: 5px; }
    }
  }
}
</style>
