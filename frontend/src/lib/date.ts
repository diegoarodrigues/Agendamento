import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const fmt = (d: Date | string, f: string) => format(typeof d === 'string' ? new Date(d) : d, f, { locale: ptBR })
