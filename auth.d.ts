import {User as U} from '@/types/user'
// auth.d.ts
declare module '#auth-utils' {
  interface User extends U {
    // Add your own fields


  }

  

  interface UserSession {
    // Add your own fields
  }

  interface SecureSessionData {
    // Add your own fields
  }
}

export {}

