import type { GapQuestion } from './types';

export interface UnitReviewBundle {
  unitNumber: 1 | 2 | 3 | 5;
  title: string;
  subtitle: string;
  keyVocabSummary: [string, string][];
  sections: {
    id: string;
    title: string;
    subtitle: string;
    questions: GapQuestion[];
  }[];
}

export const OTHER_UNITS_REVIEWS: Record<1 | 2 | 3 | 5, UnitReviewBundle> = {
  1: {
    unitNumber: 1,
    title: 'Unit 1: Organisation',
    subtitle: 'Roles & responsibilities, Future forms, First meetings (Review str. 104)',
    keyVocabSummary: [
      ['report to sb', 'podlegać komuś'],
      ['be responsible for + -ing', 'odpowiadać za'],
      ['lead a team / Head of Sales', 'kierować zespołem / Szef sprzedaży'],
      ['look after sb/sth', 'opiekować się / dbać o'],
      ['work closely with', 'ściśle współpracować z'],
      ['make sure that', 'upewnić się, że'],
      ['take care of paperwork', 'zająć się papierologią'],
      ['be in charge of', 'kierować czymś / odpowiadać za'],
    ],
    sections: [
      {
        id: 'rev1-roles',
        title: '1.1 Roles and responsibilities (Review str. 104)',
        subtitle: 'Słowa do użycia: after, care, charge, for, head, involves, leads, makes, reports, with',
        questions: [
          {
            id: 'r1-1',
            prompt: 'Grigor’s new job ___ meeting new clients...',
            answers: ['involves'],
            explanation: 'involve + V-ing = polegać na / wiązać się z.',
          },
          {
            id: 'r1-2',
            prompt: '...and he ___ to the Sales Manager.',
            answers: ['reports'],
            explanation: 'report to someone = podlegać komuś służbowo.',
          },
          {
            id: 'r1-3',
            prompt: 'He is responsible ___ presenting the products and winning orders.',
            answers: ['for'],
            explanation: 'Stały przyimek: be responsible FOR + -ing.',
          },
          {
            id: 'r1-4',
            prompt: 'His boss, who ___ the sales team, motivates his staff well.',
            answers: ['leads'],
            explanation: 'lead a team = kierować zespołem.',
          },
          {
            id: 'r1-5',
            prompt: 'As ___ of Sales he sets them targets every month.',
            answers: ['Head', 'head'],
            explanation: 'Head of Sales = Kierownik / Szef działu sprzedaży.',
          },
          {
            id: 'r1-6',
            prompt: 'He looks ___ them very well and it is a happy team.',
            answers: ['after'],
            explanation: 'look after someone = dbać o kogoś.',
          },
          {
            id: 'r1-7',
            prompt: 'Grigor works closely ___ the distribution team and ___ sure that orders are delivered on time.',
            hint: '2 słowa oddzielone przecinkiem, np. with, makes',
            answers: ['with, makes', 'with makes'],
            explanation: 'work closely WITH + make sure (3 os. lp.: makes sure).',
          },
          {
            id: 'r1-8',
            prompt: 'He also has to take ___ of the paperwork. He hopes to be in ___ of his own company one day.',
            hint: '2 słowa: care, charge',
            answers: ['care, charge', 'care charge'],
            explanation: 'take care of = zajmować się; be in charge of = kierować czymś.',
          },
        ],
      },
      {
        id: 'rev1-future',
        title: '1.2 Future forms (Review str. 104)',
        subtitle: 'Wybierz poprawną formę (Present Simple = rozkład, Present Continuous = umówione spotkanie, be going to = intencja/przewidywanie).',
        questions: [
          {
            id: 'r1-f1',
            prompt: 'I was late this morning. I’m sure I ___ a warning from the boss.',
            options: ["'m going to get", "'m getting"],
            answers: ["'m going to get"],
            explanation: 'Przewidywanie oparte na faktach ("I’m sure") → be going to.',
          },
          {
            id: 'r1-f2',
            prompt: 'The office ___ at 10 o’clock on Fridays.',
            options: ['opens', 'is opening'],
            answers: ['opens'],
            explanation: 'Stały harmonogram / godziny otwarcia → Present Simple.',
          },
          {
            id: 'r1-f3',
            prompt: 'He’s decided he ___ his boss for a pay rise today.',
            options: ['asks', "'s going to ask"],
            answers: ["'s going to ask"],
            explanation: 'Osobista intencja ("He’s decided") → be going to.',
          },
          {
            id: 'r1-f4',
            prompt: 'What time ___ him at the station later?',
            options: ['are you meeting', 'do you meet'],
            answers: ['are you meeting'],
            explanation: 'Umówione spotkanie z inną osobą (arrangement) → Present Continuous.',
          },
          {
            id: 'r1-f5',
            prompt: 'They’ve closed the airport because it ___ more this afternoon.',
            options: ['snows', "'s going to snow"],
            answers: ["'s going to snow"],
            explanation: 'Przewidywanie pogody oparte na przesłankach → be going to.',
          },
        ],
      },
    ],
  },
  2: {
    unitNumber: 2,
    title: 'Unit 2: Brands',
    subtitle: 'Marketing & brands, Connectors, Signposting, -ing vs infinitive (Review str. 105)',
    keyVocabSummary: [
      ['cautious approach', 'ostrożne podejście'],
      ['brand-stretching', 'rozciąganie marki na inne branże'],
      ['brand loyalty / client base', 'lojalność wobec marki / baza klientów'],
      ['devalued brand', 'zdewaluowana marka'],
      ['core business', 'główny profil działalności'],
      ['venture into', 'wkroczyć w nowy sektor'],
      ['elicit feedback', 'uzyskać/wydobyć feedback'],
      ['prime retail sites', 'prestiżowe lokalizacje handlowe'],
    ],
    sections: [
      {
        id: 'rev2-brands',
        title: '2.1 Marketing and brands (Review str. 105)',
        subtitle: 'Słowa do użycia: approach, base, core, devalued, growth, history, loyalty, marketing, stretching, venture',
        questions: [
          {
            id: 'r2-1',
            prompt: 'We have decided to take a cautious ___ to expansion...',
            answers: ['approach'],
            explanation: 'Kolokacja: take a cautious approach (przyjąć ostrożne podejście).',
          },
          {
            id: 'r2-2',
            prompt: '...with many companies whose brand-___ strategies have led to the brand being ___.',
            hint: '2 słowa: stretching, devalued',
            answers: ['stretching, devalued', 'stretching devalued'],
            explanation: 'brand-stretching (rozciąganie marki) → devalued (utrata prestiżu/wartości).',
          },
          {
            id: 'r2-3',
            prompt: 'This in turn can cause the brand ___, which had built up over years, to disappear.',
            answers: ['loyalty'],
            explanation: 'Kolokacja: brand loyalty (lojalność klientów wobec marki).',
          },
          {
            id: 'r2-4',
            prompt: 'Thanks to our interactive ___, which has broadened our client ___, sales have seen fast ___.',
            hint: '3 słowa: marketing, base, growth',
            answers: ['marketing, base, growth', 'marketing base growth'],
            explanation: 'interactive marketing, client base, fast growth.',
          },
          {
            id: 'r2-5',
            prompt: 'We’ve now decided to move away from our ___ business and to ___ into luxury hotels.',
            hint: '2 słowa: core, venture',
            answers: ['core, venture', 'core venture'],
            explanation: 'core business (główna działalność) + venture into (wejść w nowy sektor).',
          },
        ],
      },
      {
        id: 'rev2-connectors',
        title: '2.2 Connectors (Review str. 105)',
        subtitle: 'Wybierz właściwy łącznik (czas, kontrast, przykład, dodawanie informacji).',
        questions: [
          {
            id: 'r2-c1',
            prompt: '___ we decided that the brand needed refreshing so we discussed what to do.',
            options: ['Recently', 'Previously', 'As well as'],
            answers: ['Recently'],
            explanation: 'Recently = ostatnio / niedawno (pasuje do wprowadzenia historii zmian).',
          },
          {
            id: 'r2-c2',
            prompt: 'We got together with focus groups ___ elicited customer feedback.',
            options: ['such as', 'also', 'and'],
            answers: ['and'],
            explanation: 'Łączymy dwa czasowniki w jednym zdaniu (got together AND elicited).',
          },
          {
            id: 'r2-c3',
            prompt: '___, we asked staff to come up with some ideas for a new logo, too.',
            options: ['As well as', 'In addition', 'For instance'],
            answers: ['In addition'],
            explanation: 'Przed przecinkiem na początku zdania dodajemy kolejną informację przez "In addition,".',
          },
          {
            id: 'r2-c4',
            prompt: '___ the consultants produced some great ideas, a design from a member of staff was chosen.',
            options: ['However', 'Although', 'But'],
            answers: ['Although'],
            explanation: '"Although" łączy dwa zdania składowe w jednym zdaniu złożonym (po "However" musi być przecinek!).',
          },
        ],
      },
    ],
  },
  3: {
    unitNumber: 3,
    title: 'Unit 3: Job Hunting',
    subtitle: 'Getting a job, Indirect questions, Active listening, Covering letters (Review str. 106)',
    keyVocabSummary: [
      ['jobseeker', 'osoba szukająca pracy'],
      ['apply for a job / post', 'aplikować na stanowisko'],
      ['come across well', 'zrobić dobre wrażenie'],
      ['stand out from the crowd', 'wyróżnić się z tłumu'],
      ['gain experience / internship', 'zdobyć doświadczenie / staż'],
      ['clichés', 'oklepane frazesy (w CV)'],
      ['be considered for the post', 'być branym pod uwagę na posadę'],
      ['go on strike', 'zastrajkować'],
    ],
    sections: [
      {
        id: 'rev3-job',
        title: '3.1 Getting a job & 3.5 Covering letters (Review str. 106)',
        subtitle: 'Najważniejsze kolokacje z rekrutacji i listu motywacyjnego.',
        questions: [
          {
            id: 'r3-1',
            prompt: 'He has ___ for over a hundred jobs, but not one potential ___ has invited him.',
            hint: 'applied / employer / employee',
            answers: ['applied, employer', 'applied employer'],
            explanation: 'apply FOR a job + potential employer (pracodawca, nie employee = pracownik!).',
          },
          {
            id: 'r3-2',
            prompt: 'Unfortunately, Jim’s job applications don’t ___ out from the crowd.',
            answers: ['stand'],
            explanation: 'Idiom: stand out from the crowd (wyróżniać się z tłumu).',
          },
          {
            id: 'r3-3',
            prompt: 'Please find my CV ___.',
            options: ['advertised', 'attached'],
            answers: ['attached'],
            explanation: 'Standardowy zwrot w mailu/liście motywacyjnym: Please find my CV attached.',
          },
          {
            id: 'r3-4',
            prompt: 'I have just ___ my management degree and would like to be ___ for the post.',
            options: ['completed / considered', 'studied / thought', 'completed / thought'],
            answers: ['completed / considered'],
            explanation: 'complete a degree + be considered for the post.',
          },
          {
            id: 'r3-5',
            prompt: 'I would very much ___ the opportunity of an interview.',
            options: ['regard', 'appreciate'],
            answers: ['appreciate'],
            explanation: 'Formalne zakończenie listu: I would very much appreciate the opportunity...',
          },
        ],
      },
      {
        id: 'rev3-indirect',
        title: '3.2 Indirect questions (Review str. 106)',
        subtitle: 'UWAGA NA SZYK ZDANIA! W pytaniach pośrednich NIE ma inwersji (podmiot przed czasownikiem!).',
        questions: [
          {
            id: 'r3-i1',
            prompt: 'Direct: What degree did you do? → Indirect: We’d like to know ___.',
            answers: ['what degree you did'],
            explanation: 'Znika operator "did", czasownik wraca do Past Simple w szyku twierdzącym: what degree you did.',
          },
          {
            id: 'r3-i2',
            prompt: 'Direct: Why do you want to work for us? → Indirect: Could you tell me ___?',
            answers: ['why you want to work for us'],
            explanation: 'Znika "do", zostaje szyk twierdzący: why you want to work for us.',
          },
          {
            id: 'r3-i3',
            prompt: 'Direct: What will my responsibilities be? → Indirect: I’d like to know ___.',
            answers: ['what my responsibilities will be'],
            explanation: 'Podmiot ("my responsibilities") idzie PRZED "will be" (bez inwersji!).',
          },
          {
            id: 'r3-i4',
            prompt: 'Direct: How long were you working in China? → Indirect: We’d like to know ___.',
            answers: ['how long you were working in China'],
            explanation: 'Podmiot "you" przechodzi przed "were working" → how long you were working in China.',
          },
        ],
      },
    ],
  },
  5: {
    unitNumber: 5,
    title: 'Unit 5: Logistics',
    subtitle: 'E-commerce logistics, Word building, Passive forms, Negotiating & Letter of complaint (Review str. 108)',
    keyVocabSummary: [
      ['traffic congestion', 'korki drogowe'],
      ['collection lockers', 'paczkomaty / skrytki'],
      ['logistician / packaging', 'logistyk / opakowanie'],
      ['long-haul freight', 'dalekobieżny transport towarowy'],
      ['subsidiary', 'spółka zależna'],
      ['be deployed', 'zostać wdrożonym'],
      ['withhold payment', 'wstrzymać płatność'],
      ['prompt response / mutual satisfaction', 'niezwłoczna odpowiedź / obopólne zadowolenie'],
    ],
    sections: [
      {
        id: 'rev5-vocab',
        title: '5.1 Logistics & Word Building (Review str. 108)',
        subtitle: 'Kolokacje i słowotwórstwo z logistyki (uważaj na "logistician" i "congestion"!).',
        questions: [
          {
            id: 'r5-1',
            prompt: 'More delivery vans have made traffic ___ in cities worse.',
            options: ['crowding', 'congestion'],
            answers: ['congestion'],
            explanation: 'Kolokacja: traffic congestion (korki drogowe).',
          },
          {
            id: 'r5-2',
            prompt: 'Instead of home delivery, some companies use collection ___.',
            options: ['lockers', 'couriers'],
            answers: ['lockers'],
            explanation: 'collection lockers = skrytki odbiorcze / paczkomaty.',
          },
          {
            id: 'r5-3',
            prompt: 'Suppliers must make sure that goods are ___ packed.',
            options: ['properly', 'rightly'],
            answers: ['properly'],
            explanation: 'Kolokacja: properly packed (prawidłowo zapakowane).',
          },
          {
            id: 'r5-4',
            prompt: 'The rise of online shopping means that fast ___ of goods is key.',
            hint: 'DELIVER',
            answers: ['delivery'],
            explanation: 'Rzeczownik od deliver → delivery.',
          },
          {
            id: 'r5-5',
            prompt: 'Planning the ___ of orders is the job of a ___.',
            hint: 'DISTRIBUTE, LOGISTICS',
            answers: ['distribution, logistician', 'distribution logistician'],
            explanation: 'distribute → distribution; osoba od logistyki: logistician!',
          },
          {
            id: 'r5-6',
            prompt: 'The ___ needs to be sufficient to keep goods safe.',
            hint: 'PACK',
            answers: ['packaging'],
            explanation: 'Opakowanie towaru w transporcie → packaging.',
          },
        ],
      },
      {
        id: 'rev5-passive',
        title: '5.2 Passive forms (Review str. 108)',
        subtitle: 'Przekształć zdania na stronę bierną (pamiętaj o czasach i czasownikach modalnych!).',
        questions: [
          {
            id: 'r5-p1',
            prompt: 'We must buy new software. → New software ___.',
            answers: ['must be bought'],
            explanation: 'Modal Passive: must + be + III forma (bought).',
          },
          {
            id: 'r5-p2',
            prompt: 'They have already found a new factory. → A new factory ___.',
            answers: ['has already been found'],
            explanation: 'Present Perfect Passive: has + already + been + found.',
          },
          {
            id: 'r5-p3',
            prompt: 'The company will launch a new product. → A new product ___.',
            answers: ['will be launched'],
            explanation: 'Future Simple Passive: will be + launched.',
          },
          {
            id: 'r5-p4',
            prompt: 'They didn’t finish the project on time. → The project ___.',
            answers: ["wasn't finished on time", 'was not finished on time'],
            explanation: 'Past Simple Passive: wasn’t finished on time.',
          },
          {
            id: 'r5-p5',
            prompt: 'They couldn’t return the goods. → The goods ___.',
            answers: ["couldn't be returned", 'could not be returned'],
            explanation: 'Modal Passive: couldn’t be returned.',
          },
        ],
      },
      {
        id: 'rev5-complaint',
        title: '5.5 Useful phrases for letters of complaint (Review str. 108)',
        subtitle: 'Wybierz formalne słownictwo reklamacyjne.',
        questions: [
          {
            id: 'r5-c1',
            prompt: 'If you do not ___ to this letter immediately, we will be ___ to look for another supplier.',
            options: ['respond / forced', 'react / required', 'answer / bound'],
            answers: ['respond / forced'],
            explanation: 'Formalne zwroty z Unit 5.5: respond to this letter + be forced to.',
          },
          {
            id: 'r5-c2',
            prompt: 'We hope that this situation will be ___ to our mutual ___.',
            options: ['resolved / satisfaction', 'committed / approval', 'determined / fulfilment'],
            answers: ['resolved / satisfaction'],
            explanation: 'Stała klauzula formalna: resolved to our mutual satisfaction.',
          },
          {
            id: 'r5-c3',
            prompt: 'We look forward to receiving your ___ response.',
            options: ['prompt', 'punctual'],
            answers: ['prompt'],
            explanation: 'Kolokacja: prompt response (niezwłoczna odpowiedź).',
          },
        ],
      },
    ],
  },
};
