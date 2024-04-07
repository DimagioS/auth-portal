<template>
  <div>
    <Toast />
    <div class="form-container sign-in-container">
      <Card class="card">
        <template #content>
          <form @submit.prevent="login">
            <h1 class="sign-in-text">
              Вход
            </h1>
            <div class="card-inputs">
              <InputText
                v-model="username"
                class="input"
                placeholder="Имя пользователя"
              />
              <InputText
                v-model="password"
                class="input"
                placeholder="Пароль"
                type="password"
              />
              <p
                v-if="validationError"
                class="error"
              >
                {{ validationError }}
              </p>
            </div>
            <div class="card-btns">
              <PrimeButton
                label="Войти"
                type="submit"
              />
              <router-link to="/register">
                <PrimeButton
                  label="Регистрация"
                  severity="success"
                />
              </router-link>
            </div>
          </form>
        </template>
      </Card>
    </div>
  </div>
</template>
  
<script>
import { validateLoginInput } from '@/utils/validation';
import { authenticateUser, saveToken } from '@/api/authService'
import { ERROR_MESSAGES, HTTP_OK, SUCCESS_MESSAGES } from '@/constants';
import toastMixin from '@/mixins/toastMixin';
import { handleError } from '@/utils/handleError'
import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import PrimeButton from 'primevue/button';

	export default {
		name: "LoginPage",
    components: {
      Toast,
      InputText,
      PrimeButton,
      Card
    },
    mixins: [toastMixin],
    data() {
      return {
        username: '',
        password: '',
        validationError: ''
      };
    },
    watch: {
      username() {
        this.validationError = '';
      },
      password() {
        this.validationError = '';
      }
    },
    mounted() {
      if (this.$route.query.loggedOut) {
        this.showToast('success', 'Вы вышли', SUCCESS_MESSAGES.LOGOUT_SUCCESS, 2000);
        this.$router.replace({ query: null });
      } else if (this.$route.query.registerSuccessful) {
        this.showToast('success', 'Регистрация успешна', this.$route.query.message);
        this.$router.replace({ query: null });
      }
    },
    methods: {
      async login() {
        const { error, isValid } = validateLoginInput(this.username, this.password);
        this.validationError = error;

        if (isValid) {
          try {
            const response = await authenticateUser(this.username, this.password);

            if (response.status === HTTP_OK) {
              this.resetForm();
              this.showToast('success', 'Успешный вход в систему', SUCCESS_MESSAGES.LOGIN_SUCCESS);
              saveToken(response.data.token);
              this.$router.push('/');
            } else {
              this.showToast('error', 'Ошибка входа в систему', ERROR_MESSAGES.TOKEN_ERROR);
            }

          } catch (error) {
            handleError(error, this.showToast);
          }
        }
      },
      
      resetForm() {
        this.username = '';
        this.password = '';
      }
    },
	}
</script>

<style lang="scss" src="../assets/styles/login.scss" scoped></style>