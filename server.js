import "dotenv/config";
import express from "express";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const __filename=fileURLToPath(import.meta.url), __dirname=path.dirname(__filename);
const app=express(), client=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
app.use(express.json({limit:"1mb"}));
app.use(express.static(path.join(__dirname,"public")));

const SYSTEM=`Você é JARVIS, um assistente pessoal futurista.
Personalidade: inteligente, sério, atencioso e objetivo.
Fale português do Brasil por padrão.
Seja claro e direto. Nunca diga que executou uma ação no aparelho se não recebeu uma ferramenta real para executá-la.
Você pode ajudar com planejamento, estudos, escrita, programação, ideias e informações gerais.`;

app.get("/api/status",(req,res)=>res.json({online:true,time:new Date().toISOString()}));

app.post("/api/chat",async(req,res)=>{
 try{
  const {messages,memory}=req.body;
  if(!Array.isArray(messages)) return res.status(400).json({error:"Mensagens inválidas."});
  const ctx=memory?`\nMemória fornecida pelo aplicativo:\n${String(memory).slice(0,6000)}`:"";
  const input=messages.filter(m=>m&&(m.role==="user"||m.role==="assistant")&&typeof m.content==="string").slice(-24);
  const r=await client.responses.create({model:process.env.OPENAI_MODEL||"gpt-6-luna",instructions:SYSTEM+ctx,input});
  res.json({reply:r.output_text});
 }catch(e){console.error(e);res.status(500).json({error:"Falha no núcleo de IA."});}
});

app.post("/api/memory",async(req,res)=>{
 try{
  const r=await client.responses.create({
   model:process.env.OPENAI_MODEL||"gpt-6-luna",
   instructions:"Extraia somente memórias úteis e estáveis sobre o usuário. Não salve dados sensíveis. No máximo 12 itens curtos, um por linha. Se não houver, retorne vazio.",
   input:JSON.stringify(req.body.messages||[]).slice(-12000)
  });
  res.json({memory:r.output_text.trim()});
 }catch(e){res.status(500).json({error:"Falha ao atualizar memória."});}
});
app.listen(process.env.PORT||3000,()=>console.log("JARVIS v4 online"));
