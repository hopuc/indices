<template>
  <q-layout view="hHh Lpr lff">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn flat round icon="menu" @click="drawer=!drawer" />

        <q-toolbar-title>
          <!-- <q-avatar>
            <img style="width: 26px" src="https://test.hopuc.com/video/img/logo.svg">
          </q-avatar> -->
          Indices
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="Table" />
        <q-route-tab to="/chart" label="Chart" />
      </q-tabs>
    </q-header>

    <!-- <q-drawer show-if-above v-model="left" side="left" bordered>

    </q-drawer> -->

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="240"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit" style="max-width: 350px">

        <q-list bordered padding>

        <q-item-label header>设置</q-item-label>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>简称</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-toggle color="blue" v-model="alias" val="battery" />
          </q-item-section>
        </q-item>

        <!-- <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Friend request</q-item-label>
            <q-item-label caption>Allow notification</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-toggle color="green" v-model="notif2" val="friend" />
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Picture uploaded</q-item-label>
            <q-item-label caption>Allow notification when uploading images</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-toggle color="red" v-model="notif3" val="picture" />
          </q-item-section>
        </q-item> -->

        </q-list>

        <q-list v-for="(menuItem, index) in menuList" tag="label" :key="index">
          <q-item clickable :active="menuItem.label===''" v-ripple>
            <!-- <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section> -->
            <q-item-section>
              {{menuItem.label}}
            </q-item-section>
            <!-- <q-item-section side top>
              <q-toggle color="red" v-model="notif3" val="picture" />
            </q-item-section> -->
          </q-item>
         <q-separator v-if="menuItem.separator" />
        </q-list>

      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      alias: true,
      notif1: true,
      notif2: true,
      notif3: false,
      menuList: [
        {
          icon: 'delete',
          label: 'Trash',
          separator: false
        },
        {
          icon: 'settings',
          label: 'Settings',
          separator: false
        },
        {
          icon: 'info',
          iconColor: 'primary',
          label: 'About',
          separator: false
        }
      ],
    }
  }
}
</script>
