import type { GapQuestion, PhraseCategory } from './types';

export const FUNCTIONAL_CATEGORIES: PhraseCategory[] = [
  {
    id: 'u4-help',
    unitTag: 'Unit 4.3 · KOLOS',
    isKolosPriority: true,
    title: 'Offering, Asking for & Responding to Help',
    description: 'Zwroty do proponowania pomocy, proszenia o wsparcie oraz uprzejmego przyjmowania lub odmawiania (formalne i nieformalne).',
    subgroups: [
      {
        label: 'Offering help (Proponowanie pomocy)',
        phrases: [
          { en: 'Is there anything (else) I can do to help?', pl: 'Czy mogę jeszcze w czymś pomóc?', register: 'neutral' },
          { en: 'I’d (really) like to help if I can.', pl: 'Bardzo chciałbym pomóc, jeśli mogę.', register: 'neutral' },
          { en: 'Would you like me to [find them for you]?', pl: 'Czy chcesz, żebym [je dla Ciebie znalazł]?', register: 'formal' },
          { en: 'Let me give you a hand with that.', pl: 'Pozwól, że Ci z tym pomogę.', register: 'informal', note: 'Nieformalne!' },
          { en: 'Need a hand with [finishing that / anything else]?', pl: 'Potrzebujesz pomocy z [...]?', register: 'informal', note: 'Nieformalne!' },
        ],
      },
      {
        label: 'Asking & responding (Proszenie i reakcja)',
        phrases: [
          { en: 'Would you mind [collating those market reports]?', pl: 'Czy miałbyś coś przeciwko [zestawieniu tych raportów]?', register: 'formal', note: 'Would you mind + V-ing!' },
          { en: 'Yes, that would be very helpful / good.', pl: 'Tak, to byłoby bardzo pomocne.', register: 'neutral' },
          { en: 'Thanks for offering, but I think I can manage.', pl: 'Dzięki za propozycję, ale myślę, że dam radę.', register: 'neutral' },
          { en: 'Thanks for the support, I appreciate it.', pl: 'Dzięki za wsparcie, doceniam to.', register: 'neutral' },
        ],
      },
    ],
  },
  {
    id: 'u4-meetings',
    unitTag: 'Unit 4.4 · KOLOS',
    isKolosPriority: true,
    title: 'Problem-Solving Meetings',
    description: 'Prowadzenie i aktywny udział w spotkaniach nastawionych na rozwiązywanie problemów (6 kroków z Unit 4.4).',
    subgroups: [
      {
        label: 'Leading, clarifying & suggesting',
        phrases: [
          { en: 'Can you explain again what the issue / problem is, exactly?', pl: 'Czy możesz wyjaśnić raz jeszcze, na czym dokładnie polega problem?', register: 'neutral' },
          { en: 'Would it be possible to [reduce our prices]?', pl: 'Czy byłoby możliwe [obniżenie cen]?', register: 'formal' },
          { en: 'How about [using a call centre]?', pl: 'A co powiesz na [skorzystanie z call centre]?', register: 'neutral', note: 'How about + V-ing!' },
          { en: 'Just building on [Roel’s] idea, I think...', pl: 'Rozwijając pomysł [Roela], myślę, że...', register: 'neutral' },
          { en: 'To pick up on what [Adam] just said, could we...?', pl: 'Nawiązując do tego, co powiedział [Adam], czy moglibyśmy...?', register: 'neutral' },
        ],
      },
      {
        label: 'Agreeing, disagreeing & committing',
        phrases: [
          { en: 'I think that makes a lot of sense.', pl: 'Myślę, że to ma dużo sensu.', register: 'neutral' },
          { en: 'I think that’s a nice idea; simple and doable.', pl: 'To świetny pomysł — prosty i wykonalny.', register: 'neutral' },
          { en: 'If we do that, it will just [increase our costs / reduce our profit margin].', pl: 'Jeśli to zrobimy, to tylko [zwiększy koszty / obniży marżę].', register: 'neutral' },
          { en: 'I’m happy to take that on.', pl: 'Chętnie się tym zajmę.', register: 'neutral' },
        ],
      },
    ],
  },
  {
    id: 'u4-reporting',
    unitTag: 'Unit 4.5 · KOLOS',
    isKolosPriority: true,
    title: 'Reporting Problems, Reasons & Results',
    description: 'Kluczowe łączniki do raportów (Unit 4.5) — uwaga na różnicę między zdaniem a frazą rzeczownikową!',
    subgroups: [
      {
        label: 'Introducing a REASON (Przyczyna)',
        phrases: [
          { en: 'because + zdanie (podmiot + orzeczenie)', pl: 'ponieważ', note: 'Np. Sales fell because there was a new competitor.' },
          { en: 'because of / due to / as a result of + rzeczownik / V-ing', pl: 'z powodu / wskutek', note: 'Np. Profits are down as a result of the economic depression.' },
          { en: 'in order to + bezokolicznik', pl: 'aby / w celu (wyrażenie celu)', note: 'Np. Fewer people visit out-of-town stores in order to save fuel.' },
        ],
      },
      {
        label: 'Introducing a RESULT (Skutek)',
        phrases: [
          { en: 'so + zdanie  |  As a result, ... / Therefore, ...', pl: 'więc / w rezultacie / dlatego też', register: 'formal' },
          { en: 'has led to + rzeczownik / V-ing', pl: 'doprowadziło do', note: 'Np. This has led to very negative customer feedback.' },
          { en: 'has resulted in / resulting in + rzeczownik / V-ing', pl: 'poskutkowało / skutkując', note: 'Np. ...resulting in the need to come up with a strategy.' },
        ],
      },
    ],
  },
  {
    id: 'u5-negotiating',
    unitTag: 'Unit 5.3–5.5',
    title: 'Agreeing/Disagreeing, Negotiating & Complaints',
    description: 'Komplet zwrotów z Unit 5 (Review str. 108 + Letter of complaint str. 56).',
    subgroups: [
      {
        label: '5.3 Agreeing/Disagreeing & 5.4 Negotiating',
        phrases: [
          { en: 'I don’t agree at all. / I’m afraid I disagree with you.', pl: 'W ogóle się nie zgadzam. / Obawiam się, że się z Tobą nie zgadzam.', register: 'neutral' },
          { en: 'I’m not sure that’s the best solution.', pl: 'Nie jestem pewien, czy to najlepsze rozwiązanie.', register: 'formal' },
          { en: 'My proposal would be that we look at [increasing our orders].', pl: 'Moja propozycja to przyjrzenie się [zwiększeniu zamówień].', register: 'formal' },
          { en: 'How does that sound to everyone? / That seems reasonable.', pl: 'Jak to brzmi dla wszystkich? / To wydaje się rozsądne.', register: 'neutral' },
        ],
      },
      {
        label: '5.5 Letter of Complaint (Reklamacja)',
        phrases: [
          { en: 'We ordered [30 dishwashers] on the understanding that they would be delivered yesterday.', pl: 'Zamówiliśmy [...] z zastrzeżeniem, że zostaną dostarczone wczoraj.', register: 'formal' },
          { en: 'If you do not respond immediately, we shall be forced to withhold payment.', pl: 'Jeśli nie odpowiedzą Państwo natychmiast, będziemy zmuszeni wstrzymać płatność.', register: 'formal' },
          { en: 'We sincerely hope that this situation will be resolved to our mutual satisfaction.', pl: 'Mamy nadzieję, że sprawa zostanie rozwiązana ku obopólnemu zadowoleniu.', register: 'formal' },
          { en: 'We look forward to receiving your prompt response.', pl: 'Czekamy na niezwłoczną odpowiedź.', register: 'formal' },
        ],
      },
    ],
  },
  {
    id: 'u1-u3-core',
    unitTag: 'Units 1–3',
    title: 'Presentations, Active Listening & Small Talk (Units 1–3)',
    description: 'Najważniejsze zwroty użytkowe z pierwszych trzech rozdziałów (Reviews str. 104–106).',
    subgroups: [
      {
        label: 'Unit 2.4 Signposting in Presentations & 2.3 Advice',
        phrases: [
          { en: 'Let’s begin with the most important part...', pl: 'Zacznijmy od najważniejszej części...', register: 'neutral' },
          { en: 'Firstly, I’d like you to take a look at this slide. / Finally, this slide outlines...', pl: 'Po pierwsze, spójrzmy na ten slajd. / Na koniec ten slajd przedstawia...', register: 'formal' },
          { en: 'As I said earlier, ... / I’ll hand over to [Fran] now.', pl: 'Jak wspomniałem wcześniej, ... / Przekazuję teraz głos [Fran].', register: 'neutral' },
          { en: 'Have you tried [planning your work]? / Why don’t we [have a look]?', pl: 'Czy próbowałeś [...]? / Może [...]?', register: 'neutral' },
        ],
      },
      {
        label: 'Unit 3.3 Active Listening & Unit 1.3–1.4 First Meetings',
        phrases: [
          { en: 'What exactly do you mean by [...]? / Why don’t you tell me a bit more?', pl: 'Co dokładnie masz na myśli mówiąc [...]? / Opowiedz mi coś więcej.', register: 'neutral' },
          { en: 'I can see that you are frustrated with the situation.', pl: 'Widzę, że ta sytuacja Cię frustruje.', register: 'neutral' },
          { en: 'Where are you based at the moment? / Nice to finally meet you in person.', pl: 'Gdzie obecnie pracujesz/stacjonujesz? / Miło wreszcie poznać Cię osobiście.', register: 'neutral' },
          { en: 'I would very much appreciate the opportunity of an interview.', pl: 'Bardzo doceniłbym możliwość udziału w rozmowie kwalifikacyjnej.', register: 'formal' },
        ],
      },
    ],
  },
  {
    id: 'videos-idioms',
    unitTag: 'Filmiki · Units 1–5',
    title: 'Żywe zwroty i idiomy biznesowe z filmików (Units 1–5)',
    description: 'Autentyczne wyrażenia z dialogów wideo (Matt, Stefanie, Kenji, Raj, Kraft Heinz, Amazon), które często pojawiają się w listeningu i dyskusjach.',
    subgroups: [
      {
        label: 'Problemy, opóźnienia i presja czasu (Units 1, 3, 4)',
        phrases: [
          { en: 'We’re running three weeks behind schedule.', pl: 'Mamy trzy tygodnie opóźnienia względem harmonogramu.', register: 'neutral' },
          { en: 'How do we go forward to get back on track?', pl: 'Jak idziemy dalej, żeby wrócić na właściwe tory?', register: 'neutral' },
          { en: 'I’m working very hard to put things right.', pl: 'Bardzo ciężko pracuję, żeby naprawić tę sytuację.', register: 'neutral' },
          { en: 'Everything got held up and we missed the target.', pl: 'Wszystko utknęło i nie dowieźliśmy celu.', register: 'neutral' },
          { en: 'Let’s talk this through before we go over budget.', pl: 'Przedyskutujmy to dokładnie, zanim przekroczymy budżet.', register: 'neutral' },
        ],
      },
      {
        label: 'Negocjacje, współpraca i konflikty (Units 2, 4, 5)',
        phrases: [
          { en: 'We’re going round in circles here.', pl: 'Kręcimy się tu w kółko (bez efektu).', register: 'informal' },
          { en: 'I’ll come directly to the point as we need to find a solution.', pl: 'Przejdę od razu do sedna, bo musimy znaleźć rozwiązanie.', register: 'formal' },
          { en: 'You have to bear the costs / It’s reasonable to split the costs.', pl: 'Musisz ponieść koszty / Rozsądnie będzie podzielić koszty.', register: 'neutral' },
          { en: 'We need to think about the big picture.', pl: 'Musimy patrzeć z szerszej perspektywy.', register: 'neutral' },
          { en: 'I didn’t want to go over his head, so I stepped in gently.', pl: 'Nie chciałem iść ponad jego głową, więc wkroczyłem delikatnie.', register: 'neutral' },
        ],
      },
    ],
  },
  {
    id: 'agh-diplomatic',
    unitTag: 'AGH Writing B2',
    title: 'Diplomatic & Formal Email Language',
    description: 'Niezbędne na egzaminie AGH przy pisaniu przeprosin i dyplomatycznego feedbacku.',
    subgroups: [
      {
        label: 'Softening criticism (Dyplomatyczne zgłaszanie problemów)',
        phrases: [
          { en: 'I am writing to share some constructive feedback regarding...', pl: 'Piszę, aby podzielić się konstruktywnym feedbackiem dotyczącym...', register: 'formal' },
          { en: 'Unfortunately, there were a few minor inconveniences related to...', pl: 'Niestety pojawiło się kilka drobnych niedogodności związanych z...', register: 'formal' },
          { en: 'Communication could have been slightly more transparent.', pl: 'Komunikacja mogłaby być nieco bardziej przejrzysta.', register: 'formal' },
        ],
      },
      {
        label: 'Apologising & offering compensation (List z przeprosinami)',
        phrases: [
          { en: 'Please accept our sincere apologies for the inconvenience caused.', pl: 'Proszę przyjąć nasze szczere przeprosiny za powstałe niedogodności.', register: 'formal' },
          { en: 'As a gesture of goodwill, we would like to offer you a 20% discount / full refund.', pl: 'W ramach gestu dobrej woli chcielibyśmy zaoferować 20% zniżki / pełny zwrot.', register: 'formal' },
          { en: 'I look forward to hearing from you and resolving this matter promptly.', pl: 'Czekam na odpowiedź i niezwłoczne rozwiązanie tej sprawy.', register: 'formal' },
        ],
      },
    ],
  },
];

export const FUNCTIONAL_DRILL: GapQuestion[] = [
  {
    id: 'fd-1',
    prompt: 'B: ___ to find the sales figures for you?',
    hint: 'Offering help (Review 4.3)',
    answers: ['Would you like me'],
    explanation: 'Uprzejma oferta pomocy: "Would you like me to + bezokolicznik?"',
  },
  {
    id: 'fd-2',
    prompt: 'A: ___ offering, but I think I can manage to find them.',
    hint: 'Declining politely (Review 4.3)',
    answers: ['Thanks for'],
    explanation: 'Uprzejma odmowa: "Thanks for offering, but I think I can manage."',
  },
  {
    id: 'fd-3',
    prompt: 'A: ___ collating those market reports? That would be helpful.',
    hint: 'Asking for help politely (Review 4.3)',
    answers: ['Would you mind'],
    explanation: 'Przed formą -ing ("collating") stawiamy "Would you mind".',
  },
  {
    id: 'fd-4',
    prompt: 'A: Can you ___ what the issue is exactly?',
    hint: '1 słowo · Clarifying (Review 4.4)',
    answers: ['explain'],
    explanation: 'Z Review 4.4: "Can you explain what the issue is exactly?"',
  },
  {
    id: 'fd-5',
    prompt: 'C: To ___ up on what Adam just said, could we reduce the price for a short while?',
    hint: '1 słowo · Building on ideas (Review 4.4)',
    answers: ['pick'],
    explanation: 'Konstrukcja z Unit 4.4: "To pick up on what [X] just said..." (Nawiązując do...).',
  },
  {
    id: 'fd-6',
    prompt: 'D: I think that ___ a lot of sense. I’m happy to ___ that on.',
    hint: '2 słowa: makes, take (Review 4.4)',
    answers: ['makes, take', 'makes take'],
    explanation: '"make sense" + "take something on" (podjąć się zadania).',
  },
  {
    id: 'fd-7',
    prompt: 'Negotiating (Review 5.4): My ___ would be that we look at increasing our orders.',
    options: ['proposal', 'offer', 'purpose'],
    answers: ['proposal'],
    explanation: 'Z Review 5.4: "My proposal would be that..."',
  },
  {
    id: 'fd-8',
    prompt: 'Negotiating (Review 5.4): How does that ___ to everyone? — That seems ___.',
    options: ['sound / reasonable', 'go / sensitive', 'develop / good idea'],
    answers: ['sound / reasonable'],
    explanation: 'Z Review 5.4: "How does that sound to everyone?" / "That seems reasonable."',
  },
];
