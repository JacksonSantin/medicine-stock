const rules = {
  required: (v) => !!v || 'Preencha o campo.',
  validEmail: (v) => !v || /.+@.+\..+/.test(v) || 'Informe um e-mail válido.',
}

export default rules
