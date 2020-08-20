import { Links } from './links';

export interface Datos{  
    titulo: string
    abierto: boolean
    tipo: string // ["audio","video","Descargas"]
    src: string
    completed: boolean    
    duration: string
    links: Links[]
}
