export function haUsatoTrial(): boolean {
  return localStorage.getItem('trial_usato') === 'true'
}

export function segnaTrialUsato(): void {
  localStorage.setItem('trial_usato', 'true')
}

export function haPagato(): boolean {
  return localStorage.getItem('accesso_pagato') === 'true'
}

export function segnaAccessoPagato(): void {
  localStorage.setItem('trial_usato', 'true')
  localStorage.setItem('accesso_pagato', 'true')
}

export function resetTrial(): void {
  localStorage.removeItem('trial_usato')
  localStorage.removeItem('accesso_pagato')
}

export function navigaHome(navigate: (path: string) => void) {
  navigate('/simulazione')
}

export function puoSimulare(): boolean {
  return !haUsatoTrial() || haPagato()
}