import { object, string } from "yup"
import mongoose from 'mongoose'


export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    const schema = object({
      email: string().email().required('El email es requerido'),
      password: string().required('El password es requerido'),
    })
    await schema.validate({
      email: body.email,
      password: body.password,
    })


    const user = await mongoose.connection.db?.collection('users').findOne({
      email: body.email,
    })


    if (!user) {
      throw createError({
        status: 400,
        statusMessage: 'Usuario o contraseña incorrectos',
      })
    }
    // if (!user.isEmailVerified) {
    //   throw createError({
    //     status: 400,
    //     statusMessage: 'Usuario no verificado',
    //   })
    // }

    const comparePassword = await verifyPassword(user.password, body.password)

    console.log(comparePassword);

    if (!comparePassword) {
      console.log(comparePassword);
      throw createError({
        status: 400,
        statusMessage: 'Usuario o contraseña incorrectos',
      })
    }

    return {
      status: 200,
      body: {
        message: 'Usuario logueado correctamente',
        user: user,
      },
    }
  }
  catch (error) {
    throw createError({
      // @ts-ignore
      status: error?.code,
      // @ts-ignore
      statusMessage: error?.message,
    })
  }
})