import conexao from "../config/conexao.js";

const AparelhoSchema = conexao.Schema({
    
    nome:  {type: String },
    marca: {type: String},
    carga: {type: Number},
    foto:{type:Buffer,
         get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
         }
    }
});
const Aparelho = conexao.model("Aparelho", AparelhoSchema);
export default Aparelho