export type Difficulty = "easy" | "medium" | "hard";

export interface Topic {
  id: string;
  title: string;
  description?: string;
}

export interface Module {
  id: string;
  title: string;
  icon: string;
  topics: Topic[];
}

export interface Subject {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
  modules: Module[];
}

export const subjects: Subject[] = [
  {
    id: "redacao",
    title: "Redação",
    shortTitle: "Redação",
    icon: "✍️",
    color: "#8B5CF6",
    gradient: "from-purple-600 to-purple-800",
    description: "Domine a redação nota 1000 no ENEM com técnicas comprovadas.",
    modules: [
      {
        id: "redacao-m1",
        title: "Estrutura da Redação ENEM",
        icon: "📄",
        topics: [
          { id: "r-m1-t1", title: "Introdução: como apresentar o tema" },
          { id: "r-m1-t2", title: "Desenvolvimento: 2 parágrafos argumentativos" },
          { id: "r-m1-t3", title: "Conclusão: proposta de intervenção" },
          { id: "r-m1-t4", title: "Coesão e coerência textual" },
          { id: "r-m1-t5", title: "Extensão e formatação ideal" },
        ],
      },
      {
        id: "redacao-m2",
        title: "As 5 Competências do ENEM",
        icon: "🎯",
        topics: [
          { id: "r-m2-t1", title: "Competência 1: Norma culta da língua portuguesa" },
          { id: "r-m2-t2", title: "Competência 2: Compreensão da proposta e dissertação" },
          { id: "r-m2-t3", title: "Competência 3: Seleção e organização das informações" },
          { id: "r-m2-t4", title: "Competência 4: Mecanismos linguísticos de coesão" },
          { id: "r-m2-t5", title: "Competência 5: Proposta de intervenção detalhada" },
        ],
      },
      {
        id: "redacao-m3",
        title: "Argumentação e Repertório",
        icon: "💡",
        topics: [
          { id: "r-m3-t1", title: "Tipos de argumento: autoridade, causa e efeito, dados" },
          { id: "r-m3-t2", title: "Repertório sociocultural: como e quando usar" },
          { id: "r-m3-t3", title: "Citações filosóficas e literárias estratégicas" },
          { id: "r-m3-t4", title: "Dados estatísticos e contexto histórico" },
          { id: "r-m3-t5", title: "Evitando lugares-comuns e clichês" },
        ],
      },
      {
        id: "redacao-m4",
        title: "Proposta de Intervenção",
        icon: "🔧",
        topics: [
          { id: "r-m4-t1", title: "Os 5 elementos obrigatórios da PI" },
          { id: "r-m4-t2", title: "Agente, ação, modo/meio, finalidade, detalhamento" },
          { id: "r-m4-t3", title: "Como conectar a PI ao tema desenvolvido" },
          { id: "r-m4-t4", title: "Erros mais comuns na PI" },
          { id: "r-m4-t5", title: "Modelos de PI por área temática" },
        ],
      },
      {
        id: "redacao-m5",
        title: "Redações Nota 1000",
        icon: "🏆",
        topics: [
          { id: "r-m5-t1", title: "Análise de redação nota 1000 (tema saúde pública)" },
          { id: "r-m5-t2", title: "Análise de redação nota 1000 (tema educação)" },
          { id: "r-m5-t3", title: "Análise de redação nota 1000 (tema meio ambiente)" },
          { id: "r-m5-t4", title: "Erros que zeram a redação" },
          { id: "r-m5-t5", title: "Checklist final antes de entregar" },
        ],
      },
    ],
  },
  {
    id: "linguagens",
    title: "Linguagens e Códigos",
    shortTitle: "Linguagens",
    icon: "📚",
    color: "#3B82F6",
    gradient: "from-blue-600 to-blue-800",
    description: "Português, literatura, língua estrangeira e linguagens artísticas.",
    modules: [
      {
        id: "ling-m1",
        title: "Língua Portuguesa",
        icon: "🗣️",
        topics: [
          { id: "l-m1-t1", title: "Interpretação de texto: estratégias de leitura" },
          { id: "l-m1-t2", title: "Tipologia e gêneros textuais" },
          { id: "l-m1-t3", title: "Figuras de linguagem essenciais" },
          { id: "l-m1-t4", title: "Variação linguística e norma culta" },
          { id: "l-m1-t5", title: "Funções da linguagem (Jakobson)" },
          { id: "l-m1-t6", title: "Intertextualidade e interdiscursividade" },
        ],
      },
      {
        id: "ling-m2",
        title: "Literatura Brasileira",
        icon: "📖",
        topics: [
          { id: "l-m2-t1", title: "Quinhentismo e Barroco" },
          { id: "l-m2-t2", title: "Arcadismo e Romantismo" },
          { id: "l-m2-t3", title: "Realismo, Naturalismo e Parnasianismo" },
          { id: "l-m2-t4", title: "Simbolismo e Pré-modernismo" },
          { id: "l-m2-t5", title: "Modernismo: 1ª, 2ª e 3ª fases" },
          { id: "l-m2-t6", title: "Contemporâneo: autores e obras cobrados" },
        ],
      },
      {
        id: "ling-m3",
        title: "Gramática",
        icon: "✒️",
        topics: [
          { id: "l-m3-t1", title: "Classes de palavras e morfologia" },
          { id: "l-m3-t2", title: "Sintaxe: sujeito, predicado e complementos" },
          { id: "l-m3-t3", title: "Concordância verbal e nominal" },
          { id: "l-m3-t4", title: "Regência verbal e nominal" },
          { id: "l-m3-t5", title: "Crase: quando usar e quando não usar" },
          { id: "l-m3-t6", title: "Pontuação estratégica" },
        ],
      },
      {
        id: "ling-m4",
        title: "Língua Estrangeira (Inglês)",
        icon: "🌎",
        topics: [
          { id: "l-m4-t1", title: "Interpretação de texto em inglês: cognatos" },
          { id: "l-m4-t2", title: "Vocabulário contextual e inferência" },
          { id: "l-m4-t3", title: "Tempos verbais para leitura" },
          { id: "l-m4-t4", title: "Gêneros textuais em inglês no ENEM" },
        ],
      },
      {
        id: "ling-m5",
        title: "Artes e Outras Linguagens",
        icon: "🎨",
        topics: [
          { id: "l-m5-t1", title: "Linguagem publicitária e persuasão" },
          { id: "l-m5-t2", title: "Música: letras e contexto histórico" },
          { id: "l-m5-t3", title: "Cinema e linguagem audiovisual" },
          { id: "l-m5-t4", title: "Charge, tirinha e HQ: análise crítica" },
          { id: "l-m5-t5", title: "Linguagem digital e novas mídias" },
        ],
      },
    ],
  },
  {
    id: "matematica",
    title: "Matemática",
    shortTitle: "Matemática",
    icon: "📐",
    color: "#10B981",
    gradient: "from-emerald-600 to-emerald-800",
    description: "Álgebra, geometria, estatística e raciocínio lógico aplicado.",
    modules: [
      {
        id: "mat-m1",
        title: "Funções e Gráficos",
        icon: "📈",
        topics: [
          { id: "m-m1-t1", title: "Funções: conceito, domínio, imagem e contradomínio" },
          { id: "m-m1-t2", title: "Função afim (linear e constante)" },
          { id: "m-m1-t3", title: "Função quadrática: vértice e raízes" },
          { id: "m-m1-t4", title: "Função exponencial e logarítmica" },
          { id: "m-m1-t5", title: "Análise e interpretação de gráficos" },
          { id: "m-m1-t6", title: "Progressões Aritmética e Geométrica" },
        ],
      },
      {
        id: "mat-m2",
        title: "Geometria",
        icon: "📏",
        topics: [
          { id: "m-m2-t1", title: "Geometria plana: áreas e perímetros" },
          { id: "m-m2-t2", title: "Semelhança de triângulos e Teorema de Tales" },
          { id: "m-m2-t3", title: "Geometria espacial: sólidos e volumes" },
          { id: "m-m2-t4", title: "Geometria analítica: ponto, reta e circunferência" },
          { id: "m-m2-t5", title: "Teorema de Pitágoras e suas aplicações" },
        ],
      },
      {
        id: "mat-m3",
        title: "Probabilidade e Estatística",
        icon: "🎲",
        topics: [
          { id: "m-m3-t1", title: "Análise combinatória: arranjos, combinações e permutações" },
          { id: "m-m3-t2", title: "Probabilidade simples e condicional" },
          { id: "m-m3-t3", title: "Medidas de tendência central: média, mediana e moda" },
          { id: "m-m3-t4", title: "Medidas de dispersão: variância e desvio padrão" },
          { id: "m-m3-t5", title: "Interpretação de tabelas e gráficos estatísticos" },
        ],
      },
      {
        id: "mat-m4",
        title: "Trigonometria",
        icon: "📐",
        topics: [
          { id: "m-m4-t1", title: "Razões trigonométricas no triângulo retângulo" },
          { id: "m-m4-t2", title: "Ciclo trigonométrico e valores notáveis" },
          { id: "m-m4-t3", title: "Lei dos senos e lei dos cossenos" },
          { id: "m-m4-t4", title: "Funções trigonométricas e seus gráficos" },
        ],
      },
      {
        id: "mat-m5",
        title: "Matemática Financeira e Lógica",
        icon: "💰",
        topics: [
          { id: "m-m5-t1", title: "Juros simples e compostos" },
          { id: "m-m5-t2", title: "Porcentagem e variação percentual" },
          { id: "m-m5-t3", title: "Razão, proporção e regra de três" },
          { id: "m-m5-t4", title: "Raciocínio lógico e proposições" },
          { id: "m-m5-t5", title: "Equações e sistemas de equações" },
        ],
      },
    ],
  },
  {
    id: "humanas",
    title: "Ciências Humanas",
    shortTitle: "Humanas",
    icon: "🌍",
    color: "#F59E0B",
    gradient: "from-amber-600 to-amber-800",
    description: "História, geografia, filosofia e sociologia para o ENEM.",
    modules: [
      {
        id: "hum-m1",
        title: "História do Brasil",
        icon: "🇧🇷",
        topics: [
          { id: "h-m1-t1", title: "Brasil Colonial: exploração e resistência" },
          { id: "h-m1-t2", title: "Independência e Período Imperial" },
          { id: "h-m1-t3", title: "República Velha e Era Vargas" },
          { id: "h-m1-t4", title: "Ditadura Militar (1964–1985)" },
          { id: "h-m1-t5", title: "Redemocratização e Constituição de 1988" },
          { id: "h-m1-t6", title: "Brasil contemporâneo: desafios e conquistas" },
        ],
      },
      {
        id: "hum-m2",
        title: "História Geral",
        icon: "🏛️",
        topics: [
          { id: "h-m2-t1", title: "Revoluções burguesas: Inglesa, Francesa e Americana" },
          { id: "h-m2-t2", title: "Imperialismo e colonialismo no século XIX" },
          { id: "h-m2-t3", title: "Primeira e Segunda Guerras Mundiais" },
          { id: "h-m2-t4", title: "Guerra Fria e mundo bipolar" },
          { id: "h-m2-t5", title: "Globalização e mundo multipolar" },
        ],
      },
      {
        id: "hum-m3",
        title: "Geografia",
        icon: "🗺️",
        topics: [
          { id: "h-m3-t1", title: "Cartografia e leitura de mapas" },
          { id: "h-m3-t2", title: "Geopolítica e relações internacionais" },
          { id: "h-m3-t3", title: "Questões ambientais e sustentabilidade" },
          { id: "h-m3-t4", title: "Urbanização e problemas das cidades" },
          { id: "h-m3-t5", title: "Brasil: regiões, biomas e populações" },
          { id: "h-m3-t6", title: "Globalização e desigualdades socioespaciais" },
        ],
      },
      {
        id: "hum-m4",
        title: "Filosofia",
        icon: "🧠",
        topics: [
          { id: "h-m4-t1", title: "Filosofia Antiga: Sócrates, Platão e Aristóteles" },
          { id: "h-m4-t2", title: "Iluminismo e contrato social" },
          { id: "h-m4-t3", title: "Filosofia moderna: Descartes, Kant e Hegel" },
          { id: "h-m4-t4", title: "Ética e política: cidadania e direitos" },
          { id: "h-m4-t5", title: "Filosofia contemporânea e existencialismo" },
        ],
      },
      {
        id: "hum-m5",
        title: "Sociologia",
        icon: "👥",
        topics: [
          { id: "h-m5-t1", title: "Marx: capitalismo, classes e alienação" },
          { id: "h-m5-t2", title: "Durkheim: fato social e solidariedade" },
          { id: "h-m5-t3", title: "Weber: ação social e burocracia" },
          { id: "h-m5-t4", title: "Movimentos sociais e cidadania no Brasil" },
          { id: "h-m5-t5", title: "Desigualdade social, raça e gênero" },
        ],
      },
    ],
  },
  {
    id: "natureza",
    title: "Ciências da Natureza",
    shortTitle: "Natureza",
    icon: "🔬",
    color: "#EC4899",
    gradient: "from-pink-600 to-pink-800",
    description: "Biologia, química e física com foco nas questões do ENEM.",
    modules: [
      {
        id: "nat-m1",
        title: "Biologia",
        icon: "🧬",
        topics: [
          { id: "n-m1-t1", title: "Citologia: estrutura e funções celulares" },
          { id: "n-m1-t2", title: "Genética: leis de Mendel e DNA" },
          { id: "n-m1-t3", title: "Evolução: Darwin, seleção natural e especiação" },
          { id: "n-m1-t4", title: "Ecologia: cadeias alimentares e biomas" },
          { id: "n-m1-t5", title: "Fisiologia humana: sistemas do corpo" },
          { id: "n-m1-t6", title: "Biotecnologia e bioética" },
        ],
      },
      {
        id: "nat-m2",
        title: "Química",
        icon: "⚗️",
        topics: [
          { id: "n-m2-t1", title: "Estrutura atômica e tabela periódica" },
          { id: "n-m2-t2", title: "Ligações químicas e geometria molecular" },
          { id: "n-m2-t3", title: "Reações químicas e estequiometria" },
          { id: "n-m2-t4", title: "Termoquímica e equilíbrio químico" },
          { id: "n-m2-t5", title: "Química orgânica: funções e reações" },
          { id: "n-m2-t6", title: "Eletroquímica e pilhas" },
        ],
      },
      {
        id: "nat-m3",
        title: "Física",
        icon: "⚡",
        topics: [
          { id: "n-m3-t1", title: "Cinemática: MRU, MRUV e queda livre" },
          { id: "n-m3-t2", title: "Dinâmica: leis de Newton e aplicações" },
          { id: "n-m3-t3", title: "Energia, trabalho e potência" },
          { id: "n-m3-t4", title: "Ondulatória: ondas, som e luz" },
          { id: "n-m3-t5", title: "Eletromagnetismo e circuitos elétricos" },
          { id: "n-m3-t6", title: "Física moderna: relatividade e quantum" },
        ],
      },
      {
        id: "nat-m4",
        title: "Interdisciplinar: Ciência, Tecnologia e Sociedade",
        icon: "🌱",
        topics: [
          { id: "n-m4-t1", title: "Impactos ambientais da indústria" },
          { id: "n-m4-t2", title: "Energias renováveis e matriz energética" },
          { id: "n-m4-t3", title: "Saúde pública: doenças e prevenção" },
          { id: "n-m4-t4", title: "Agrotóxicos, transgênicos e segurança alimentar" },
          { id: "n-m4-t5", title: "Poluição, resíduos sólidos e reciclagem" },
        ],
      },
    ],
  },
];

export const subjectRoutes: Record<string, string> = {
  redacao: "/dashboard/redacao",
  linguagens: "/dashboard/linguagens",
  matematica: "/dashboard/matematica",
  humanas: "/dashboard/humanas",
  natureza: "/dashboard/natureza",
};

export const weekPlan = [
  {
    day: "Segunda",
    short: "Seg",
    subjects: ["Redação", "Matemática"],
    hours: 3,
  },
  {
    day: "Terça",
    short: "Ter",
    subjects: ["Linguagens", "Ciências Humanas"],
    hours: 3,
  },
  {
    day: "Quarta",
    short: "Qua",
    subjects: ["Matemática", "Ciências da Natureza"],
    hours: 3,
  },
  {
    day: "Quinta",
    short: "Qui",
    subjects: ["Redação", "Ciências Humanas"],
    hours: 2.5,
  },
  {
    day: "Sexta",
    short: "Sex",
    subjects: ["Linguagens", "Ciências da Natureza"],
    hours: 3,
  },
  {
    day: "Sábado",
    short: "Sáb",
    subjects: ["Revisão geral", "Simulado"],
    hours: 4,
  },
  {
    day: "Domingo",
    short: "Dom",
    subjects: ["Descanso", "Revisão leve"],
    hours: 1.5,
  },
];
