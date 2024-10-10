<script lang="ts" setup>
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "~/node_modules/@nuxt/ui/dist/runtime/types/form";
const router = useRouter();

const schema = object({
  name: string().required(),
  lastName: string().required(),
  email: string().email().required(),
  phone: string().required(),
  password: string().required(),
});

type Schema = InferType<typeof schema>;

const formData = ref({
  email: "",
  password: "",
  name: "",
  lastName: "",
  phone: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const res = await $fetch("/api/auth/register", {
    method: "POST",
    body: {
      ...event.data,
    },
  });

  console.log(res);
  // router.push("/pets");
}
</script>

<template>
  <UContainer
    class="h-full flex flex-col justify-center text-center items-center"
  >
    <UForm
      :schema="schema"
      :state="formData"
      class="space-y-4 p-6 w-full max-w-md rounded-lg shadow-lg bg-slate-900"
      @submit="onSubmit"
    >
      <UHeading size="2xl">Registrate</UHeading>
      <div class="flex justify-between">
        <UFormGroup block label="Nombre" name="name">
          <UInput v-model="formData.name" />
        </UFormGroup>
        <UFormGroup block label="Apellido" name="lastName">
          <UInput v-model="formData.lastName" />
        </UFormGroup>
      </div>
      <div class="flex justify-between">
        <UFormGroup label="Email" name="email">
          <UInput v-model="formData.email" />
        </UFormGroup>
        <UFormGroup label="Telefono" name="phone">
          <UInput v-model="formData.phone" />
        </UFormGroup>
      </div>
      <UFormGroup label="Contraseña" name="password">
        <UInput v-model="formData.password" type="password" />
      </UFormGroup>
      <div class="w-100 justify-around">
        <UButton block color="primary" size="md" type="submit"
          >Registrate</UButton
        >
      </div>
      <UDivider>Continuar con</UDivider>
      <UButton block size="xl" to="/auth/verify-email">Google</UButton>
    </UForm>
  </UContainer>
</template>

<style></style>
