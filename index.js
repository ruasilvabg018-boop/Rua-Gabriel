import express from 'express'
const app = express();
import Aparelho from './models/Aparelho.js';
import Instrutor from './models/Instrutor.js';
import Cliente from './models/Cliente.js';
import Mensalidade from './models/Mensalidade.js';

app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')

import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

//Liberar acesso a pasta public
import { fileURLToPath } from 'url';
import { dirname } from 'path';


// Converte o caminho do arquivo atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + '/public'))

//rotas
app.get('/', (req, res) => {
    res.render("index")
})

app.get('/Aparelho/lst', async (req, res) => {
    const Aparelhos = await Aparelho.find()
    console.log(Aparelhos);
    res.render("Aparelho/lst", {Aparelhos:Aparelhos})
})

app.post('/Aparelho/lst', async (req, res) => {
    console.log(req.body.carga);
    const Aparelhos = await Aparelho.find({ $or: [
        {
            nome: {
                $regex: req.body.nome,
                $options: "i"
            }
        },
        {
            marca: {
                $regex: req.body.nome,
                $options: "i"
            }
        },
        {
            /*carga: {
                $regex: req.body.nome,
                $options: "i"
            }*/
        }
    ]
})
    res.render("Aparelho/lst", {Aparelhos:Aparelhos})
})





app.get('/Aparelho/add', async (req, res) => {
    res.render("Aparelho/add")
})



app.post('/Aparelho/add/ok', upload.single("foto"), async(req, res) => {
    await Aparelho.create({
      nome: req.body.nome,
      foto: req.file.buffer,
      marca: req.body.marca,
      carga: req.body.carga
    })
  res.render("Aparelho/addok");
})



app.get('/Aparelho/edt/:id', async (req, res) => {
const aparelho = await Aparelho.findById(req.params.id)
res.render("Aparelho/edt", {aparelho})
})

app.post('/Aparelho/edt/:id', async (req, res) => {
const aparelho = await Aparelho.findByIdAndUpdate(req.params.id, req.body)
res.render("Aparelho/edtok")
})


app.get('/Aparelho/del/:id', async (req, res) => {
const Aparelhos = await Aparelho.findByIdAndDelete(req.params.id)
res.redirect("/Aparelho/lst")
})



///////////////////////////////////////////////////////////////////////////




app.get('/Cliente/lst', async (req, res) => {
    const Clientes = await Cliente.find()
    res.render("Cliente/lst", {Clientes:Clientes})
})
app.post('/Cliente/lst', async (req, res) => {
    const Clientes = await Cliente.find({
nome: {
$regex: req.body.nome, //ao inves de ana eh o valor do input que tu digita no campo de busca
$options: "i"
}}
)
    res.render("Cliente/lst", {Clientes:Clientes})
})

app.get('/Cliente/add', async (req, res) => {
    res.render("Cliente/add")
})


app.post('/Cliente/add/ok', upload.single("foto"), async (req, res) => {
     await Cliente.create({
      nome: req.body.nome,
      foto: req.file.buffer,
      tempodetreino: req.body.tempodetreino,
      email: req.body.email
    })
  res.render("Cliente/addok");
})


app.get('/Cliente/edt/:id', async (req, res) => {
const cliente = await Cliente.findById(req.params.id)
res.render("Cliente/edt", {cliente})
})

app.post('/Cliente/edt/:id', async (req, res) => {
const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body)
res.render("Cliente/edtok")
})


app.get('/Cliente/del/:id', async (req, res) => {
const Clientes = await Cliente.findByIdAndDelete(req.params.id)
res.redirect("/Cliente/lst")
})






////////////////////////////////////////////////////////////////////////////







app.get('/Instrutor/lst', async (req, res) => {
    const Instrutores = await Instrutor.find()
    res.render("Instrutor/lst", {Instrutores:Instrutores})
})

app.post('/Instrutor/lst', async (req, res) => {
    console.log(req.body.nome);
    console.log(req.body.salario);
    const Instrutores = await Instrutor.find({
nome: {
$regex: req.body.nome, //ao inves de ana eh o valor do input que tu digita no campo de busca
$options: "i"
}
})
    res.render("Instrutor/lst", {Instrutores:Instrutores})
})




app.get('/Instrutor/add', async (req, res) => {
    res.render("Instrutor/add")
})

app.post('/Instrutor/add/ok', upload.single("foto"), async (req, res) => {
    //await Instrutor.create(req.query)

    await Instrutor.create({
        nome: req.body.nome,
        foto: req.file.buffer,
        salario: req.body.salario,
        temponaarea: req.body.temponaarea
})
  res.render("Instrutor/addok");
})


app.get('/Instrutor/edt/:id', async (req, res) => {
const instrutor = await Instrutor.findById(req.params.id)
res.render("Instrutor/edt", {instrutor})
})

app.post('/Instrutor/edt/:id', async (req, res) => {
const instrutor = await Instrutor.findByIdAndUpdate(req.params.id, req.body)
res.render("Instrutor/edtok")
})


app.get('/Instrutor/del/:id', async (req, res) => {
const Instrutores = await Instrutor.findByIdAndDelete(req.params.id)
res.redirect("/Instrutor/lst")
})


////////////////////////////////////////////////////////////////////////////







app.get('/Mensalidade/lst', async (req, res) => {
    const Mensalidades = await Mensalidade.find()
    res.render("Mensalidade/lst", {Mensalidades:Mensalidades})
})

app.get('/Mensalidade/add', async (req, res) => {
    res.render("Mensalidade/add")
})

app.get('/Mensalidade/add/ok', async (req, res) => {
    const plano = req.query.plano
    const dataadesao = req.query.dataadesao
    await Mensalidade.create(req.query)
  res.render("Mensalidade/addok", {plano:plano,dataadesao:dataadesao});
})



app.get('/Mensalidade/edt/:id', async (req, res) => {
const mensalidade = await Mensalidade.findById(req.params.id)
res.render("Mensalidade/edt", {mensalidade})
})


app.post('/Mensalidade/edt/:id', async (req, res) => {
const mensalidade = await Mensalidade.findByIdAndUpdate(req.params.id, req.body)
res.render("Mensalidade/edtok")
})

app.get('/Mensalidade/del/:id', async (req, res) => {
const Mensalidades = await Mensalidade.findByIdAndDelete(req.params.id)
res.redirect("/Mensalidade/lst")
})

app.get('../site', async (req, res) => {
    const Aparelhos = await Aparelho.find()
     const Clientes = await Cliente.find()
     const Instrutores = await Instrutor.find()
     const Mensalidades = await Mensalidade.find()
    res.render("site/index", {Aparelhos, Clientes,Instrutores,Mensalidades})
})

app.listen(3001);