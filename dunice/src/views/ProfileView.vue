<template>
    <div style="height: 100vh; width: 100vw; background-color: #E9FFF4">
      <!-- Шапка -->
      <div style="position: absolute; width: 100%; height: 70px; top: 0; left: 0;">
        <!-- Фон шапки -->
        <div
          style="position: absolute; width: 100%; height: 8vh; background: #A9E5CA; border-radius: 0px 0px 70px 70px;">
        </div>
        <!-- Кнопка выхода -->
        <div
          style="position: absolute; width: 65px; height: 50px; left: calc(100% - 136px); top: 13px;">
          <img src="exit.svg" alt="Выход" style="width: 100%; height: 100%; object-fit: contain;" />
        </div>
      </div>
      <div class="flex-1 flex flex-col items-center justify-center p-10"  style="height: 90vh; width: 100vw;">
        <form @submit.prevent="handleSubmit" class="text-center mb-2">
          <div v-if="errorMessage" class="text-red-500 mb-4 text-center">{{ errorMessage }}</div>
          
          <img 
            src="user-avatar.png" 
            alt="User photo"
            class="rounded-full w-1/2 h-auto mt-10" 
            style="display: block; margin-left: auto; margin-right: auto; margin-top:15vh; " />
        </form>
        <!-- Информация о пользователе -->
        <div style="text-align: center; margin-top: 20px;">
          <!-- Имя пользователя -->
          <div style="
            font-family: 'Exo 2'; 
            font-style: normal; 
            font-weight: 400; 
            font-size: 64px; 
            line-height: 77px; 
            color: #004125;
          ">
            Иванов Иван Иванович
          </div>
          <!-- Роль пользователя -->
          <div style="
            font-family: 'Exo 2'; 
            font-style: normal; 
            font-weight: 400; 
            font-size: 40px; 
            line-height: 48px; 
            color: #1E1E1E; 
            margin-top: 10px;
          ">
            администратор
          </div>
          <!-- Email -->
          <div style="
            font-family: 'Exo 2'; 
            font-style: normal; 
            font-weight: 400; 
            font-size: 48px; 
            line-height: 58px; 
            color: #000000; 
            margin-top: 15px;
          ">
            iivanov@mail.ru
          </div>
        </div>
        
        <!-- Кнопки -->
        <div
          style="
            display: flex; 
            gap: 20px; /* Отступ между кнопками */
            margin-top: 30px; /* Отступ сверху для кнопок */
          "
        >
          <!-- Кнопка 1: Редактировать офисы -->
          <button
            style="
              width: 432px; 
              height: 96px; 
              background: #C5FFE2; 
              border-radius: 70px; 
              font-family: 'Exo 2'; 
              font-size: 36px; 
              text-align: center; 
              color: #000000; 
              cursor: pointer; 
              display: flex; 
              justify-content: center; 
              align-items: center;
            "
            @click="handleEditOffices"
          >
            Редактировать офисы
          </button>
  
          <!-- Кнопка 2: Просматривать офисы -->
          <button
            style="
              width: 444px; 
              height: 96px; 
              background: #C5FFE2; 
              border-radius: 70px; 
              font-family: 'Exo 2'; 
              font-size: 36px; 
              text-align: center; 
              color: #000000; 
              cursor: pointer; 
              display: flex; 
              justify-content: center; 
              align-items: center;
            "
            @click="handleViewOffices"
          >
            Просматривать офисы
          </button>
  
        <button
          style="
            width: 101px; 
            height: 96px; 
            background: #C5FFE2; 
            border-radius: 70px; 
            cursor: pointer; 
            display: flex; 
            justify-content: center; 
            align-items: center;
          "
          @click="handleAddEmployee"
        >
          <img src="add-employee.svg" alt="Добавить" style="width: 69px; height: 69px;" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style>
.color-name {
  color: #004125;
  font-family: 'Exo 2', sans-serif;
}
</style>
