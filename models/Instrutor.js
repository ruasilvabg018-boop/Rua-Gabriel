import conexao from "../config/conexao.js";


const InstrutorSchema = conexao.Schema({
    nome: { type: String, required: true },
    salario: { type: String, required: true },
    temponaarea: { type: Number, required: true },
    foto:{type:Buffer,
         get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
         }
    }
});
const Instrutor = conexao.model("Instrutor", InstrutorSchema);
export default Instrutor