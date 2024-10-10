<script lang="ts" setup>
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "~/node_modules/@nuxt/ui/dist/runtime/types/form";
const router = useRouter();

const schema = object({
  email: string().email("Email invalido").required("Es obligatorio"),
  password: string()
    .min(6, "Es necesario que sea de al menos 8 caracteres")
    .required("Es obligatorio"),
});

type Schema = InferType<typeof schema>;

const formData = ref({
  email: "",
  password: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data);
  const res = await $fetch("/api/auth/login", {
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
      <UHeading size="2xl">Iniciar sesión</UHeading>

      <UFormGroup label="Email" name="email">
        <UInput v-model="formData.email" />
      </UFormGroup>
      <UFormGroup label="Contraseña" name="password">
        <UInput v-model="formData.password" type="password" />
      </UFormGroup>
      <div class="w-100 justify-around">
        <UButton block color="primary" size="md" type="submit"
          >Iniciar sesión</UButton
        >
      </div>
      <UDivider>Continuar con</UDivider>
      <UButton block size="xl" to="/auth/verify-email">Google</UButton>
    </UForm>
  </UContainer>
</template>

<style></style>
