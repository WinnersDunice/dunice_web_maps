<template>
    <div style="height: 100vh; width: 100vw; background-color: #C4FFE2">
      <div class="flex-1 flex flex-col items-center justify-center p-10" style="height: 90vh; width: 100vw;">
        <div class="text-center mb-2">
          <h1 class="text-5xl font-bold text-blue-500 mb-2 head1 p-10">IBS OfficeMap</h1>
          <div class="p-10 rounded-lg shadow-lg w-full max-w-md md:max-w-lg" style="background-color: #E9FFF4">
            <h2 class="text-3xl mb-6 text-center">Авторизация</h2>
            <form @submit.prevent="handleSubmit">
              <div v-if="errorMessage" class="text-red-500 mb-4 text-center">{{ errorMessage }}</div>
  
              <input
                type="text"
                v-model="username"
                placeholder="Логин"
                class="border p-4 mb-4 w-full rounded text-lg"
                required
              />
  
              <input
                type="password"
                v-model="password"
                placeholder="Пароль"
                class="border p-4 mb-4 w-full rounded text-lg"
                required
              />
  
              <button class="text-white p-4 rounded w-full hover:bg-blue-600 transition duration-200 text-lg" style="background-color: #A8E4CA">
                Войти
              </button>
  
              <div class="text-sm text-center mt-4">
                Если у вас нет аккаунта, обратитесь к администратору для создания учетной записи.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        username: '',
        password: '',
        errorMessage: '', // Состояние для сообщения об ошибке
      };
    },
  
    methods: {
      checkAuthCookie() {
        const checkCookies = setInterval(() => {
          if (document.cookie.includes('auth')) {
            clearInterval(checkCookies); // Останавливаем проверку
            this.$router.push('/'); // Перенаправление на главную страницу
          }
        }, 100); // Проверяем каждые 100 мс
      },
      async handleSubmit() {
        const url = 'http://dunicewinners.ru:443/login';
        const payload = {
          username: this.username,
          email: this.email,
          password: this.password,
        };
  
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            credentials: 'include', // Включаем куки в запрос
          });
  
          if (response.ok) {
            const cookies = response.headers.get('Set-Cookie');
            if (cookies) {
              document.cookie = cookies; // Устанавливаем куки в клиенте
            }
            this.$router.push('/'); // Перенаправление на главную страницу
          } else if (response.status === 401) {
            const errorText = await response.text(); // Получаем текст ошибки
            this.errorMessage = errorText; // Устанавливаем сообщение об ошибке
          } else {
            const errorText = await response.text(); // Получаем текст ошибки
            alert(errorText || 'Ошибка при авторизации');
          }
        } catch (error) {
          console.error('Ошибка:', error);
          alert('Ошибка при выполнении запроса');
        }
      }
    }
  }
  </script>
<style scoped>
@media (max-width: 768px) {
  .bg-white {
    padding: 30px; /* Увеличиваем отступы для мобильных устройств */
  }
  .aether {
    font-size: 5rem; /* Увеличиваем размер заголовка на мобильных устройствах */
  }
  .text-2xl {
    font-size: 1.5rem; /* Увеличиваем размер описания на мобильных устройствах */
  }
}

.head1 {
  color: #0D0D0D;
  font-family: 'Varela Round', sans-serif;
}

@media (min-width: 768px) {
  .flex-1 {
    flex: 1; /* Увеличиваем ширину для больших экранов */
  }
}
</style>
