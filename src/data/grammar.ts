import type { GrammarTopic } from './types';

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  // =========================================================================
  // 1. CZASY (ALL TENSES MIX)
  // =========================================================================
  {
    id: 'all-tenses-mix',
    unitTag: 'KOLOS · #1 Czasy',
    isKolosPriority: true,
    title: '1. Czasy — Prosta tabela (8 czasów na kolosa)',
    subtitle: 'Znajdź w zdaniu słowo z 2. kolumny i wpisz formę z 3. kolumny.',
    simpleTables: [
      {
        headers: [
          'Nazwa czasu',
          'Słowa w zdaniu (po czym poznać)',
          'Co wpisujesz w lukę',
          'Przykład',
        ],
        rows: [
          [
            'Present Simple\n(Teraźniejszy prosty)',
            'usually, every day, always,\nrozkład jazdy (leaves at 8:00)',
            'zwykły czasownik\n(dla he/she/it dodaj -s, np. works / includes)',
            'The price includes return flights.\nThe office opens at 10:00.',
          ],
          [
            'Present Continuous\n(Teraźniejszy ciągły)',
            'now, at the moment,\ncurrently, today',
            'am / is / are + końcówka -ing\n(np. is working / are running)',
            'We are running behind schedule at the moment.',
          ],
          [
            'Past Simple\n(Przeszły prosty)',
            'yesterday, last year,\nin 2021, two days ago',
            'końcówka -ed lub 2. forma\n(np. worked / fell / took over)\nprzeczenie: didn’t + czasownik',
            'Last year sales fell by 15%.\nWe took over the company in 2021.',
          ],
          [
            'Past Continuous\n(Przeszły ciągły — tło)',
            'while, when + ktoś wszedł\n(np. when the CEO entered)',
            'was / were + końcówka -ing\n(np. was working / were looking)',
            'They were looking at the figures when the CEO entered.',
          ],
          [
            'Present Perfect\n(Skutek teraz / ten rok)',
            'so far, this year, already,\njust, yet, recently, ever, never',
            'have / has + końcówka -ed (lub 3. forma)\n(np. have gained / has launched)',
            'So far this year, we have launched three new products.',
          ],
          [
            'Present Perfect Continuous\n(Trwa od kiedyś do teraz)',
            'since (od np. last month),\nfor (przez np. 3 hours)',
            'have been / has been + końcówka -ing\n(np. has been working)',
            'She has been working on this project since last month.',
          ],
          [
            'Past Perfect\n(Stało się wcześniej w przeszłości)',
            'By the time we arrived/got,\nbefore we arrived, asked if...',
            'had + końcówka -ed (lub 3. forma)\n(np. had left / had carried)',
            'By the time we got to the office, the client had already left.',
          ],
          [
            'Future Continuous\n(W trakcie w przyszłości)',
            'This time next week,\nThis time tomorrow',
            'will be + końcówka -ing\n(np. will be lying / will be flying)',
            'This time next week, we will be lying on a beach.',
          ],
          [
            'Future Perfect\n(Ukończone DO momentu w przyszłości)',
            'By Friday, By next month,\nBy the end of this quarter',
            'will have + końcówka -ed (lub 3. forma)\n(np. will have finished / will have acquired)',
            'By the end of this quarter, we will have acquired three rivals.',
          ],
        ],
      },
    ],
    keyBullets: [
      'Widzisz kiedy dokładnie coś było w przeszłości (yesterday, last year, in 2021, ago) → zawsze Past Simple (np. fell / took over), nigdy have/has!',
      'Widzisz że okres jeszcze trwa lub zaczął się kiedyś i trwa nadal (since, for, so far, this year, yet) → zawsze Present Perfect (have/has)!',
      'Czasowniki takie jak know (znać), include (zawierać), believe (wierzyć), own (posiadać) nie przyjmują końcówki -ing (piszemy: have known, includes).',
    ],
    rules: [],
    exercises: [
      {
        id: 'tm-1',
        prompt: 'She ___ on this project since last month and still hasn’t finished.',
        hint: 'WORK',
        answers: ['has been working'],
        explanation: '"since last month" + czynność trwa do teraz → has been working.',
      },
      {
        id: 'tm-2',
        prompt: 'They ___ at the latest sales figures when the CEO entered the room.',
        hint: 'LOOK',
        answers: ['were looking'],
        explanation: 'Czynność w tle w przeszłości przerwana przez "when the CEO entered" → were looking.',
      },
      {
        id: 'tm-3',
        prompt: 'This time next week, we ___ on a sandy beach in Spain.',
        hint: 'LIE',
        answers: ['will be lying'],
        explanation: '"This time next week" → will be lying.',
      },
      {
        id: 'tm-4',
        prompt: 'By the time we got to the office, the client ___ already ___.',
        hint: 'LEAVE',
        answers: ['had already left', 'had left'],
        explanation: 'Klient wyszedł wcześniej niż dotarliśmy ("got" = przeszłość) → had already left.',
      },
      {
        id: 'tm-5',
        prompt: 'By the end of this quarter, our company ___ three smaller competitors.',
        hint: 'ACQUIRE',
        answers: ['will have acquired'],
        explanation: '"By the end of this quarter" (do momentu w przyszłości) → will have acquired.',
      },
      {
        id: 'tm-6',
        prompt: 'So far this year, discount chains ___ a lot of market share.',
        hint: 'GAIN',
        answers: ['have gained'],
        explanation: '"So far this year" (w tym roku — okres trwa) → have gained.',
      },
      {
        id: 'tm-7',
        prompt: 'Last year, sales ___ by 15 percent due to strong competition.',
        hint: 'FALL',
        answers: ['fell'],
        explanation: '"Last year" (zamknięta przeszłość) → 2. forma od fall: fell.',
      },
      {
        id: 'tm-8',
        prompt: 'The price ___ return flights and modern facilities at the hotel.',
        hint: 'INCLUDE',
        answers: ['includes'],
        explanation: 'Stały fakt w 3. osobie lp. ("The price") → includes.',
      },
      {
        id: 'tm-9',
        prompt: 'How long ___ you ___ your current line manager?',
        hint: 'KNOW',
        answers: ['have you known', 'have ... known'],
        explanation: 'Czasownik "know" nie ma formy -ing → have you known.',
      },
      {
        id: 'tm-10',
        prompt: 'We ___ three weeks behind schedule at the moment, so we need a hand.',
        hint: 'RUN',
        answers: ['are running'],
        explanation: '"at the moment" (teraz) → are running.',
      },
      {
        id: 'tm-11',
        prompt: 'When we ___ the company in 2021, we kept all the experienced staff.',
        hint: 'TAKE OVER',
        answers: ['took over'],
        explanation: '"in 2021" (przeszłość) → took over.',
      },
      {
        id: 'tm-12',
        prompt: 'I asked him if he ___ out the customer survey yet.',
        hint: 'CARRY',
        answers: ['had carried'],
        explanation: 'Po "asked" (przeszłość) cofamy czas do Past Perfect → had carried.',
      },
    ],
  },

  // =========================================================================
  // 2. CONDITIONALS (0, 1, 2, 3)
  // =========================================================================
  {
    id: 'conditionals-kolos',
    unitTag: 'KOLOS · #2 Conditionale',
    isKolosPriority: true,
    title: '2. Conditionale (Tryby Warunkowe 0, 1, 2, 3)',
    subtitle: 'Każde zdanie warunkowe ma dwie części: część po słowie IF oraz drugą część zdania.',
    simpleTables: [
      {
        headers: [
          'Tryb',
          'Kiedy używamy?',
          '1. Część po słowie IF',
          '2. Druga część zdania',
          'Prosty przykład',
        ],
        rows: [
          [
            'Tryb 0\n(Zero)',
            'Zawsze prawdziwe\n(stałe zasady, 100%)',
            'Czas teraźniejszy\n(np. rises / heat)',
            'Czas teraźniejszy\n(np. increase / melts)',
            'If inflation rises, costs increase.\n(Jeśli inflacja rośnie, koszty rosną.)',
          ],
          [
            'Tryb 1\n(First)',
            'Realna przyszłość\n(duża szansa, że się stanie)',
            'Czas teraźniejszy\n(np. succeeds / touch / are)\n(NIGDY will po if!)',
            'will + czasownik\n(np. will make / will burn / won’t go)',
            'If this strategy succeeds, we will make a profit.\n(Jeśli strategia się uda, zarobimy.)',
          ],
          [
            'Tryb 2\n(Second)',
            'Gdybanie o TERAZ\n(„Gdybym teraz miał / Na Twoim miejscu”)',
            'Czas przeszły (-ed lub 2. forma)\n(np. were / had / worked / didn’t)',
            'would + czasownik\n(np. would buy / wouldn’t stay)',
            'If I were you, I wouldn’t buy a car.\n(Na Twoim miejscu nie kupowałbym auta.)',
          ],
          [
            'Tryb 3\n(Third)',
            'Gdybanie o PRZESZŁOŚCI\n(„Gdybym WTEDY wiedział” — już po fakcie)',
            'had + 3. forma (-ed)\n(np. had known / had sold / hadn’t)',
            'would have + 3. forma (-ed)\n(np. would have left / wouldn’t have lost)',
            'If they had known, they would have left earlier.\n(Gdyby wtedy wiedzieli, wyszliby wcześniej.)',
          ],
          [
            'Mieszany\n(Mixed)',
            'Błąd w PRZESZŁOŚCI (last year),\nale skutek jest TERAZ (now)',
            'had + 3. forma (-ed)\n(np. had evaluated last year)',
            'would + zwykły czasownik\n(np. wouldn’t be in crisis now)',
            'If we had evaluated the risk last year, we wouldn’t be in crisis now.',
          ],
        ],
      },
    ],
    keyBullets: [
      'Złota zasada: W części ze słówkiem IF (oraz UNLESS) nigdy nie piszemy "will" ani "would"!',
      'Jak rozwiązywać na kolosie: Spójrz na tę część zdania, która nie ma luki. Jeśli jest w niej "will" → to Tryb 1. Jeśli jest "would + czasownik" → Tryb 2. Jeśli jest "would have + 3. forma" (lub "had + 3. forma") → Tryb 3.',
      'Słówko UNLESS znaczy „jeśli nie / chyba że” (np. Rivals will beat us unless we innovate = jeśli nie wprowadzimy innowacji). Po unless czasownik jest zawsze twierdzący!',
      'Zwrot IN CASE znaczy „na wypadek gdyby” (np. Take vouchers in case more customers come).',
    ],
    rules: [],
    exercises: [
      {
        id: 'cond-1',
        prompt: 'If this new strategy ___, we will be making a profit again.',
        hint: 'SUCCEED',
        answers: ['succeeds'],
        explanation: 'W drugiej części jest "will" (Tryb 1) → po "If" wpisujemy czas teraźniejszy z -s: succeeds.',
      },
      {
        id: 'cond-2',
        prompt: 'If they had known about the project delay, they ___ earlier.',
        hint: 'STEP IN',
        answers: ['would have stepped in'],
        explanation: 'Po "If" jest "had known" (Tryb 3 — przeszłość) → w drugiej części: would have stepped in.',
      },
      {
        id: 'cond-3',
        prompt: 'We wouldn’t stay at that campsite even if the prices ___ much lower.',
        hint: 'BE',
        answers: ['were', 'was'],
        explanation: 'W pierwszej części jest "wouldn’t stay" (Tryb 2 — teraz) → po "if" czas przeszły: were.',
      },
      {
        id: 'cond-4',
        prompt: 'If the management ___ the risk properly last year, the company wouldn’t be in crisis now.',
        hint: 'EVALUATE',
        answers: ['had evaluated'],
        explanation: 'W części po "If" jest "last year" (przeszłość!) → had + -ed: had evaluated.',
      },
      {
        id: 'cond-5',
        prompt: 'If I ___ you, I would confront him directly and clarify the problem.',
        hint: 'BE',
        answers: ['were', 'was'],
        explanation: '„Na Twoim miejscu” (Tryb 2) → If I were you.',
      },
      {
        id: 'cond-6',
        prompt: 'Our rivals will outperform us ___ we innovate our product lines.',
        options: ['unless', 'if', 'in case'],
        answers: ['unless'],
        explanation: 'Rywale nas prześcigną, JEŚLI NIE (chyba że) wprowadzimy innowacji → unless.',
      },
      {
        id: 'cond-7',
        prompt: 'If we ___ non-core businesses two years ago, we ___ much higher profits last quarter.',
        hint: 'SELL OFF / MAKE (wpisz po przecinku)',
        answers: ['had sold off, would have made'],
        explanation: 'Oba zdania o przeszłości ("two years ago", "last quarter" — Tryb 3) → had sold off, would have made.',
      },
      {
        id: 'cond-8',
        prompt: 'What ___ you ___ if a competitor made a takeover bid for your company?',
        hint: 'DO',
        answers: ['would you do', 'would ... do'],
        explanation: 'Po "if" mamy czas przeszły ("made" — Tryb 2) → w pytaniu dajemy would: What would you do?',
      },
      {
        id: 'cond-9',
        prompt: 'Take some extra discount vouchers with you ___ more customers turn up.',
        options: ['in case', 'unless', 'until'],
        answers: ['in case'],
        explanation: '"in case" = na wypadek gdyby pojawiło się więcej klientów.',
      },
      {
        id: 'cond-10',
        prompt: 'Don’t touch the iron or you’ll burn yourself. → If you ___ burn yourself. (Karta 3/15 zad. 15.5)',
        hint: 'TOUCH / WILL',
        answers: ['touch the iron, you will', 'touch the iron you will'],
        explanation: 'Tryb 1: If you touch the iron, you will burn yourself.',
      },
    ],
  },

  // =========================================================================
  // 3. I WISH & I SHOULD / SHOULD HAVE
  // =========================================================================
  {
    id: 'wish-should-have-kolos',
    unitTag: 'KOLOS · #3 Wish & Should',
    isKolosPriority: true,
    title: '3. "I wish" oraz "I should / should have"',
    subtitle: 'Wszystko zależy od jednego pytania: czy chodzi o TERAZ, czy o PRZESZŁOŚĆ?',
    simpleTables: [
      {
        title: 'Tabela A: "I wish" (Szkoda, że... / Chciałbym, żeby...)',
        headers: [
          'Kiedy dzieje się sytuacja?',
          'Po czym poznać w zdaniu?',
          'Co wpisujesz po "I wish"?',
          'Prosty przykład',
        ],
        rows: [
          [
            '1. Chodzi o TERAZ\n(chcę, żeby teraz było inaczej)',
            'now, right now,\nI haven’t got..., I want to be...',
            'Czas przeszły (-ed lub 2. forma)\n(np. had / were / didn’t have to)',
            'I wish I had more free time right now.\nI wish I were at home.',
          ],
          [
            '2. Chodzi o PRZESZŁOŚĆ\n(żałuję tego, co było kiedyś)',
            'yesterday, last summer,\nI didn’t lock..., I shouted...',
            'had (lub hadn’t) + 3. forma (-ed)\n(np. had locked / hadn’t shouted / had been)',
            'I wish I had locked the door.\nI wish I hadn’t shouted at Mark.',
          ],
          [
            '3. Denerwuje mnie KTOŚ INNY\n(chcę, żeby ktoś przestał)',
            'my colleague, neighbours,\ninterrupting, loud music',
            'inna osoba + would (lub wouldn’t) + czasownik\n(np. would stop / wouldn’t drive)',
            'I wish my colleague would stop interrupting me!',
          ],
        ],
      },
      {
        title: 'Tabela B: "should" (teraz) kontra "should have" (w przeszłości)',
        headers: [
          'Kiedy dzieje się sytuacja?',
          'Po czym poznać w zdaniu?',
          'Co wpisujesz w lukę?',
          'Prosty przykład',
        ],
        rows: [
          [
            '1. Rada na TERAZ\n(„Powinieneś to zrobić”)',
            'now, It’s a good idea,\nWe recommend',
            'should (lub shouldn’t) + zwykły czasownik\n(np. should book / shouldn’t miss)',
            'You should book the course now.\nWe shouldn’t miss the deadline.',
          ],
          [
            '2. Błąd w PRZESZŁOŚCI\n(„Powinien BYŁ to zrobić wtedy!”)',
            'He failed..., We lost...,\nyesterday, last week',
            'should have (lub shouldn’t have) + 3. forma (-ed)\n(np. should have done / shouldn’t have sent)',
            'He failed. He should have prepared.\nYou shouldn’t have sent that email yesterday.',
          ],
        ],
      },
    ],
    keyBullets: [
      'O samym sobie ("I wish I...") nigdy nie piszemy "would"! O sobie teraz piszemy: "I wish I had" lub "I wish I were".',
      'Jeśli w pierwszym zdaniu coś już poszło źle w przeszłości (He failed..., We lost..., yesterday), to zawsze używamy "should have + 3. forma" (powinien BYŁ) albo "shouldn’t have + 3. forma" (nie powinien BYŁ).',
    ],
    rules: [],
    exercises: [
      {
        id: 'wsh-1',
        prompt: 'I wish he ___ here yesterday to help me out.',
        hint: 'BE',
        answers: ['had been'],
        explanation: 'W zdaniu jest "yesterday" (przeszłość) → had + 3. forma od be: had been.',
      },
      {
        id: 'wsh-2',
        prompt: 'I wish I ___ more free time to travel right now.',
        hint: 'HAVE',
        answers: ['had'],
        explanation: 'W zdaniu jest "right now" (teraz) → czas przeszły od have: had.',
      },
      {
        id: 'wsh-3',
        prompt: 'He failed to carry out market research. He should ___ it before the launch.',
        hint: 'DO',
        answers: ['have done'],
        explanation: '"He failed" (błąd w przeszłości) → po should wpisujemy: have done.',
      },
      {
        id: 'wsh-4',
        prompt: 'We lost the contract because we ran behind schedule. We ___ better.',
        hint: 'SHOULD / PREPARE',
        answers: ['should have prepared'],
        explanation: '"We lost" (błąd w przeszłości) → powinniśmy BYLI się przygotować: should have prepared.',
      },
      {
        id: 'wsh-5',
        prompt: 'You ___ that blunt email to the client yesterday — it really offended them.',
        hint: "SHOULDN'T / SEND",
        answers: ["shouldn't have sent", 'should not have sent'],
        explanation: '"yesterday" (przeszłość) → nie powinieneś BYŁ wysyłać: shouldn’t have sent.',
      },
      {
        id: 'wsh-6',
        prompt: 'I wish we ___ those overpriced hotels last summer — the rooms weren’t even spacious.',
        hint: 'NOT / BOOK',
        answers: ["hadn't booked", 'had not booked'],
        explanation: '"last summer" (przeszłość) → hadn’t + -ed: hadn’t booked.',
      },
      {
        id: 'wsh-7',
        prompt: 'I wish my colleague ___ interrupting me during problem-solving meetings!',
        hint: 'STOP (denerwuje mnie ktoś inny)',
        answers: ['would stop'],
        explanation: 'Chcemy, żeby inna osoba ("my colleague") przestała coś robić → would stop.',
      },
      {
        id: 'wsh-11',
        prompt: 'If only I ___ how risky that investment was before I signed the papers!',
        hint: 'KNOW',
        answers: ['had known'],
        explanation: '"before I signed" (przeszłość) → had + 3. forma: had known.',
      },
      {
        id: 'wsh-19',
        prompt: 'I’m sorry I didn’t lock the door. → I wish I ___ the door. (Karta 3/15 zad. 15.1)',
        hint: 'LOCK',
        answers: ['had locked'],
        explanation: 'Żałujemy przeszłości ("didn’t lock") → had locked.',
      },
      {
        id: 'wsh-20',
        prompt: 'I feel awful because I shouted at Mark. → I wish I ___ at Mark. (Karta 3/15 zad. 15.4)',
        hint: 'NOT / SHOUT',
        answers: ["hadn't shouted", 'had not shouted'],
        explanation: 'Nakrzyczałem w przeszłości ("I shouted") → żałuję, że to zrobiłem: hadn’t shouted.',
      },
    ],
  },

  // =========================================================================
  // 4. I'D RATHER, PREFER & SO / NEITHER (KARTA 2/15 STR. 67)
  // =========================================================================
  {
    id: 'rather-prefer-so-neither',
    unitTag: 'KOLOS · #4 Karta str. 67',
    isKolosPriority: true,
    title: '4. "I’d rather", "prefer" oraz "So do I / Neither do I" (Karta str. 67)',
    subtitle: 'Dokładna zawartość Twojej karty pracy 2/15 w dwóch prostych tabelach.',
    simpleTables: [
      {
        title: 'Tabela A: "would rather" (Wolałbym) — 4 przypadki z karty str. 67',
        headers: [
          'O kim mówimy?',
          'Kiedy? (Teraz czy Przeszłość)',
          'Co wpisujesz w lukę?',
          'Przykład z karty pracy (zad. 7)',
        ],
        rows: [
          [
            '1. TA SAMA osoba\n(np. He’d rather ___)',
            'TERAZ lub JUTRO\n(now, tomorrow)',
            'zwykły czasownik\n(nic nie dodajesz, bez "to"!)\nnp. live / eat / watch',
            'He would rather live in New York.\nThey’d rather eat fish tomorrow.',
          ],
          [
            '2. TA SAMA osoba\n(np. Jenny would rather ___)',
            'W PRZESZŁOŚCI\n(last year, when at college)',
            'have + 3. forma (-ed)\nnp. have gone / have studied',
            'Jenny would rather have gone to the Caribbean last year.\nShe’d rather have studied psychology.',
          ],
          [
            '3. INNA osoba po rather\n(np. I’d rather YOU / I ___)',
            'TERAZ lub DZIŚ WIECZOREM\n(tonight)',
            'czas przeszły (-ed lub 2. forma)\nnp. stayed / bought / didn’t do',
            'Mum would rather I stayed home tonight.\nI’d rather you didn’t do that again.',
          ],
          [
            '4. INNA osoba po rather\n(np. I’d rather WE ___)',
            'W PRZESZŁOŚCI\n(last night, yesterday,\nwhen we went into town)',
            'had (lub hadn’t) + 3. forma (-ed)\nnp. had taken / hadn’t argued',
            'She’d rather we hadn’t argued last night.\nI’d rather we had taken the bus when we went into town.',
          ],
        ],
      },
      {
        title: 'Tabela B: "prefer" oraz krótkie odpowiedzi "So do I / Neither do I" (zad. 8, 9, 10)',
        headers: [
          'Konstrukcja',
          'Prosty wzór (co wpisać)',
          'Przykład z karty pracy (str. 67)',
        ],
        rows: [
          [
            'prefer\n(Wolę X od Y)',
            'prefer + pierwsza rzecz (-ing) + TO + druga rzecz (-ing)\n(ZAWSZE słówko "TO", nigdy "than"!)',
            'I prefer ice-cream to chocolate.\nI prefer seeing films at the cinema to watching them on TV.',
          ],
          [
            'would prefer\n(Wolałbym zrobić X niż Y)',
            'would prefer + TO + czasownik ... RATHER THAN + zwykły czasownik',
            'Sally would prefer to go to a restaurant rather than see a film.',
          ],
          [
            'So ... I\n(Ja też! — po twierdzeniu)',
            'So + (do / did / am / would / have) + I',
            '"I love cinema." → "So do I."\n"I went to see Casino yesterday." → "So did I."\n"I am a big fan." → "So am I."',
          ],
          [
            'Neither ... I\n(Ja też nie! — po przeczeniu)',
            'Neither + (do / did / have / could / will) + I\n(także gdy w zdaniu jest słowo NEVER!)',
            '"I didn’t go to the party." → "Neither did I."\n"I haven’t seen Frank." → "Neither have I."\n"I will never watch it." → "Neither will I."',
          ],
        ],
      },
    ],
    keyBullets: [
      'Jak odróżnić wiersz 1–2 od 3–4 w Tabeli A? Patrz co stoi zaraz za słowem "rather": jeśli od razu jest luka na czasownik → mówisz o tej samej osobie. Jeśli za "rather" stoi słówko "you / we / I / he" → mówisz o kimś innym!',
      'Przy słówku "prefer" słowo „niż / od” to ZAWSZE krótkie "TO" (I prefer ice-cream TO chocolate).',
    ],
    rules: [],
    exercises: [
      {
        id: 'rps-1',
        prompt: 'Jenny would rather ___ to the Caribbean than the Mediterranean last year. (str. 67 zad. 7.2)',
        hint: 'GO',
        answers: ['have gone'],
        explanation: 'Ta sama osoba (Jenny) + przeszłość ("last year") → have + 3. forma: have gone.',
      },
      {
        id: 'rps-2',
        prompt: 'She’d rather ___ psychology when she was at college than law. (str. 67 zad. 7.5)',
        hint: 'STUDY',
        answers: ['have studied'],
        explanation: 'Ta sama osoba (She) + przeszłość ("when she was at college") → have studied.',
      },
      {
        id: 'rps-3',
        prompt: 'Mum would rather I ___ home tonight. (str. 67 zad. 7.7)',
        hint: 'STAY',
        answers: ['stayed'],
        explanation: 'Po rather jest osoba ("I") + dziś wieczorem ("tonight") → czas przeszły: stayed.',
      },
      {
        id: 'rps-4',
        prompt: 'She’d rather we ___ in front of George last night. (str. 67 zad. 7.6)',
        hint: 'NOT / ARGUE',
        answers: ["hadn't argued", 'had not argued'],
        explanation: 'Po rather jest osoba ("we") + przeszłość ("last night") → hadn’t argued.',
      },
      {
        id: 'rps-5',
        prompt: 'I’d rather we ___ the bus when we went into town. (str. 67 zad. 7.9)',
        hint: 'TAKE',
        answers: ['had taken'],
        explanation: 'Po rather jest osoba ("we") + przeszłość ("when we went") → had taken.',
      },
      {
        id: 'rps-6',
        prompt: 'I’d rather you ___ better premises for our company.',
        hint: 'RENT',
        answers: ['rented'],
        explanation: 'Po rather jest osoba ("you") + teraz/przyszłość → czas przeszły: rented.',
      },
      {
        id: 'rps-7',
        prompt: 'He’d rather ___ the match on TV later on this afternoon. (str. 67 zad. 7.8)',
        hint: 'WATCH',
        answers: ['watch'],
        explanation: 'Ta sama osoba (He) + dziś po południu → zwykły czasownik: watch.',
      },
      {
        id: 'rps-8',
        prompt: 'I like eating chocolate, but I love eating ice-cream. → I prefer ___ chocolate. (str. 67 zad. 8.4)',
        hint: 'ICE-CREAM / TO',
        answers: ['ice-cream to', 'eating ice-cream to', 'eating ice-cream to eating'],
        explanation: 'Po "prefer" zawsze łączymy dwie rzeczy słówkiem "TO": I prefer (eating) ice-cream to chocolate.',
      },
      {
        id: 'rps-9',
        prompt: 'Sally would prefer ___ to a restaurant rather than see a film. (str. 67 zad. 10.1)',
        options: ['to go', 'going', 'go'],
        answers: ['to go'],
        explanation: 'Po "would prefer" zawsze dajemy "to + czasownik": to go.',
      },
      {
        id: 'rps-10',
        prompt: '"I didn’t go to the party last night." — "___ I." (str. 67 zad. 10.3)',
        options: ['Neither did', 'So do', 'Nor do'],
        answers: ['Neither did'],
        explanation: 'Przeczenie w przeszłości ("didn’t go") → Neither did I.',
      },
      {
        id: 'rps-11',
        prompt: '"I will never watch another violent film again." — "___ I." (str. 67 zad. 9.6)',
        options: ['Neither will', 'So will', 'Neither do'],
        answers: ['Neither will'],
        explanation: 'Słowo "never" to przeczenie + w zdaniu jest "will" → Neither will I.',
      },
      {
        id: 'rps-12',
        prompt: 'It’s high time our senior management ___ a clear strategy.',
        hint: 'DEVELOP',
        answers: ['developed'],
        explanation: 'Po "It’s high time + osoba" zawsze wpisujemy czas przeszły: developed.',
      },
    ],
  },

  // =========================================================================
  // 5. TIME CLAUSES (UNTIL, BEFORE, AFTER, AS SOON AS, BY THE TIME)
  // =========================================================================
  {
    id: 'time-clauses-agh',
    unitTag: 'KOLOS · #5 Until & As soon as',
    isKolosPriority: true,
    title: '5. Wtrącenia czasu: until, before, after, as soon as (possible), by the time',
    subtitle: 'Cztery proste wiersze w tabeli — wszystko co może pojawić się z tymi słówkami.',
    simpleTables: [
      {
        headers: [
          'Kiedy dzieje się zdanie?',
          'Po jakich słówkach?',
          'Co wpisujesz w lukę?',
          'Prosty przykład',
        ],
        rows: [
          [
            '1. O PRZYSZŁOŚCI\n(w drugim zdaniu jest "will"\nlub prośba "Please...")',
            'as soon as (jak tylko)\nuntil (dopóki nie / aż do)\nbefore (zanim) / after (po)\nwhen / once / unless',
            'Zwykły czas teraźniejszy\n(np. get / arrives / sign / are)\n(CAŁKOWITY ZAKAZ "will"!)',
            'I will email you as soon as I get the results.\nWe won’t start until the manager arrives.',
          ],
          [
            '2. "By the time"\nw PRZYSZŁOŚCI',
            'By the time + czas teraźniejszy\n(np. By the time the factory opens...)',
            'w drugim zdaniu wpisujesz:\nwill have + 3. forma (-ed)\n(np. will have entered)',
            'By the time the factory opens, rivals will have entered the market.',
          ],
          [
            '3. O PRZESZŁOŚCI\n(w zdaniu jest "yesterday",\n"didn’t leave", "called")',
            'until (dopóki nie)\nafter (po tym jak)\nas soon as (jak tylko)',
            'had + 3. forma (-ed)\n(np. had finished / had analysed)',
            'He didn’t leave yesterday until he had finished all the reports.\nAfter she had analysed the results, she called a meeting.',
          ],
          [
            '4. BRAK OSOBY\nzaraz po słówku',
            'Before ___ ...\nAfter ___ ...\n(gdy nie ma I / you / he / she)',
            'czasownik z końcówką -ing\n(np. Before making / After graduating)',
            'Before making a takeover bid, the board evaluated the risks.',
          ],
        ],
      },
      {
        title: 'Słowniczek spójników (gdy w zadaniu musisz wybrać właściwe słówko):',
        headers: ['Słówko angielskie', 'Co dokładnie znaczy po polsku?', 'Przykład'],
        rows: [
          ['as soon as', 'jak tylko (natychmiast gdy coś się stanie)', 'I’ll help you as soon as I finish.'],
          ['as soon as possible', 'tak szybko, jak to możliwe (jak najszybciej / ASAP)', 'Please reply as soon as possible.'],
          ['until', 'dopóki nie / aż do momentu (po until czasownik jest twierdzący!)', 'Wait here until I come back.'],
          ['unless', 'jeśli nie / chyba że (po unless czasownik jest twierdzący!)', 'We will lose clients unless we cut costs.'],
          ['as long as', 'pod warunkiem, że / o ile (z karty 3/15 zad. 14)', 'It’s a good idea, as long as you know the risks.'],
        ],
      },
    ],
    keyBullets: [
      'Zaraz po słówkach "until / as soon as / before / after / when / unless" NIGDY nie wpisuj "will"!',
      'Po słówkach "until" (dopóki nie) oraz "unless" (jeśli nie) po angielsku NIE dajemy "don’t / doesn’t" — czasownik musi być twierdzący (np. until he arrives).',
    ],
    rules: [],
    exercises: [
      {
        id: 'tc-1',
        prompt: 'I will email you the survey results as soon as I ___ them.',
        hint: 'GET',
        answers: ['get', 'have got'],
        explanation: 'O przyszłości po "as soon as" wpisujemy zwykły czas teraźniejszy (bez will!) → get.',
      },
      {
        id: 'tc-2',
        prompt: 'We won’t start the meeting until the senior manager ___.',
        hint: 'ARRIVE',
        answers: ['arrives'],
        explanation: 'Po "until" dajemy czas teraźniejszy twierdzący (dla "manager" z końcówką -s) → arrives.',
      },
      {
        id: 'tc-3',
        prompt: 'We will lose market share ___ we tackle this problem immediately.',
        options: ['unless', 'until', 'as soon as'],
        answers: ['unless'],
        explanation: 'Stracimy udział w rynku, JEŚLI NIE zajmiemy się problemem → unless.',
      },
      {
        id: 'tc-4',
        prompt: 'Please go over the contract carefully before you ___ it.',
        hint: 'SIGN',
        answers: ['sign'],
        explanation: 'Po "before" używamy zwykłego czasu teraźniejszego → sign.',
      },
      {
        id: 'tc-5',
        prompt: 'By the time the new factory opens, our competitors ___ already ___ the market.',
        hint: 'ENTER',
        answers: ['will have entered', 'will ... entered'],
        explanation: 'Po "By the time + opens" w drugim zdaniu wpisujemy: will have entered.',
      },
      {
        id: 'tc-6',
        prompt: 'I’ll give you a hand ___ I finish my own presentation.',
        options: ['as soon as', 'until', 'unless'],
        answers: ['as soon as'],
        explanation: 'Pomogę Ci, JAK TYLKO skończę własną prezentację → as soon as.',
      },
      {
        id: 'tc-7',
        prompt: 'Don’t impose a solution ___ you have listened to everyone’s feedback first.',
        options: ['until', 'as soon as', 'in case'],
        answers: ['until'],
        explanation: 'Nie narzucaj rozwiązania, DOPÓKI najpierw nie wysłuchasz opinii → until.',
      },
      {
        id: 'tc-8',
        prompt: 'If the prices ___ more affordable next month, we will attract more clients.',
        hint: 'BE',
        answers: ['are'],
        explanation: 'Po "If" dla przyszłości wpisujemy czas teraźniejszy od be → are.',
      },
      {
        id: 'tc-9',
        prompt: 'We will stay in our home market ___ the economic crisis ends.',
        options: ['until', 'unless', 'in case'],
        answers: ['until'],
        explanation: 'Zostaniemy na rynku krajowym AŻ DO momentu, gdy kryzys się skończy → until.',
      },
      {
        id: 'tc-10',
        prompt: 'Once the merger ___ completed, the company will downsize non-core departments.',
        hint: 'BE',
        answers: ['is', 'has been'],
        explanation: 'Po "Once" (= jak tylko) używamy czasu teraźniejszego → is.',
      },
      {
        id: 'tc-11',
        prompt: 'Please contact our customer support as soon as ___ to clarify the problem.',
        hint: '1 słowo (jak najszybciej)',
        answers: ['possible'],
        explanation: 'Stały zwrot: as soon as possible.',
      },
      {
        id: 'tc-12',
        prompt: 'He didn’t leave the office yesterday until he ___ all the sales reports.',
        hint: 'FINISH (wczoraj!)',
        answers: ['had finished', 'finished'],
        explanation: 'Zdanie o przeszłości ("didn’t leave ... yesterday") → po until wpisujemy: had finished.',
      },
      {
        id: 'tc-13',
        prompt: 'Before ___ a takeover bid, the board evaluated all the risks.',
        hint: 'MAKE (brak osoby po before!)',
        answers: ['making'],
        explanation: 'Brak osoby po "Before" → dodajemy końcówkę -ing: making.',
      },
      {
        id: 'tc-14',
        prompt: 'After she ___ the survey results, she called a problem-solving meeting.',
        hint: 'ANALYSE (przeszłość)',
        answers: ['had analysed', 'had analyzed', 'analysed'],
        explanation: 'Czynność wcześniejsza w przeszłości po "After" → had analysed.',
      },
      {
        id: 'tc-15',
        prompt: 'All things considered, expanding abroad is a good idea, as ___ as you are aware of the risks. (Karta 3/15 zad. 14)',
        options: ['long', 'soon', 'far'],
        answers: ['long'],
        explanation: 'Zwrot "as long as" = pod warunkiem, że / o ile.',
      },
    ],
  },

  // =========================================================================
  // 6. UNIT 4.2: MODAL VERBS
  // =========================================================================
  {
    id: 'modal-verbs-u4',
    unitTag: 'Unit 4.2 · KOLOS',
    isKolosPriority: true,
    title: '6. Unit 4.2: Czasowniki Modalne (must, have to, mustn’t, don’t have to, should)',
    subtitle: 'Prosta tabela z Unit 4.2 (str. 41 i 107).',
    simpleTables: [
      {
        headers: [
          'Słówko do wpisania',
          'Co znaczy po polsku?',
          'Po czym poznać w zdaniu?',
          'Przykład',
        ],
        rows: [
          [
            'mustn’t',
            'NIE WOLNO!\n(Surowy zakaz)',
            'It’s not allowed,\nforbidden, against the rules',
            'You mustn’t eat at your desk. It’s not allowed.',
          ],
          [
            'don’t have to\n(doesn’t have to)',
            'NIE MUSISZ\n(Brak przymusu — masz wybór)',
            'if you don’t want to,\nIt’s not necessary',
            'You don’t have to work late tonight if you don’t want to.',
          ],
          [
            'must  /  have to',
            'MUSISZ (teraz)\n(Przepisy, prawo, nakaz)',
            'regulations state,\nat all times, corporate tax',
            'Everyone must wear hard hats.\nCompanies have to pay 20% tax.',
          ],
          [
            'will have to',
            'BĘDZIESZ MUSIAŁ\n(Obowiązek w przyszłości)',
            'In the future,\nwill be obliged to',
            'In the future, companies will have to change plans more frequently.',
          ],
          [
            'should  /  shouldn’t',
            'POWINIENEŚ / NIE POWINIENEŚ\n(Dobra rada, zalecenie)',
            'It’s a good idea, We recommend,\nIdeally, It’s not a good idea',
            'It’s a good idea. You should book it now.\nWe shouldn’t miss the deadline.',
          ],
        ],
      },
    ],
    keyBullets: [
      'Najważniejsza różnica: mustn’t = NIE WOLNO (zakaz!), a don’t have to = NIE MUSISZ (możesz, ale nie musisz).',
      'W przyszłości nigdy nie piszemy "will must" — zawsze piszemy "will have to"!',
    ],
    rules: [],
    exercises: [
      {
        id: 'mv-1',
        prompt: 'We ___ miss the project deadline.',
        options: ["shouldn't", "don't have to"],
        answers: ["shouldn't"],
        explanation: 'Nie powinniśmy przegapić terminu → shouldn’t.',
      },
      {
        id: 'mv-2',
        prompt: 'You ___ work late tonight if you don’t want to.',
        options: ["don't have to", "mustn't"],
        answers: ["don't have to"],
        explanation: 'Nie musisz pracować do późna, jeśli nie chcesz → don’t have to.',
      },
      {
        id: 'mv-3',
        prompt: 'New regulations state everyone ___ wear hard hats at all times.',
        options: ['must', 'should'],
        answers: ['must'],
        explanation: 'Ścisły wymóg z regulaminu ("regulations state") → must.',
      },
      {
        id: 'mv-4',
        prompt: 'It’s a good idea to do a training course. You ___ book it now.',
        options: ['should', 'have to'],
        answers: ['should'],
        explanation: '"It’s a good idea" (rada) → should.',
      },
      {
        id: 'mv-5',
        prompt: 'We recommend you clean the machine regularly. Ideally, you ___ clean it every two weeks.',
        options: ['should', 'must'],
        answers: ['should'],
        explanation: '"We recommend" i "Ideally" (zalecenie) → should.',
      },
      {
        id: 'mv-6',
        prompt: 'You ___ eat or drink at your desk. It’s not allowed.',
        options: ["mustn't", "shouldn't"],
        answers: ["mustn't"],
        explanation: '"It’s not allowed" (zakaz!) → mustn’t.',
      },
      {
        id: 'mv-7',
        prompt: 'In the future, companies ___ change business plans more frequently. (will be obliged to)',
        answers: ['will have to'],
        explanation: 'Obowiązek w przyszłości ("In the future") → will have to.',
      },
      {
        id: 'mv-8',
        prompt: 'Companies ___ leave strategic planning to senior managers only. (It’s not a good idea)',
        answers: ["shouldn't", 'should not'],
        explanation: '"It’s not a good idea" → shouldn’t.',
      },
    ],
  },

  // =========================================================================
  // 7. UNIT 4.5: COMPARISON & LINKING (DUE TO, RESULT IN, FEWER VS LESS)
  // =========================================================================
  {
    id: 'comparison-u4',
    unitTag: 'Unit 4.5 · KOLOS',
    isKolosPriority: true,
    title: '7. Unit 4.5: Łączniki (due to, because, result in) & Porównania (fewer vs less)',
    subtitle: 'Prosta tabela z Unit 4.5 (str. 46 i 107).',
    simpleTables: [
      {
        headers: [
          'Słówko do wpisania',
          'Co znaczy?',
          'Co stoi zaraz za luką?',
          'Przykład',
        ],
        rows: [
          [
            'due to\nbecause of\nas a result of',
            'z powodu / wskutek\n(podaje PRZYCZYNĘ)',
            'SAMA RZECZ (brak czasownika!)\nnp. poor quality / high costs',
            'Sales fell due to poor product quality.\nCustomers left as a result of high costs.',
          ],
          [
            'because',
            'ponieważ\n(podaje PRZYCZYNĘ)',
            'PEŁNE ZDANIE Z CZASOWNIKIEM\nnp. there was a new competitor',
            'Sales fell because there was a new competitor.',
          ],
          [
            'has led to\nhas resulted in\nresulting in',
            'doprowadziło do /\nposkutkowało (SKUTEK)',
            'SAMA RZECZ (lub -ing)\nnp. unhappy customers / problems',
            'Poor quality has led to unhappy customers.\nThe strategy has resulted in problems.',
          ],
          [
            'in order to',
            'aby / po to żeby\n(podaje CEL)',
            'ZWYKŁY CZASOWNIK\nnp. attract / focus / save',
            'The product was redesigned in order to attract new customers.',
          ],
          [
            'fewer',
            'mniej\n(dla rzeczy POLICZALNYCH)',
            'rzeczownik w liczbie mnogiej (-s)\nnp. stores / checkouts / clients',
            'There are fewer stores open this year.',
          ],
          [
            'less',
            'mniej\n(dla rzeczy NIEPOLICZALNYCH)',
            'rzeczownik niepoliczalny (bez -s)\nnp. money / time',
            'Customers spent less money than last year.',
          ],
          [
            'far  /  much',
            'znacznie / o wiele\n(wzmacnia porównanie)',
            'stopień wyższy (more... / -er)\nnp. far more difficult / much lower',
            'The launch was far more difficult than we expected.',
          ],
        ],
      },
    ],
    keyBullets: [
      'Przed stopniem wyższym (np. more difficult / lower) nigdy nie piszemy "very" — zawsze piszemy "far" albo "much"!',
      'Po stopniu wyższym (np. steeper / bigger / more difficult) słówko „niż” to zawsze "than".',
    ],
    rules: [],
    exercises: [
      {
        id: 'cmp-1',
        prompt: 'The merger was ___ more complicated than we expected.',
        options: ['far', 'very', 'more'],
        answers: ['far'],
        explanation: 'Przed stopniem wyższym ("more complicated") wpisujemy "far" (nigdy "very"!).',
      },
      {
        id: 'cmp-2',
        prompt: 'There are ___ staffed checkouts open this year than last year.',
        options: ['fewer', 'less'],
        answers: ['fewer'],
        explanation: 'Kasy ("checkouts") mają liczbę mnogą (-s, policzalne) → fewer.',
      },
      {
        id: 'cmp-3',
        prompt: 'During the economic recession, consumers spent ___ money on luxury goods.',
        options: ['less', 'fewer'],
        answers: ['less'],
        explanation: 'Pieniądze ("money") są niepoliczalne → less.',
      },
      {
        id: 'cmp-4',
        prompt: 'The fall in profit margin is steeper ___ I anticipated.',
        answers: ['than'],
        explanation: 'Po stopniu wyższym ("steeper") dajemy "than" (niż).',
      },
      {
        id: 'cmp-5',
        prompt: 'Because of the project delay, we have to work ___ and ___ hours. (long)',
        answers: ['longer and longer'],
        explanation: 'Coraz dłuższe godziny → longer and longer.',
      },
      {
        id: 'cmp-6',
        prompt: 'Sales suffered greatly ___ cheaper product lines from emerging markets.',
        options: ['due to', 'because', 'so', 'in order to'],
        answers: ['due to'],
        explanation: 'Za luką stoi sama rzecz ("cheaper product lines", brak czasownika) → due to.',
      },
      {
        id: 'cmp-7',
        prompt: 'Closing smaller stores has ___ very negative customer feedback.',
        options: ['resulted in', 'due to', 'because of', 'in order to'],
        answers: ['resulted in'],
        explanation: 'Poskutkowało negatywnymi opiniami → has resulted in.',
      },
      {
        id: 'cmp-8',
        prompt: 'They sold off non-core businesses ___ focus on their grocery market.',
        options: ['in order to', 'due to', 'because', 'so'],
        answers: ['in order to'],
        explanation: 'Za luką stoi zwykły czasownik ("focus" — aby skupić się) → in order to.',
      },
    ],
  },

  // =========================================================================
  // POZOSTAŁE DZIAŁY (UNITS 1–3 & 5)
  // =========================================================================
  {
    id: 'passive-linking-u5',
    unitTag: 'Unit 5.2 & 5.5',
    title: 'Unit 5: Strona Bierna (Passive) & Kontrast (Despite vs Although)',
    subtitle: 'Prosta tabela dla Unit 5.',
    simpleTables: [
      {
        headers: ['Konstrukcja', 'Co wpisujesz?', 'Przykład'],
        rows: [
          ['Present Perfect Passive\n(z already / yet)', 'has / have + (already) + been + 3. forma (-ed)', 'A self-driving lorry has already been designed.'],
          ['Modal Passive\n(z can / must / will)', 'can / must / will + be + 3. forma (-ed)', 'A delivery van can be made without pedals.'],
          ['Despite / In spite of\n(Pomimo)', 'Despite (bez "of"!) + rzecz lub czasownik z -ing', 'Despite sending the order early, delivery was late.'],
          ['Although\n(Chociaż)', 'Although + osoba i czasownik (pełne zdanie)', 'Although we visited the offices, the manager wasn’t there.'],
        ],
      },
    ],
    rules: [],
    exercises: [
      {
        id: 'u5g-1',
        prompt: 'A self-driving lorry ___ by ZF, the German car parts maker.',
        hint: 'already / design',
        answers: ['has already been designed'],
        explanation: 'has + already + been + 3. forma: has already been designed.',
      },
      {
        id: 'u5g-2',
        prompt: 'Mercedes-Benz have shown that a delivery van ___ without pedals.',
        hint: 'can / make',
        answers: ['can be made'],
        explanation: 'can + be + 3. forma: can be made.',
      },
      {
        id: 'u5g-3',
        prompt: '___ sending the order early, delivery was still late.',
        options: ['Despite', 'Despite of', 'Although'],
        answers: ['Despite'],
        explanation: 'Przed formą z -ing ("sending") używamy "Despite" (nigdy "Despite of"!).',
      },
      {
        id: 'u5g-4',
        prompt: '___ we visited the offices, the manager wasn’t there.',
        options: ['Although', 'Despite', 'In spite of'],
        answers: ['Although'],
        explanation: 'Przed pełnym zdaniem ("we visited") stawiamy "Although".',
      },
      {
        id: 'u5g-5',
        prompt: 'This supplier offers better quality ___ the other one offers better design.',
        options: ['whereas', 'despite', 'however'],
        answers: ['whereas'],
        explanation: '"whereas" = podczas gdy.',
      },
    ],
  },
  {
    id: 'future-present-u1',
    unitTag: 'Unit 1.2 & 1.5',
    title: 'Unit 1: Wyrażanie przyszłości (Rozkład vs Spotkanie vs Zamiar)',
    subtitle: 'Prosta tabela dla Unit 1.',
    simpleTables: [
      {
        headers: ['Sytuacja', 'Co wpisujesz?', 'Przykład'],
        rows: [
          ['Rozkład jazdy / godziny otwarcia', 'zwykły czas teraźniejszy z -s (opens / leaves)', 'The office opens at 10 o’clock on Fridays.'],
          ['Umówione spotkanie z kimś', 'am / is / are + końcówka -ing', 'I’m seeing the new clients later today.'],
          ['Zamiar ("He’s decided") lub pewny wniosek', 'am / is / are + going to + czasownik', 'He’s decided he’s going to ask for a pay rise.'],
        ],
      },
    ],
    rules: [],
    exercises: [
      {
        id: 'u1g-1',
        prompt: 'The office ___ at 10 o’clock on Fridays.',
        options: ['opens', 'is opening'],
        answers: ['opens'],
        explanation: 'Stałe godziny otwarcia → opens.',
      },
      {
        id: 'u1g-2',
        prompt: 'I ___ the new clients later today.',
        options: ["'m seeing", 'see'],
        answers: ["'m seeing"],
        explanation: 'Umówione spotkanie → ’m seeing.',
      },
      {
        id: 'u1g-3',
        prompt: 'What? The course finishes at 6 p.m.? I ___ miss my train!',
        options: ["'m going to", 'will probably'],
        answers: ["'m going to"],
        explanation: 'Oczywisty wniosek z faktów → ’m going to.',
      },
    ],
  },
  {
    id: 'gerund-infinitive-u2',
    unitTag: 'Unit 2.5 · AGH B2',
    title: 'Unit 2: Kiedy końcówka -ing, a kiedy zwykły czasownik',
    subtitle: 'Prosta tabela dla Unit 2.',
    simpleTables: [
      {
        headers: ['Po jakich słowach?', 'Co wpisujesz?', 'Przykład'],
        rows: [
          ['involve, suggest, postpone, avoid, consider, mind', 'czasownik z końcówką -ing', 'He suggests appointing a committee.'],
          ['look forward to / in / for / of', 'czasownik z końcówką -ing', 'We look forward to hearing from you.'],
          ['make + osoba (np. make employees...)', 'zwykły czasownik BEZ "to" i bez "-ing"', 'Incentives can make employees perform better.'],
        ],
      },
    ],
    rules: [],
    exercises: [
      {
        id: 'gi-1',
        prompt: 'Starting a small company doesn’t necessarily involve ___ out a mortgage.',
        hint: 'TAKE',
        answers: ['taking'],
        explanation: 'Po "involve" dodajemy -ing → taking.',
      },
      {
        id: 'gi-2',
        prompt: 'He suggests ___ a remuneration committee to make decisions in this area.',
        hint: 'APPOINT',
        answers: ['appointing'],
        explanation: 'Po "suggest" dodajemy -ing → appointing.',
      },
      {
        id: 'gi-3',
        prompt: 'There are a number of incentives which can make employees ___ better.',
        hint: 'PERFORM',
        answers: ['perform'],
        explanation: 'Po "make + osoba" dajemy zwykły czasownik bez "to" → perform.',
      },
      {
        id: 'gi-4',
        prompt: 'We look forward to ___ from you soon.',
        hint: 'HEAR',
        answers: ['hearing'],
        explanation: 'Po "look forward to" dodajemy -ing → hearing.',
      },
    ],
  },
  {
    id: 'indirect-past-u3',
    unitTag: 'Unit 3.2 & 3.5',
    title: 'Unit 3: Uprzejme Pytania Pośrednie (Could you tell me / I’d like to know)',
    subtitle: 'Prosta tabela dla Unit 3.',
    simpleTables: [
      {
        headers: ['Typ pytania', 'Co wpisujesz po "Could you tell me / I’d like to know"?', 'Przykład'],
        rows: [
          ['Pytanie z where / what / who / why', 'where/who + NAJPIERW OSOBA + POTEM CZASOWNIK (bez do/did!)', 'Could you tell me where you expect to be?\nI’d like to know who I will report to.'],
          ['Pytanie „Czy...?” (tak/nie)', 'if (lub whether) + najpierw osoba + potem czasownik', 'I’d like to know if / whether you provide any training.'],
        ],
      },
    ],
    rules: [],
    exercises: [
      {
        id: 'u3g-1',
        prompt: 'Could you tell me where ___ in five years’ time? (Where do you expect to be...)',
        answers: ['you expect to be'],
        explanation: 'Najpierw osoba, potem czasownik (bez "do"): you expect to be.',
      },
      {
        id: 'u3g-2',
        prompt: 'I’d like to know ___ you provide any training.',
        options: ['if / whether', 'do', 'that'],
        answers: ['if / whether'],
        explanation: '„Czy” w pytaniu pośrednim to "if" lub "whether".',
      },
      {
        id: 'u3g-3',
        prompt: 'I’d like to know who ___ to.',
        options: ['I will report', 'will I report'],
        answers: ['I will report'],
        explanation: 'Najpierw osoba ("I"), potem czasownik ("will report"): I will report.',
      },
    ],
  },
];
