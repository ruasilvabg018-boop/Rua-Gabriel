import conexao from "../config/conexao.js";

const MensalidadeSchema = conexao.Schema({
    plano: { type: Number, required: true },
    dataadesao: { type: Date, required: true },
});
const Mensalidade = conexao.model("Mensalidade", MensalidadeSchema);
export default Mensalidade