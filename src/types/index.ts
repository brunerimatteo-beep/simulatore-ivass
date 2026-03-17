export interface Domanda {
  id: number
  anno: number
  materia: string
  materia_codice: string
  tipo: 'assicurativo' | 'riassicurativo'
  domanda: string
  risposta_corretta: string
  risposta_errata_1: string
  risposta_errata_2: string | null
}

export interface Sessione {
  id: string
  user_id: string
  anno: number
  modulo: 'assicurativo' | 'riassicurativo' | 'completo'
  stato: 'in_corso' | 'completata' | 'abbandonata'
  punteggio_centesimi: number | null
  superata: boolean | null
  risposte_corrette: number
  risposte_errate: number
  risposte_omesse: number
  tempo_secondi: number | null
  started_at: string
  completed_at: string | null
  domande_ids: number[]
}

export interface Risposta {
  id: string
  sessione_id: string
  user_id: string
  domanda_id: number
  risposta_data: string | null
  is_corretta: boolean
  punti: number | null
  answered_at: string
}

export interface DomandaConRisposte extends Domanda {
  risposte_mischiate: string[]
}

export type TipoEsame = 'assicurativo' | 'riassicurativo'
