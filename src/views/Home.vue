<template>
  <div class="container">
    <div v-if="isLoading">
      <Card class="card">
        <template #content>
          <LoaderItem />
        </template>
      </Card>
    </div>
    <div v-else>
      <Card class="card">
        <template #title>
          {{ userInfo.username }}
        </template>
        <template #content>
          <p class="m-0">
            {{ userInfo.about }}
          </p>
          <PrimeButton
            label="Выйти"
            @click="logout"
          />
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import toastMixin from '@/mixins/toastMixin';
import { getUserInfo } from '@/api/authService';
import { ERROR_MESSAGES, TOKEN_KEY } from '@/constants';
import { removeToken } from '@/api/authService';
import Card from 'primevue/card';
import PrimeButton from 'primevue/button';
import LoaderItem from '@/components/Loader.vue'
import { handleError } from '@/utils/handleError';

export default {
  name: "HomePage",
  components: {
    Card,
    PrimeButton,
    LoaderItem
  },
  mixins: [toastMixin],
  data() {
    return {
      userInfo: {},
      isLoading: false
    };
  },
  async mounted() {
    this.isLoading = true;
    try {
      const response = await getUserInfo();
      console.log(response);
      this.userInfo = response.data.data;

    } catch (error) {
      this.showToast('error', 'Ошибка загрузки информации', ERROR_MESSAGES.SERVER_ERROR);
    } finally {
      this.isLoading = false;
    }
  },

  methods: {
    logout() {
      try {
        removeToken(TOKEN_KEY);
        this.$router.push({ name: 'LoginPage', query: { loggedOut: 'true' } });
      } catch (error) {
        handleError(error, this.showToast);
      }
    }
  }
}
</script>

<style lang="scss" src="../assets/styles/home.scss" scoped></style>