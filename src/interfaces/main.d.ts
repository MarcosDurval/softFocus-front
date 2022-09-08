interface Client {
  id: string
  name: string
  email: string
  cpf: string
  type_tillage: string
  event: string
  date: Date
  longitude: number
  latitude: number
}

interface Change extends InputClient {
  handleChange: (e:React.HTMLElement) => void
}


interface ChangeGeneric {
  handleChange: (e:React.HTMLElement) => void
}

interface InputClient {
  name?: string
  email?: string
  cpf?: string
  type_tillage?: string
  event?: number
  date?: string
  longitude?: number
  latitude?: number
}

interface SendInputClient {
  name?: string
  email?: string
  cpf?: string
  type_tillage?: string
  event?: string
  date?: string
  longitude?: string
  latitude?: string
}