import dayjs from 'dayjs'
import { toRaw } from 'vue'

class Medicine {
  constructor({
    _id = '',
    nome_remedio = '',
    mg_remedio = '',
    dosagem = '',
    tempo = '',
    qtd_dias_para_tomar = 0,
    qtd_embalagem = 0,
    qtd_comprimidos = 0,
    dt_validade_remedio = '',
    foto = '',
    uso_continuo = false,
    qtd_diaria = 0,
    observacao = '',
  } = {}) {
    this._id = _id
    this.nome_remedio = nome_remedio
    this.mg_remedio = mg_remedio
    this.dosagem = dosagem
    this.tempo = tempo
    this.qtd_dias_para_tomar = qtd_dias_para_tomar
    this.qtd_embalagem = qtd_embalagem
    this.qtd_comprimidos = qtd_comprimidos
    this.dt_validade_remedio = dt_validade_remedio
    this.foto = foto
    this.uso_continuo = uso_continuo
    this.qtd_diaria = qtd_diaria
    this.observacao = observacao
  }

  toCreate() {
    const payload = Object.assign(this)

    if (!payload.dt_validade_remedio) return payload

    const isIsoLike =
      typeof payload.dt_validade_remedio === 'string' &&
      (payload.dt_validade_remedio.includes('T') || payload.dt_validade_remedio.includes('Z'))

    if (isIsoLike) {
      payload.dt_validade_remedio = dayjs.utc(payload.dt_validade_remedio).format('DD/MM/YYYY')
    } else {
      const parsed = dayjs(payload.dt_validade_remedio, 'DD/MM/YYYY', true)
      payload.dt_validade_remedio = parsed.isValid()
        ? parsed.format('DD/MM/YYYY')
        : dayjs(payload.dt_validade_remedio).format('DD/MM/YYYY')
    }

    return payload
  }

  toSave() {
    const payload = structuredClone(toRaw(this))

    if (payload.dt_validade_remedio) {
      const parsedDDMM = dayjs(payload.dt_validade_remedio, 'DD/MM/YYYY', true)

      let d
      if (parsedDDMM.isValid()) {
        d = parsedDDMM
      } else {
        d = dayjs(payload.dt_validade_remedio)
      }

      if (!d.isValid()) {
        console.warn('dt_validade_remedio inválida ao salvar:', payload.dt_validade_remedio)
      } else {
        payload.dt_validade_remedio = d.utc().startOf('day').toISOString()
      }
    }

    if (!payload._id) delete payload._id

    return payload
  }
}

export default Medicine
