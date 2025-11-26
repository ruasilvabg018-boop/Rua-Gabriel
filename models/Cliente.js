import conexao from "../config/conexao.js";

const ClienteSchema = conexao.Schema({
    
    nome: { type: String, required: true },
    tempodetreino: { type: Number, required: true },
    email: { type: String, required: true },
    foto:{type:Buffer,
         get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
         }
    }
});
const Cliente = conexao.model("Cliente", ClienteSchema);
export default Cliente