<script setup lang="ts">
import { useAppStore } from '@/stores/index';
import PrimaryButton from '@comp/PrimaryButton.vue';
import Select from 'primevue/select';
import InputText from 'primevue/inputtext';
import { onMounted, onUpdated } from 'vue';


interface ILabel {
  text: string;
}

interface IUsers {
    id: number,
    label: ILabel[],
    labelInput: string,
    type: string,
    login: string,
    password: string | null,
}

const store = useAppStore();
const titles = [
  'Метки',
  'Тип записи',
  'Логин',
  'Пароль',
];
const types = [
  {
    name: 'Локальная',
    value: 'Локальная',
  },
  {
    name: 'LDAP',
    value: 'LDAP',
  },
];

const onInputLabel = (val:string, user:IUsers) => {
  const labelsArray = val.split(';').map(label => label.trim()).filter(label => label !== '');

  user.label = labelsArray.map(el => {
    return { text: el }
  })

  store.saveCurrentUsers(store.users);
}

const isPasswordField = (user:IUsers) => {
  if(user.type?.toUpperCase().trim() == 'LDAP') {
    user.password = null;
  }

  return user.type?.toUpperCase().trim() != 'LDAP';
};

const showPassword = (e, user:IUsers) => {
  const target = e.target;
  const inputType = target.closest('[data="password-field"]').querySelector('input');
  const showPasswordIcon = target.closest('[data="password-field"]').querySelector('[data="password-show"]');
  const hidePasswordIcon = target.closest('[data="password-field"]').querySelector('[data="password-hide"]');

  if(inputType.getAttribute('type') == 'password') {
    inputType.setAttribute('type', 'text');
    showPasswordIcon.style.display = 'none';
    hidePasswordIcon.style.display = 'block';
  } else {
    inputType.setAttribute('type', 'password');
    showPasswordIcon.style.display = 'block';
    hidePasswordIcon.style.display = 'none';
  }
}

onMounted(() => {
  store.getCurrentUsers();
  store.users.forEach((user:IUsers) => {
    user.labelInput = user.label.map(labelObj => labelObj.text).join('; ')
  })
})

onUpdated(() => {
  store.saveCurrentUsers(store.users.map(el => {
    return {
      id: el.id,
      type: el.type,
      label: el.label,
      login: el.login,
      password: el.password
    }
  }));
})
</script>

<template>
  <section class="min-h-[400px] mx-auto max-w-[1280px] px-8 w-full flex flex-col gap-5">
    <div class="flex items-center gap-5">
      <h2>Учётные записи</h2>
      <PrimaryButton
        customClass="flex items-center justify-center"
        @click="store.addNewUser()"
      >
        <i class="pi pi-plus" style="font-size: 1.3rem"></i>
      </PrimaryButton>
    </div>
    <div class="bg-[#ccc5b9] rounded-sm p-4 flex items-start relative">
      <i class="pi pi-info-circle absolute w-[2rem] left-4 top-3.5" style="font-size: 2rem"></i>
      <p class="pl-12">Для указания нескольких меток для одной пары логин/пароль используйте разделитель <b>;</b></p>
    </div>
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-4 gap-4 max-w-[calc(100%-56px)]">
        <div
          v-for="(title, index) in titles"
          :key="index"
        >
          {{ title }}
        </div>
      </div>
      
      <div class="flex flex-col gap-4">
        <div
          class="flex gap-4"
          v-for="(user, index) in store.users"
          :key="index"
        >
          <div class="grid grid-cols-4 gap-4 w-full">
            <InputText
              v-model="user.labelInput"
              @input="onInputLabel($event.target.value, user)"
              class="col-span-1"
              maxlength="50"
            />
            <Select
              class="col-span-1"
              v-model="user.type"
              :options="types"
              optionLabel="name"
              optionValue="value"
              placeholder="Выберите тип"
            />
            <InputText
              v-model="user.login"
              class="col-span-1"
              :class="{'col-span-2': !isPasswordField(user)}"
              maxlength="100"
            />
            <div
              class="flex relative"
              data="password-field"
              v-if="isPasswordField(user)"
            >
              <InputText
                v-model="user.password"
                maxlength="100"
                type="password"
                class="w-full !pr-[40px]"
              />
              <div @click="showPassword($event, user)">
                <i class="pi pi-eye absolute right-2 top-[50%] -translate-[50%] cursor-pointer" data="password-show"></i>
                <i class="pi pi-eye-slash absolute right-2 top-[50%] -translate-[50%] cursor-pointer hidden" data="password-hide"></i>
              </div>
            </div>
          </div>

          <PrimaryButton
            customClass="btn_delete w-[40px] flex items-center justify-center "
            @click="store.deleteUser(user.id)"
          >
            <i class="pi pi-trash" style="font-size: 1.3rem"></i>
          </PrimaryButton>
        </div>
      </div>

    </div>
  </section>
</template>

<style>
[data="password-field"] .pi-eye-slash {
  display: none;
}
</style>