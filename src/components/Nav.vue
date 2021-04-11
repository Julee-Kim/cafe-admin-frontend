<template>
  <div class="nav" :class="show ? 'show' : ''">
    <div class="nav_header">
      <b-navbar-brand href="/">
        <img src="@/assets/images/logo.png" alt="vue logo">
        <span>Admin</span>
      </b-navbar-brand>
      <button type="button" class="btn_close_nav" @click="toggleNav">
        <x-icon size="24"></x-icon>
      </button>
    </div>

     <b-navbar-nav class="menus">
      <li>
        <a href="#" v-b-toggle.navCollapse variant="primary" class="btn_dashboards">
          <home-icon size="20"></home-icon>
          <span class="icon_txt">Dashboards</span>
          <chevron-right-icon size="16" class="icon_arrow_right"></chevron-right-icon>
        </a>
        <b-collapse id="navCollapse" class="nav_collapse">
          <b-nav-item href="#">
            <circle-icon size="12"></circle-icon>
            <span class="icon_txt">eCommerce</span>
          </b-nav-item>
          <b-nav-item href="#">
            <circle-icon size="12"></circle-icon>
            <span class="icon_txt">Analytics</span>
          </b-nav-item>
        </b-collapse>
      </li>
      <li @click="toggleNav">
        <router-link to="/users">
          <user-icon size="20"></user-icon>
          <span class="icon_txt">회원 관리</span>
        </router-link>
      </li>
      <li @click="toggleNav">
        <router-link to="/products">
          <coffee-icon size="20"></coffee-icon>
          <span class="icon_txt">상품 관리</span>
        </router-link>
      </li>
      <li @click="toggleNav">
        <router-link to="/stores">
          <layout-icon size="20"></layout-icon>
          <span class="icon_txt">매장 관리</span>
        </router-link>
      </li>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  HomeIcon,
  ChevronRightIcon,
  CircleIcon,
  UserIcon,
  CoffeeIcon,
  LayoutIcon,
  XIcon
} from 'vue-feather-icons';
export default {
  name: 'Nav',
  components: {
    HomeIcon,
    ChevronRightIcon,
    CircleIcon,
    UserIcon,
    CoffeeIcon,
    LayoutIcon,
    XIcon
  },
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toggleNav() {
      this.$emit('toggleNav')
    }
  }
}
</script>

<style lang="scss">
.nav {
  position: fixed;
  display: block;
  height: 100%;
  padding: 15px;
  z-index: 100;
  font-size: 1.1rem;
  background-color: $bg-purple;

  .nav_header {
    display: flex;
    padding: .85rem .7rem 1.5rem;

    .navbar-brand {
      margin-right: auto;

      img { width: 35px; }
      span {
        display: inline-block;
        vertical-align: middle;
        padding-left: 9px;
        font-size: 22px;
        font-weight: 600;
        color: #00c086;
      }
    }
    .btn_close_nav {
      display: none;
      color: $primary-purple;
      background-color: transparent;
      border: 0;
      font-weight: 600;

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .menus {
    li {
      & > a.not-collapsed {
        background-color: $dark-purple;

        .icon_arrow_right {
          @include transform(rotate(90deg));
        }
      }

      .nav_collapse {
        margin: 5px 0;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.05);

       .nav-link { padding-left: 20px; }
      } 

      a {
        display: flex;
        align-items: center;
        padding: 10px 15px 10px 15px;
        text-align: left;
        line-height: 1.3;
        border-radius: 6px;
        transition: padding .3s ease;

        &:hover { padding-left: 20px; }
        &:focus { padding-left: 15px; }
        
        &.active {
          color: #fff;
          background: linear-gradient(118deg,$primary-purple,rgba(115,103,240,.7));
          box-shadow: 0 0 10px 1px rgba(115,103,240,.7);
        }
        span {
          margin-right: auto;
          line-height: 1;
        }
        .icon_arrow_right { transition: all .3s ease; }
      }
    }
    .btn_dashboards { border-radius: 6px; }
  }

  @media (max-width: 991px) {
    transition: left .3s ease;

    &.show { left: 0; }
    &:not(.show) {
      display: block !important;
      left: -100%;
    }

    .nav_header {
      padding: .85rem 0 1rem .4rem;
    
      .btn_close_nav { display: block; }
    }
  }
}
</style>
