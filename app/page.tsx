"use client";

import { useEffect, useState } from "react";

type Mode = "Leve" | "Médio" | "Hard";
type Player = "Azul" | "Rosa";
type CardKind = "Pergunta" | "Desafio";

const content: Record<Mode, Record<CardKind, string[]>> = {
  Leve: {
    Pergunta: [
      "Qual foi a primeira impressão que você teve de mim?",
      "Qual música te faz lembrar de um momento feliz?",
      "Se pudesse viajar agora, para onde iria?",
    ],
    Desafio: [
      "Imite um personagem por 20 segundos.",
      "Diga três qualidades da outra pessoa.",
      "Conte uma história engraçada da sua infância.",
    ],
  },
  Médio: {
    Pergunta: [
      "Qual é um sonho que você ainda quer realizar?",
      "O que você mais valoriza em uma amizade?",
      "Qual foi a decisão mais corajosa que já tomou?",
    ],
    Desafio: [
      "Deixe a outra pessoa escolher uma foto sua para postar nos stories.",
      "Envie um áudio cantando o refrão da sua música favorita.",
      "Faça uma declaração dramática para a outra pessoa.",
    ],
  },
  Hard: {
    Pergunta: [
      "O que você nunca teve coragem de me perguntar?",
      "Qual segredo seu quase ninguém conhece?",
      "Qual foi a maior vergonha que você já passou?",
    ],
    Desafio: [
      "Deixe a outra pessoa escolher seu próximo status por uma hora.",
      "Mostre a última foto da sua galeria.",
      "Ligue para alguém e diga que sente saudade, sem explicar o jogo.",
    ],
  },
};

function randomItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export default function Home() {
  const [mode, setMode] = useState<Mode>("Leve");
  const [screen, setScreen] = useState<"home" | "choosing" | "player" | "spinning" | "card">("home");
  const [player, setPlayer] = useState<Player>("Azul");
  const [kind, setKind] = useState<CardKind>("Pergunta");
  const [challenge, setChallenge] = useState("");

  useEffect(() => {
    if (screen !== "choosing") return;
    const timer = window.setTimeout(() => {
      setPlayer(Math.random() < 0.5 ? "Azul" : "Rosa");
      setScreen("player");
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [screen]);

  useEffect(() => {
    if (screen !== "spinning") return;
    const timer = window.setTimeout(() => {
      const nextKind: CardKind = Math.random() < 0.5 ? "Pergunta" : "Desafio";
      setKind(nextKind);
      setChallenge(randomItem(content[mode][nextKind]));
      setScreen("card");
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [screen, mode]);

  const startRound = () => setScreen("choosing");
  const spinCard = () => setScreen("spinning");
  const newRound = () => setScreen("home");

  return (
    <main className="game-shell">
      <div className="ambient ambient-blue" />
      <div className="ambient ambient-pink" />

      <header className="topbar">
        <div className="brand-mark">V<span>&amp;</span>D</div>
        <button className="help-button" aria-label="Como jogar">?</button>
      </header>

      {screen === "home" && (
        <section className="home-screen">
          <div className="intro">
            <p className="eyebrow">PARA DUAS PESSOAS</p>
            <h1>Verdade<br /><em>ou</em> Desafio?</h1>
            <p className="subtitle">Escolham o modo, respirem fundo<br />e deixem a sorte decidir.</p>
          </div>

          <div className="mode-picker" aria-label="Selecione o modo">
            {(Object.keys(content) as Mode[]).map((item) => (
              <button
                key={item}
                onClick={() => setMode(item)}
                className={`mode-option ${mode === item ? "selected" : ""} ${item.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "")}`}
              >
                <span>{item === "Leve" ? "☁" : item === "Médio" ? "⚡" : "♨"}</span>{item}
              </button>
            ))}
          </div>

          <div className="versus-orb" aria-label={`Modo ${mode}`}>
            <div className="orb-half blue-half"><span>AZUL</span></div>
            <div className="orb-half pink-half"><span>ROSA</span></div>
            <div className="orb-core"><small>MODO</small><strong>{mode}</strong></div>
          </div>

          <button className="start-button" onClick={startRound}>COMEÇAR <span>→</span></button>
          <p className="footer-note">Toque em começar para sortear quem joga</p>
        </section>
      )}

      {screen === "choosing" && (
        <section className="round-screen">
          <p className="eyebrow">A SORTE ESTÁ DECIDINDO</p>
          <div className="coin toss"><div className="coin-blue">AZUL</div><div className="coin-pink">ROSA</div></div>
          <h2>Quem vai jogar?</h2>
          <p>Escolhendo entre azul e rosa...</p>
        </section>
      )}

      {screen === "player" && (
        <section className="round-screen">
          <p className="eyebrow">JOGADOR SORTEADO</p>
          <div className={`winner-disc ${player.toLowerCase()}`}>{player}</div>
          <h2>O {player.toLowerCase()} foi sorteado!</h2>
          <p>Preparado para descobrir o que vem agora?</p>
          <button className="start-button" onClick={spinCard}>RODAR <span>↻</span></button>
        </section>
      )}

      {screen === "spinning" && (
        <section className="round-screen">
          <p className="eyebrow">MODO {mode.toUpperCase()}</p>
          <div className="spinner"><div className="spinner-inner">?</div></div>
          <h2>Verdade ou desafio?</h2>
          <p>O destino está escolhendo...</p>
        </section>
      )}

      {screen === "card" && (
        <section className="round-screen result-screen">
          <p className="eyebrow">É A VEZ DO {player.toUpperCase()}</p>
          <article className={`result-card ${kind === "Pergunta" ? "question" : "dare"}`}>
            <span className="result-icon">{kind === "Pergunta" ? "?" : "!"}</span>
            <p className="card-label">{kind}</p>
            <h2>{challenge}</h2>
            <span className="mode-tag">MODO {mode.toUpperCase()}</span>
          </article>
          <button className="secondary-button" onClick={newRound}>NOVA RODADA</button>
        </section>
      )}
    </main>
  );
}
