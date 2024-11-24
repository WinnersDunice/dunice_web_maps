<template>
    <div style="height: 100vh; width: 100vw; background-color: #E9FFF4">
      <!-- Шапка -->
      <div style="position: absolute; width: 100%; height: 70px; top: 0; left: 0;">
        <div style="position: absolute; width: 100%; height: 8vh; background: #A9E5CA; border-radius: 0px 0px 70px 70px;"></div>
        <div style="position: absolute; width: 65px; height: 50px; left: calc(100% - 18vw); top: 13px;">
          <button
            style="
              width: 13vw;
              height: 100%;
              background: #C5FFE2;
              border-radius: 10%;
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-items: center;
              font-family: 'Exo 2';
              font-size: 24px;
              color: #000000;
            "
            @click="handleGoToAccount"
          >
            Аккаунт
          </button>
        </div>
      </div>
  
      <div class="flex-1 flex flex-col items-center justify-center p-10" style="height: 90vh; width: 100vw;">
        <h1 style="font-family: 'Exo 2'; font-size: 48px; color: #004125; text-align: center; margin-top: 15vh;">
          Список офисов
        </h1>
  
        <!-- Список офисов -->
        <div style="width: 90%; margin-top: 20px;">
          <div v-for="office in offices" :key="office.officeid" class="office-link" @click="handleOfficeClick(office.officeid)">
            {{ office.officeid }} - {{ office.address }}
          </div>
        </div>
  
        <!-- Кнопка создания нового офиса -->
        <button
          style="
            width: 100px;
            height: 100px;
            background: #C5FFE2;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 30px;
          "
          @click="handleCreateOffice"
        >
          <img src="add-employee.svg" alt="Добавить" style="width: 69px; height: 69px;" />
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        offices: [], // Список офисов
      };
    },
    methods: {
      handleOfficeClick(officeId) {
        // Логика для обработки клика по офису
        console.log(`Офис с ID ${officeId} был выбран.`);
      },
      async handleCreateOffice() {
  try {
    const officeData = {
      address: "test",
      affiliation: 2
    };

    const response = await fetch('https://api.dunicewinners.ru/offices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Указываем, что отправляем JSON
      },
      body: JSON.stringify(officeData) // Преобразуем объект в строку JSON
    });

    if (!response.ok) {
      throw new Error('Ошибка сети при создании офиса');
    }

    const data = await response.json();
    if (data.officeid) {
      document.cookie = `new_number=${data.officeid}; path=/`;
      alert(`Новый офис создан с ID: ${data.officeid}`);

      // Меняем путь на /canvas?id=(officeid)
      window.location.href = `/canvas?id=${data.officeid}`;
    } else {
      alert('Не удалось получить ID нового офиса.');
    }
  } catch (error) {
    console.error('Ошибка при создании офиса:', error);
    alert('Произошла ошибка при создании офиса. Пожалуйста, попробуйте еще раз.');
  }
      },
      async loadOffices() {
        try {
          const response = await fetch('https://api.dunicewinners.ru/offices'); // Замените на ваш API для получения офисов
          this.offices = await response.json();
        } catch (error) {
          console.error('Ошибка при загрузке офисов:', error);
        }
      },
      handleGoToAccount() {
        // Логика для перехода на страницу аккаунта
        this.$router.push('/profile');
    },
  },
  mounted() {
    // Здесь вы можете загрузить список офисов с API
    this.loadOffices();
  },
};
</script>

<style>
.office-link {
  width: 100%;
  height: 80px; /* Увеличиваем высоту элемента списка */
  background: #C5FFE2;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Exo 2';
  font-size: 24px;
  color: #000000;
  margin-bottom: 20px;
  cursor: pointer;
  transition: background 0.3s;
}

.office-link:hover {
  background: #A9E5CA;
}
</style>
  