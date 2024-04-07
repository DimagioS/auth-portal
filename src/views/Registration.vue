<template>
  <div>
    <Toast />
    <div class="form-container sign-up-container">
      <Card class="card">
        <template #content>
          <form @submit.prevent="register">
            <h1 class="sign-up-text">
              Регистрация
            </h1>
            <div class="card-inputs">
              <InputText
                v-model="username"
                placeholder="Имя пользователя"
                class="card-input"
              />
              <InputText
                v-model="password"
                placeholder="Пароль"
                class="card-input"
                type="password"
              />
              <InputText
                v-model="confirmPassword"
                placeholder="Подтвердите пароль"
                class="card-input"
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
                label="Зарегестрироваться"
                type="submit"
              />
              <router-link to="/login">
                <PrimeButton
                  label="Вход"
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
import { validateRegistrationInput } from '@/utils/validation';
import { registerUser } from '@/api/authService';
import { ERROR_MESSAGES, HTTP_OK, SUCCESS_MESSAGES } from '@/constants';
import toastMixin from '@/mixins/toastMixin';
import { handleError } from '@/utils/handleError';
import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import PrimeButton from 'primevue/button';

	export default {
		name: "RegistrationPage",
    components: {
    InputText,
    PrimeButton,
    Card,
    Toast
    },
    mixins: [toastMixin],
    data() {
      return {
        username: '',
        password: '',
        confirmPassword: '',
        validationError: '',
      };
    },
    watch: {
      username() {
        this.validationError = '';
      },
      password() {
        this.validationError = '';
      },
      confirmPassword() {
        this.validationError = '';
      }
    },
    methods: {
      async register() {
        const { error, isValid } = validateRegistrationInput(this.username, this.password, this.confirmPassword);
        this.validationError = error;

        if (isValid) {
          try {
            const response = await registerUser(this.username, this.password);

            if (response.status === HTTP_OK) {
              this.resetForm();
              console.log('response', response);
              this.$router.push({ name: 'LoginPage', query: { registerSuccessful: 'true', message: response?.data?.message || SUCCESS_MESSAGES.REGISTRATION_SUCCESS } });
            } else {
              this.showToast('error', 'Ошибка регистрации', ERROR_MESSAGES.REGISTRATION_ERROR);
            }
          } catch (error) {
            handleError(error, this.showToast);
          }
        }
      },
      
      resetForm() {
        this.username = '';
        this.password = '';
        this.confirmPassword = '';
      }
    }
  }
</script>

<style lang="scss" src="../assets/styles/registration.scss" scoped></style>