import { useState } from 'react'
import { FaUserAstronaut, FaPhone, FaUsers, FaRocket, FaGift, FaStar } from 'react-icons/fa'
import { GiAstronautHelmet, GiSpaceship, GiRingedPlanet } from 'react-icons/gi'
import { IoMdPlanet } from 'react-icons/io'

interface FormData {
  nome: string
  telefone: string
  acompanhantes: 'sim' | 'nao'
  qtdAcompanhantes: number
  observacoes: string
}

// Número real da sua irmã (formato internacional sem +, sem espaços)
const WHATSAPP_NUMERO_IRMA = '5511983097271'

export function InvitationForm() {
  const [data, setData] = useState<FormData>({
    nome: '',
    telefone: '',
    acompanhantes: 'nao',
    qtdAcompanhantes: 1,
    observacoes: ''
  })
  const [enviando, setEnviando] = useState(false)
  const [sucesso, setSucesso] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [mensagensErro, setMensagensErro] = useState<string[]>([])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      [name]: name === 'qtdAcompanhantes' ? Number(value) : value
    }))
  }

  function validarTelefone(tel: string) {
    const digits = tel.replace(/\D/g, '')
    // Validação básica Brasil: 10 ou 11 dígitos; se 11 exige 9 após DDD
    if (!(digits.length === 10 || digits.length === 11)) return false
    if (digits.length === 11 && digits[2] !== '9') return false
    return true
  }

  function montarMensagem() {
    const linhas = [
      '🚀 CONFIRMAÇÃO – Aniversario de 1 ano do Benicio🎉',
      `👤 Convidado: ${data.nome}`,
      `📞 Telefone: ${data.telefone}`,
      `🧑‍🚀 Acompanhantes: ${data.acompanhantes === 'sim' ? `Sim (Qtd: ${data.qtdAcompanhantes})` : 'Não'}`,
      data.observacoes ? `📝 Observações: ${data.observacoes}` : null,
      'Obrigado!'
    ].filter(Boolean)
    return linhas.join('\n')
  }

  function enviar() {
    const errosLocal: string[] = []
    if (!data.nome.trim()) {
      errosLocal.push('Informe o nome do convidado.')
    }
    if (!validarTelefone(data.telefone)) {
      errosLocal.push('Telefone inválido. Use DDD + número (10 ou 11 dígitos, se 11 começa com 9).')
    }
    if (data.acompanhantes === 'sim' && data.qtdAcompanhantes < 1) {
      errosLocal.push('Quantidade de acompanhantes deve ser pelo menos 1.')
    }
    if (errosLocal.length) {
      setMensagensErro(errosLocal)
      return
    }

    setEnviando(true)
    const mensagem = montarMensagem()
    const encoded = encodeURIComponent(mensagem)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMERO_IRMA}?text=${encoded}`
    window.open(whatsappUrl, '_blank')
    setSucesso(true)
    setEnviando(false)
  }

  if (showIntro) {
    return (
      <div className="intro-modal">
        <div className="intro-card">
          <div className="astronaut-icons">
            <GiSpaceship /> <FaUserAstronaut /> <GiAstronautHelmet /> <FaRocket /> <IoMdPlanet />
          </div>
          <h1>Vamos lá! 🚀</h1>
          <p>
            Confirme sua presença para o <strong>Aniversario do Benício</strong>.<br />
            Preencha os dados e enviaremos direto pelo WhatsApp.
          </p>
          <button className="btn-comecar" onClick={() => setShowIntro(false)}>Começar</button>
        </div>
      </div>
    )
  }

  return (
    <div className="convite-container">
      <h1 className="titulo"><FaRocket /> Convite: Aniversario do Benício <FaGift /></h1>
      <div className="astronaut-row">
        <FaStar className="astronaut-badge" />
        <GiSpaceship className="astronaut-badge" />
        <FaUserAstronaut className="astronaut-badge" />
        <GiAstronautHelmet className="astronaut-badge" />
        <GiRingedPlanet className="astronaut-badge" />
        <IoMdPlanet className="astronaut-badge" />
        <FaStar className="astronaut-badge" />
      </div>
      <p className="subtitulo"></p>
      <form
        className="form-benicio"
        onSubmit={e => {
          e.preventDefault()
          enviar()
        }}
      >
        <label>
          Nome do convidado
          <div className="input-icon-wrapper">
            <FaUserAstronaut className="icon" />
            <input
              name="nome"
              placeholder="Nome completo"
              value={data.nome}
              onChange={handleChange}
              required
            />
          </div>
        </label>

        <label>
          Telefone (DDD + número)
          <div className="input-icon-wrapper">
            <FaPhone className="icon" />
            <input
              name="telefone"
              placeholder="(11) 98888-7777"
              value={data.telefone}
              onChange={e => {
                const raw = e.target.value
                const digits = raw.replace(/\D/g, '').slice(0, 11)
                // Formatação dinâmica (DDD) + 5 + 4
                let formatado = digits
                if (digits.length >= 2) {
                  formatado = `(${digits.slice(0,2)}) ${digits.slice(2)}`
                }
                if (digits.length >= 7) {
                  // (DD) 9XXXXYYYY -> separar antes dos últimos 4
                  const ddd = digits.slice(0,2)
                  const resto = digits.slice(2)
                  const parte1 = resto.slice(0, resto.length - 4)
                  const parte2 = resto.slice(resto.length - 4)
                  formatado = `(${ddd}) ${parte1}-${parte2}`
                }
                setData(prev => ({ ...prev, telefone: formatado }))
              }}
              required
            />
          </div>
        </label>

        <fieldset className="fieldset-acompanhantes">
          <legend><FaUsers /> Levará acompanhantes?</legend>
          <label className="radio-inline">
            <input
              type="radio"
              name="acompanhantes"
              value="sim"
              checked={data.acompanhantes === 'sim'}
              onChange={handleChange}
            /> Sim
          </label>
          <label className="radio-inline">
            <input
              type="radio"
              name="acompanhantes"
              value="nao"
              checked={data.acompanhantes === 'nao'}
              onChange={handleChange}
            /> Não
          </label>
        </fieldset>

        {data.acompanhantes === 'sim' && (
          <label>
            Quantidade de acompanhantes
            <input
              type="number"
              name="qtdAcompanhantes"
              min={1}
              value={data.qtdAcompanhantes}
              onChange={handleChange}
              required
            />
          </label>
        )}

        <label>
          Nome dos acompanhantes (obrigatorio)
          <textarea
            name="observacoes"
            rows={3}
            placeholder="Ex: João, Maria, Vitor..."
            value={data.observacoes}
            onChange={handleChange}
          />
        </label>

        {mensagensErro.length > 0 && (
          <ul className="erros-lista">
            {mensagensErro.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        )}
        <button type="submit" disabled={enviando} className="btn-enviar">
          {enviando ? 'Enviando...' : 'Enviar pelo WhatsApp'}
        </button>
        {sucesso && (
          <div className="sucesso-msg">✅ Mensagem preparada no WhatsApp.</div>
        )}
      </form>
      <div className="nota">
        <p>
          Após confirmar, será aberta uma janela do WhatsApp com a mensagem pronta. Basta enviar se estiver tudo certo.
        </p>
        <p>
          Para automações adicionais (ex.: salvar em planilha), pode ser integrado futuramente a um backend ou serviço como EmailJS.
        </p>
      </div>
    </div>
  )
}

export default InvitationForm
