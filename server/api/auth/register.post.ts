import mongoose from 'mongoose'
import { number, object, string } from 'yup'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const schema = object({
      name: string().required('El nombre es requerido'),
      lastName: string().required('El apellido es requerido'),
      email: string().email().required('El email es requerido'),
      phone: string().required('El teléfono es requerido'),
      password: string().required('El password es requerido'),
    })
    body.password = await hashPassword(body.password)

    // random token of numbers to validate the email of the user
    body.token = Math.floor(100000 + Math.random() * 900) + ''
    await schema.validate({
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      password: body.password,
    })


    const user = await mongoose.connection.db?.collection('users').insertOne({
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      password: body.password,
      phone: body.phone,
      token: body.token,
    })

    return {
      status: 201,
      body: {
        message: 'Usuario creado correctamente',
        user: user,
      },
    }


  } catch (error) {
    throw createError({
      // @ts-ignore
      status: error?.code,
      // @ts-ignore 
      statusMessage: error?.message,
    })
  }

})