export function haUsatoTrial(): boolean {
  return localStorage.getItem('trial_usato') === 'true'
}

export function segnaTrialUsato(): void {
  localStorage.setItem('trial_usato', 'true')
}

export function resetTrial(): void {
  localStorage.removeItem('trial_usato')
}